# greenstand-design-system

An Expo React Native design system sandbox. Design tokens (W3C format) are compiled with Style Dictionary v4 and rendered as components in Storybook.

## Architecture

This repo uses **one React Native component codebase** viewed in two Storybook environments. The stack splits into product code, tokens, docs authoring, and Storybook chrome.

### Product

| Layer | Technology |
|---|---|
| UI | React Native (`View`, `Text`, `Pressable`, …) |
| App | Expo SDK 51 |
| Design values | Style Dictionary v4 → `src/theme/tokens.ts` |
| Fonts | Expo Google Fonts via `useAppFonts()` |

Components in `src/components/` are written for RN. They must use web-compatible primitives so both Storybooks work.

### Design tokens

| Source | Output |
|---|---|
| `tokens/variables/` | Figma / Token Studio export (When variables are updated, replace old files and foloders with new ones, no manual edit needed.) |
| `tokens/styles/typography.json` | Hand-maintained typography text styles |
| `tokens/styles/elevation.json` | Hand-maintained elevation shadow styles |
| `npm run build-tokens` | Generates `src/theme/tokens.ts` (never edit by hand) |

Use `useTheme()` for mode-aware colors and `theme.*` for layout scales in components and docs.

### Two Storybook environments

Both read the same `src/components/**/*.stories.tsx` and `src/storybook/**/*.mdx` files.

| | On-device | Web |
|---|---|---|
| **Command** | `npm run storybook` | `npm run storybook:web` |
| **Config** | `.storybook/` | `.storybook-web/` |
| **Preview** | `.storybook/preview.tsx` | Re-exports preview + adds web docs params |
| **Where it runs** | Expo / simulator / Expo Go | Browser at localhost:6006 |
| **Component runtime** | Real React Native (native views) | **react-native-web** (RN → DOM) |
| **Package** | `@storybook/react-native` | `@storybook/react-native-web-vite` |

**Preview config:** Decorators and story sort live in `.storybook/preview.tsx` only. `.storybook-web/preview.tsx` imports that file and merges `storybookDocsParameters` (theme + docs settings) for web.

**Story canvas in docs:** The shared decorator uses `viewMode === 'docs'` so `<Primary />` / `<Canvas />` in component MDX render full-width with desktop typography. Canvas tab stories stay mobile-centered.

**react-native-web** is a compatibility layer: it renders RN components in the browser by translating `View` / `Text` into HTML. It is not a separate UI framework — same source files, different runtime.

### Docs pages (MDX)

Docs are MDX files. Authored content and previews use different layers.

| Content | Stack | Examples |
|---|---|---|
| **MDX prose** (all pages) | Markdown → HTML + CSS | `# Title`, `## Overview`, lists, blockquotes |
| **Component docs** | Storybook blocks + markdown | `<Title />`, `<ArgTypes />`, `<Primary />` |
| **Token catalogs / demos** | RN → react-native-web | `TypographyCatalog`, `SemanticColorList`, `TokenCatalog`, … (theme built in) |
| **Storybook shell** | HTML + CSS | Sidebar, toolbar, preview frame chrome |

**Component MDX pattern:**

```mdx
<Meta of={BadgeStories} />

<Title />

## Overview

TBD

## Props

<ArgTypes of={BadgeStories} />

## Preview

<Primary />
```

**Foundation MDX pattern** — markdown for prose, RN only for catalogs:

```mdx
<Meta title="Foundation/Typography" />

# Typography

## Preview

<TypographyCatalog entries={typography} />
```

**RN catalogs vs Storybook theming:** [Storybook theming](https://storybook.js.org/docs/configure/user-interface/theming) covers HTML docs chrome (`storybookTheme`, `storybookMdStyles`). Preview decorators only wrap `<Story />` blocks (`<Primary />`, `<Canvas />`), not arbitrary MDX components. Token catalogs therefore include an internal `CatalogThemeProvider` (theme + fonts) — the standard pattern for embedded react-native-web content, similar to Storybook’s documented CSS escape hatch for content the theme API does not reach.

**Docs styling (web Storybook):**

| File | Applied to |
|---|---|
| `.storybook-web/storybookMdStyles.ts` | MDX markdown + Storybook HTML blocks (`h1`, `p`, `<ArgTypes />`, …) |
| `src/storybook/ui/storybookRnTypography.ts` | RN typography inside catalog components (react-native-web) |
| `src/storybook/ui/storybookTable.tsx` | RN table layout for token catalogs |
| `.storybook-web/storybookTheme.ts` | Storybook shell + Docs tab chrome (wired in `manager.ts` and `storybookDocsParameters.ts`) |
| `.storybook-web/storybookDocsParameters.ts` | Docs tab settings (theme, hide source, controls sort) |
| `.storybook/preview.tsx` | Shared decorators, story sort, theme toolbar (web re-exports) |

- **Prop descriptions** live in `*.stories.tsx` → `argTypes.description`.
- Do not add `tags: ['autodocs']` on CSF when a paired `Component.mdx` exists.

### Stack at a glance

```
tokens (Style Dictionary)
        ↓
React Native components + docs UI (MDX)
        ↓
┌─────────────────────────┬──────────────────────────┐
│  Web Storybook          │  On-device Storybook     │
│  react-native-web       │  native RN               │
│  Storybook 8.6 + Vite   │  @storybook/react-native │
└─────────────────────────┴──────────────────────────┘
```

## Getting Started

```bash
npm install
npm run build-tokens   # compile tokens/ → src/theme/tokens.ts
npm run start          # normal Expo app view
```

## Scripts

| Command | What it does |
|---|---|
| `npm run build-tokens` | Compiles token JSON from `tokens/` into `src/theme/tokens.ts`. Run this after editing any token file or `build.js`. |
| `npm run start` | Starts the normal Expo application view. |
| `npm run storybook` | Starts Expo with the **on-device** Storybook UI (open on a simulator or in Expo Go). |
| `npm run storybook:web` | Starts the **desktop web** Storybook at [localhost:6006](http://localhost:6006). |
| `npm run storybook:web:build` | Builds the web Storybook into `storybook-static/` as a deployable static site. Used by CI for GitHub Pages. |

## Storybook

See [Architecture](#architecture) for how RN, react-native-web, MDX docs, and Storybook chrome fit together.

### Run locally

**On-device (Expo / simulator):**

```bash
npm run storybook
```

**Desktop web (browser at [localhost:6006](http://localhost:6006)):**

```bash
npm run storybook:web
```

### Build static site

```bash
npm run storybook:web:build
```

Output is written to `storybook-static/` (gitignored). This is the same build the GitHub Actions workflow publishes.

### Deployed site (GitHub Pages)

On every push to `main`, [.github/workflows/deploy-storybook.yml](.github/workflows/deploy-storybook.yml) builds Storybook and deploys it to GitHub Pages.

**URL:** [https://minami-yu.github.io/greenstand-design-system/](https://minami-yu.github.io/greenstand-design-system/)

General format: `https://<github-username>.github.io/<repo-name>/`

**One-time repo setup:** In the repository **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).

## Folder Structure

```
tokens/
  variables/         Figma variable export (Token Studio) — DO NOT edit by hand
    color/           Semantic colors, one file per mode (light.json / dark.json)
    color_primitive/ Raw palettes
    size/            Space, radius, border, icon, blur, depth scales
    typography/      Font variables, one file per device class (mobile / desktop)
  styles/            Hand-maintained W3C DTCG styles (typography.json, elevation.json)
build.js             Style Dictionary pipeline that compiles tokens
src/
  theme/tokens.ts    GENERATED by build-tokens — never edit by hand
  theme/fonts.ts     useAppFonts() — loads the font variants the tokens reference
  theme/getShadow.ts Adapts multi-layer token shadows to RN shadow styles
  theme/useTheme.ts  useTheme() — light/dark theme selection
  components/        RN components (Badge, Button, Icon, …) + *.stories.tsx + *.mdx
  storybook/           Foundation MDX, shared docs UI, and static assets (`asset/`)
.storybook/          Config for the ON-DEVICE Storybook (runs inside Expo on a phone)
.storybook-web/      Config for the DESKTOP WEB Storybook (Vite + react-native-web)
storybook-static/    Build output of storybook:web:build — generated, gitignored
App.tsx              App entry; switches to Storybook UI when STORYBOOK_ENABLED=true
```

## Token Workflow

### Syncing variables from Figma (Token Studio)

When variables change in Figma, refresh the export with the **Tokens Studio** plugin:

1. Open the Tokens Studio panel in Figma.
2. **Remove all existing token sets/values** in the panel (so stale tokens from a previous import don't linger).
3. **Import variables** (Styles & Variables → Import variables). Leave **"Convert numbers to dimensions" unchecked** — the build pipeline expects raw numbers.
4. **Export to file/folder** and choose **multiple files**.
5. Replace the contents of `tokens/variables/` with the exported folders/files (delete the old ones, drop in the new ones — including `$metadata.json` / `$themes.json`).
6. Run `npm run build-tokens` and check the diff in `src/theme/tokens.ts` looks as expected.

Never hand-edit anything inside `tokens/variables/` — it is always overwritten by the next export.

### Syncing styles (text styles & effects)

Figma **styles** (text styles, elevation/shadow effects) are not part of the variable export. When they change in Figma, **manually update `tokens/styles/typography.json`** and **`tokens/styles/elevation.json`** to match, keeping the W3C DTCG format (`$type: "typography"` / `"shadow"`, `{alias}` references to variables, ratio `lineHeight`, `px` dimensions). Then run `npm run build-tokens`.

### Consuming tokens

Use the regenerated `theme` / `themes` / `typographies` from `src/theme/tokens.ts` in components — never edit that file manually.

## Light & dark mode

The build compiles both color modes from `tokens/variables/color/light.json` and `dark.json`:

- `theme` — the default (light) theme.
- `themes.light` / `themes.dark` — both modes; only `color` differs, every other scale is shared.
- `useTheme()` from `src/theme/useTheme.ts` — returns the theme matching the device color scheme:

```tsx
const t = useTheme();
<Text style={{ color: t.color.text.neutral.primary }} />
```

## Typography Device Classes

`tokens/variables/typography/mobile.json` and `desktop.json` are both compiled:

- `theme.typography` — the mobile set (React Native default). Spread composite sets straight into `Text` styles: `<Text style={theme.typography['heading-m']} />`.
- `typographies.mobile` / `typographies.desktop` — both device classes, e.g. for tablet/large-screen layouts.

## Icons

Icons from the Figma **Icons** frame (`12663:7261`) are registered in `src/components/Icon/icons.ts`:

```tsx
import { Icon } from './src/components/Icon/Icon';

<Icon name="close" size="md" color="neutral.primary" />
```

- **Sizes** — `theme.icon.*` (`xs` → `3xl`), default `md`
- **Colors** — `theme.color.icon.*` via `color="neutral.primary"` etc.
- **83 MDI** icons keyed by Figma title suffix (`mdi:close` → `name="close"`)
- **2 custom** — `outline-wifi` (`ic:outline-wifi`), `offline` (`wordpress:offline`) in `Icon/custom.ts`

When icons are added to Figma, update `scripts/generate-icon-registry.mjs` and run `npm run generate-icons`.
