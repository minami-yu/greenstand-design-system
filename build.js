/**
 * Style Dictionary v4 build pipeline.
 *
 * Compiles the multi-file W3C DTCG token architecture in `tokens/` into a
 * single type-safe TypeScript theme at `src/theme/tokens.ts`.
 *
 * Pipeline overview:
 *   tokens/**\/*.json  ──(parser: skip Token Studio meta files)──▶ deep-merged
 *   token tree ──(format: resolve {alias} refs, strip $ metadata, parse
 *   "16px" → 16)──▶ `export const theme = { ... } as const;`
 *
 * Run with: `npm run build-tokens`
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import StyleDictionary from 'style-dictionary';

/** Matches a full-string DTCG alias reference, e.g. "{neutral.200}". */
const ALIAS_PATTERN = /^\{([^}]+)\}$/;

/** Matches numeric dimension strings, e.g. "16px", "-4px", "0.5px", "0". */
const PX_PATTERN = /^-?\d*\.?\d+(px)?$/;

/**
 * Figma exports font weights as style-name strings ("Medium", "Semi Bold"),
 * which React Native does not accept. Map them to numeric weights.
 */
const FONT_WEIGHT_NAMES = {
  thin: 100,
  'extra light': 200,
  extralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  medium: 500,
  'semi bold': 600,
  semibold: 600,
  bold: 700,
  'extra bold': 800,
  extrabold: 800,
  black: 900
};

/** Token keys whose string values should be normalized to numeric weights. */
const WEIGHT_CONTEXT_KEYS = new Set(['fontWeight', 'fontWeights', 'weight']);

function normalizeFontWeight(value) {
  if (typeof value === 'string') {
    return FONT_WEIGHT_NAMES[value.toLowerCase()] ?? value;
  }

  return value;
}

/**
 * Spec-level / tooling metadata keys that must never leak into the theme.
 * Keys starting with "$" are also stripped generically (except "$value",
 * which is resolved into its final data value).
 */
const META_KEYS = new Set([
  'attributes',
  'comment',
  'description',
  'extensions',
  'filePath',
  'isSource',
  'name',
  'original',
  'path',
  'scopes'
]);

/** Walks the merged token tree following a dot-path like "neutral.200". */
function getTokenAtPath(tree, tokenPath) {
  return tokenPath.reduce((current, part) => current?.[part], tree);
}

/**
 * Converts raw "16px"-style dimension strings into plain JavaScript numbers
 * so the values are directly usable in React Native layout styles
 * (RN expects unitless numbers, not CSS strings).
 */
function sanitizeScalar(value) {
  if (typeof value === 'string' && PX_PATTERN.test(value)) {
    return Number.parseFloat(value);
  }

  return value;
}

/**
 * Recursively resolves a token's `$value`:
 *  - follows {alias} cross-references through the merged tree (with circular
 *    reference protection),
 *  - descends into composite values (objects/arrays, e.g. typography sets),
 *  - strips nested "$" metadata keys,
 *  - sanitizes numeric dimension strings into numbers.
 */
function resolveValue(value, sourceTree, seen = new Set()) {
  // Style Dictionary resolves DTCG aliases like "{neutral.200}" to the
  // referenced token OBJECT ({ $type, $value, ... }), not its bare value —
  // collapse any token-shaped object down to its `$value`.
  if (value && typeof value === 'object' && !Array.isArray(value) && '$value' in value) {
    return resolveValue(value.$value, sourceTree, seen);
  }

  if (typeof value === 'string') {
    const alias = value.match(ALIAS_PATTERN);

    if (alias) {
      const aliasPath = alias[1];

      if (seen.has(aliasPath)) {
        throw new Error(`Circular token alias detected: ${aliasPath}`);
      }

      const token = getTokenAtPath(sourceTree, aliasPath.split('.'));

      if (!token || typeof token !== 'object' || !('$value' in token)) {
        throw new Error(`Unable to resolve token alias: ${value}`);
      }

      return resolveValue(token.$value, sourceTree, new Set([...seen, aliasPath]));
    }

    return sanitizeScalar(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveValue(item, sourceTree, seen));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !key.startsWith('$') && !META_KEYS.has(key))
        .map(([key, item]) => [key, resolveValue(item, sourceTree, seen)])
    );
  }

  return value;
}

/**
 * Transforms the resolved Style Dictionary memory tree into a clean, nested
 * theme object: every `$value` node collapses into its final data value and
 * all metadata/extension noise is filtered out.
 */
function toThemeObject(node, sourceTree) {
  if (!node || typeof node !== 'object') {
    return node;
  }

  // A node carrying "$value" is a token: collapse it to its resolved value.
  if ('$value' in node) {
    return resolveValue(node.$value, sourceTree);
  }

  // Otherwise it is a group: recurse, dropping metadata keys.
  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => !key.startsWith('$') && !META_KEYS.has(key))
      .map(([key, value]) => [key, toThemeObject(value, sourceTree)])
  );
}

/** Token `$type`s that belong in the `typography` namespace. */
const TYPOGRAPHY_TYPES = new Set([
  'typography',
  'text',
  'fontFamily',
  'fontFamilies',
  'fontWeight',
  'fontWeights',
  'fontSize',
  'fontSizes',
  'lineHeight',
  'lineHeights',
  'letterSpacing',
  'paragraphSpacing',
  'paragraphIndent',
  'textCase',
  'textDecoration'
]);

/**
 * Top-level groups that belong to typography but whose tokens carry generic
 * `$type`s (e.g. `weight.medium` is exported as a `dimension`).
 */
const TYPOGRAPHY_ROOT_KEYS = new Set(['family', 'weight', 'size', 'paragraphIndent']);

/** Top-level semantic color groups; all other color groups are palettes. */
const SEMANTIC_COLOR_ROOTS = new Set(['fill', 'text', 'border', 'icon', 'shadow', 'background']);

function classifyToken(token) {
  if (token.$type === 'color') {
    return 'color';
  }

  if (TYPOGRAPHY_TYPES.has(token.$type)) {
    return 'typography';
  }

  return 'rest';
}

/**
 * Splits the merged token tree into namespace buckets based on each token's
 * `$type`. This rebuilds the `color` and `typography` namespaces that the
 * flat Figma export lacks, and untangles key collisions between token sets —
 * e.g. `icon` exists both as icon COLORS (tokens/color/) and icon SIZES
 * (tokens/size/); after partitioning they live at `color.icon` and `icon`.
 * Being type-driven, it is resilient to tokens moving between set files
 * across Token Studio re-exports.
 */
function partitionTokens(node) {
  const buckets = { color: {}, typography: {}, rest: {} };

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$') || META_KEYS.has(key) || !value || typeof value !== 'object') {
      continue;
    }

    if ('$value' in value) {
      buckets[classifyToken(value)][key] = value;
      continue;
    }

    const sub = partitionTokens(value);

    for (const bucket of Object.keys(buckets)) {
      if (Object.keys(sub[bucket]).length > 0) {
        buckets[bucket][key] = sub[bucket];
      }
    }
  }

  return buckets;
}

/** Matches percentage strings from Figma typography, e.g. "140%", "0%". */
const PERCENT_PATTERN = /^-?\d*\.?\d+%$/;

const roundTo2 = (value) => Math.round(value * 100) / 100;

/**
 * Maps (fontFamily, fontWeight) pairs to the concrete static font names
 * registered by expo-font / @expo-google-fonts (see src/theme/fonts.ts).
 * Resolving the variant at build time is required for React Native: custom
 * fonts ship as one file per weight, and Android cannot synthesize weights
 * from a family name alone.
 */
const FONT_VARIANTS = {
  Inter: {
    400: 'Inter_400Regular',
    500: 'Inter_500Medium',
    600: 'Inter_600SemiBold',
    700: 'Inter_700Bold'
  },
  Montserrat: {
    700: 'Montserrat_700Bold'
  }
};

/**
 * Makes typography values consumable by React Native:
 *  - Composite sets (objects with a numeric `fontSize`):
 *      - `lineHeight` ratios (DTCG numbers like 1.4, or "140%" strings)
 *        are computed into absolute numbers (fontSize 14 → 19.6), since RN
 *        only accepts absolute line heights;
 *      - percentage `letterSpacing` is computed the same way;
 *      - Figma-named props are renamed to their RN style equivalents
 *        (textCase → textTransform, textDecoration → textDecorationLine);
 *      - (fontFamily, fontWeight) is resolved to the loaded font variant
 *        (e.g. Inter + 500 → "Inter_500Medium"), dropping fontWeight so the
 *        set spreads into a Text style without faux-bolding.
 *  - Remaining standalone percentage strings become unitless ratio numbers
 *    ("140%" → 1.4) for manual use.
 */
function normalizeTypography(node) {
  if (typeof node === 'string') {
    return PERCENT_PATTERN.test(node) ? roundTo2(Number.parseFloat(node) / 100) : node;
  }

  if (Array.isArray(node)) {
    return node.map(normalizeTypography);
  }

  if (node && typeof node === 'object') {
    const out = Object.fromEntries(
      Object.entries(node).map(([key, value]) => [key, normalizeTypography(value)])
    );

    // Composite typography set.
    if (typeof out.fontSize === 'number') {
      // After the string branch above, percentage strings are already
      // ratios; DTCG sources provide ratios directly. Absolute line
      // heights are always >= the smallest font size, so < 4 safely
      // identifies a ratio.
      if (typeof out.lineHeight === 'number' && out.lineHeight < 4) {
        out.lineHeight = roundTo2(out.fontSize * out.lineHeight);
      }

      if (typeof node.letterSpacing === 'string' && PERCENT_PATTERN.test(node.letterSpacing)) {
        out.letterSpacing = roundTo2(out.fontSize * out.letterSpacing);
      }

      const variant = FONT_VARIANTS[out.fontFamily]?.[out.fontWeight];

      if (variant) {
        out.fontFamily = variant;
        delete out.fontWeight;
      }

      if ('textCase' in out) {
        out.textTransform = out.textCase;
        delete out.textCase;
      }

      if ('textDecoration' in out) {
        out.textDecorationLine = out.textDecoration;
        delete out.textDecoration;
      }
    }

    return out;
  }

  return node;
}

/**
 * Recursively normalizes font weight strings anywhere beneath a
 * weight-related key (e.g. `fontWeight` inside composite typography tokens,
 * or the standalone `fontWeights` / `weight` scales).
 */
function normalizeWeights(node, inWeightContext = false) {
  if (typeof node === 'string' && inWeightContext) {
    return normalizeFontWeight(node);
  }

  if (Array.isArray(node)) {
    return node.map((item) => normalizeWeights(item, inWeightContext));
  }

  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [
        key,
        normalizeWeights(value, inWeightContext || WEIGHT_CONTEXT_KEYS.has(key))
      ])
    );
  }

  return node;
}

/**
 * Custom parser: Token Studio / Figma exports ship non-DTCG sidecar files
 * ("$metadata.json" with the token-set order, "$themes.json" with theme
 * configs — the latter is a bare JSON array). Feeding those into the deep
 * merge would corrupt or crash the build, so files whose basename starts
 * with "$" are parsed to an empty token set instead.
 */
// Style Dictionary does not support "!" negation in `source` globs, so the
// parser is also responsible for excluding the opposing mode files. One
// parser per build pass: the color mode (light/dark) and the typography
// device class (mobile/desktop) are independent dimensions.
for (const [parserName, excludedFiles] of [
  ['dtcg-light-mobile', ['color/dark.json', 'typography/desktop.json']],
  ['dtcg-dark-mode', ['color/light.json', 'typography/desktop.json']],
  ['dtcg-desktop-typography', ['color/dark.json', 'typography/mobile.json']]
]) {
  StyleDictionary.registerParser({
    name: parserName,
    pattern: /\.json$/,
    parser: ({ filePath, contents }) => {
      const isMetaFile = path.basename(filePath).startsWith('$');
      const isOtherMode = excludedFiles.some((file) => filePath.endsWith(file));

      if (isMetaFile || isOtherMode) {
        return {};
      }

      return JSON.parse(contents);
    }
  });
}

/**
 * Full theme-composition pipeline for one merged token tree:
 * namespace partitioning → alias resolution → RN normalization.
 *
 * Output shape:
 *   color:      semantic sets (fill, text, border, ...) + color.palette.*
 *   typography: composite sets (heading-m, ...) + font primitives
 *   space, radius, blur, depth, stroke, icon, margin, ...: size scales
 */
function composeTheme(tokens) {
  const { color, typography, rest } = partitionTokens(tokens);

  // Typography groups whose tokens carry generic $types (family/weight/size
  // are exported as text/dimension) are claimed by top-level key instead.
  for (const key of TYPOGRAPHY_ROOT_KEYS) {
    if (rest[key]) {
      typography[key] = { ...rest[key], ...typography[key] };
      delete rest[key];
    }
  }

  // Within `color`, raw palettes (blue, neutral, ...) nest under `palette`
  // so the namespace reads semantic-first.
  const colorNamespace = {};
  const palette = {};

  for (const [key, value] of Object.entries(color)) {
    (SEMANTIC_COLOR_ROOTS.has(key) ? colorNamespace : palette)[key] = value;
  }

  if (Object.keys(palette).length > 0) {
    colorNamespace.palette = palette;
  }

  // Aliases still resolve against the ORIGINAL merged tree, so
  // {neutral.200}-style paths keep working after restructuring.
  return normalizeTypography(
    normalizeWeights(
      toThemeObject({ color: colorNamespace, typography, ...rest }, tokens)
    )
  );
}

/**
 * Resolved dark-mode color tree and desktop typography tree, computed from
 * extra Style Dictionary passes before the main build runs (see below) and
 * consumed by the format.
 */
let darkColors = null;
let desktopTypography = null;

/**
 * Custom format: emits the resolved token tree as immutable TypeScript
 * exports with const assertions plus type helpers. Light mode is the
 * default `theme`; `themes.dark` reuses every mode-independent token and
 * swaps only the `color` namespace.
 */
StyleDictionary.registerFormat({
  name: 'typescript/nested-theme',
  format: ({ dictionary }) => {
    const theme = composeTheme(dictionary.tokens);

    return [
      '// GENERATED FILE — do not edit by hand.',
      '// Built from the token JSON in tokens/ by `npm run build-tokens` (build.js).',
      `export const theme = ${JSON.stringify(theme, null, 2)} as const;`,
      '',
      'export type Theme = typeof theme;',
      '',
      '// Only colors differ between light/dark; all other scales are shared.',
      `const darkColors = ${JSON.stringify(darkColors, null, 2)} as const;`,
      '',
      'export const themes = {',
      '  light: theme,',
      '  dark: { ...theme, color: darkColors }',
      '} as const;',
      '',
      'export type ThemeMode = keyof typeof themes;',
      '',
      '// Typography device classes: `theme.typography` is the mobile set',
      '// (the React Native default); desktop is provided for large screens.',
      `const desktopTypography = ${JSON.stringify(desktopTypography, null, 2)} as const;`,
      '',
      'export const typographies = {',
      '  mobile: theme.typography,',
      '  desktop: desktopTypography',
      '} as const;',
      '',
      'export type TypographyMode = keyof typeof typographies;',
      ''
    ].join('\n');
  }
});

const BUILD_PATH = 'src/theme/';

/** Shared Style Dictionary options for all mode passes. */
const baseConfig = {
  source: ['tokens/**/*.json'],
  log: {
    // Token sets such as typography/mobile + typography/desktop
    // intentionally collide; keep the output focused on actionable errors.
    verbosity: 'default',
    warnings: 'disabled'
  }
};

/**
 * Main build: light colors + mobile typography — the correct defaults for
 * a React Native target. The opposing mode files (color/dark.json,
 * typography/desktop.json) are excluded by the parser and compiled in
 * separate passes below.
 */
const styleDictionary = new StyleDictionary({
  ...baseConfig,
  parsers: ['dtcg-light-mobile'],
  platforms: {
    ts: {
      transformGroup: 'js',
      buildPath: BUILD_PATH,
      files: [
        {
          destination: 'tokens.ts',
          format: 'typescript/nested-theme'
        }
      ]
    }
  }
});

try {
  // Self-healing output directory: create src/theme/ if it does not exist
  // so a fresh clone can build without manual setup.
  await mkdir(BUILD_PATH, { recursive: true });

  // Dark-mode pass: same sources but with color/light.json swapped out for
  // color/dark.json. Only the resolved `color` namespace is kept — every
  // other token is mode-independent and shared with the light theme.
  const darkDictionary = new StyleDictionary({
    ...baseConfig,
    parsers: ['dtcg-dark-mode'],
    platforms: {}
  });

  await darkDictionary.hasInitialized;
  darkColors = composeTheme(darkDictionary.tokens).color;

  // Desktop-typography pass: typography/mobile.json swapped out for
  // typography/desktop.json. Only the resolved `typography` namespace is
  // kept, exposed via the `typographies` export for large-screen layouts.
  const desktopDictionary = new StyleDictionary({
    ...baseConfig,
    parsers: ['dtcg-desktop-typography'],
    platforms: {}
  });

  await desktopDictionary.hasInitialized;
  desktopTypography = composeTheme(desktopDictionary.tokens).typography;

  await styleDictionary.buildAllPlatforms();

  console.log(
    '✔ Design tokens compiled successfully → src/theme/tokens.ts (light + dark, mobile + desktop typography)'
  );
} catch (error) {
  console.error('✖ Design token build failed:');
  console.error(error);
  process.exitCode = 1;
}
