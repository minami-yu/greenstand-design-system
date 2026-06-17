import colorLightJson from '../../../tokens/variables/color/light.json';
import colorPrimitiveJson from '../../../tokens/variables/color_primitive/value.json';
import { theme, themes, type ThemeMode } from '../../theme/tokens';
import { flattenDtcgTokens, getByPath } from './parseDtcgTokens';
import { camelCasePath, formatTokenPath, kebabToCamel } from './tokenKey';

const ALIAS_PATTERN = /^\{([^}]+)\}$/;

export type SemanticColorCategory = keyof typeof colorLightJson;

export type SemanticColorDocEntry = {
  category: SemanticColorCategory;
  description?: string;
  group: string;
  path: string;
  primitiveName?: string;
  primitiveValue?: string;
  resolvedValue: string;
  tokenName: string;
  usage: string;
};

export type PrimitiveColorDocEntry = {
  group: string;
  path: string;
  tokenName: string;
  usage: string;
  value: string;
};

function isExcludedColorToken(...segments: string[]): boolean {
  return segments.some((segment) => segment.includes('OLD'));
}

function resolveThemeColor(path: string, mode: ThemeMode = 'light'): string {
  const colorPath = path.startsWith('color.') ? path : `color.${path}`;
  const value = getByPath(themes[mode], camelCasePath(colorPath));
  return typeof value === 'string' ? value : '—';
}

function formatTokenName(path: string): string {
  return camelCasePath(`color.${path}`);
}

function formatColorUsage(path: string): string {
  const normalized = path.startsWith('color.') ? path : `color.${path}`;
  return formatTokenPath(normalized);
}

function parseAlias(rawValue: unknown): string | undefined {
  if (typeof rawValue !== 'string') return undefined;
  const match = rawValue.match(ALIAS_PATTERN);
  return match?.[1];
}

function resolvePrimitiveReference(rawValue: unknown): {
  primitiveName?: string;
  primitiveValue?: string;
} {
  const alias = parseAlias(rawValue);
  if (!alias) return {};

  const [family, step] = alias.split('.');
  if (!family || !step) return { primitiveName: alias.replace('/', '.') };

  const primitiveValue = getByPath(theme.color.palette, `${kebabToCamel(family)}.${step}`);
  return {
    primitiveName: `${kebabToCamel(family)}.${step}`,
    primitiveValue:
      typeof primitiveValue === 'string' ? primitiveValue.toLowerCase() : undefined
  };
}

function isSemanticColorGroup(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !('$type' in value));
}

function sortByTokenName<T extends { tokenName: string }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.tokenName.localeCompare(b.tokenName));
}

export function getSemanticColorCategories(): SemanticColorCategory[] {
  return Object.keys(colorLightJson).filter((key) => !key.startsWith('$')) as SemanticColorCategory[];
}

export function getSemanticColorGroups(category: SemanticColorCategory): string[] {
  const categoryNode = colorLightJson[category];
  if (!categoryNode || typeof categoryNode !== 'object') return [];

  return Object.keys(categoryNode)
    .filter((key) => !key.startsWith('$') && !isExcludedColorToken(key))
    .filter((key) => isSemanticColorGroup(categoryNode[key as keyof typeof categoryNode]))
    .sort((a, b) => a.localeCompare(b));
}

export function buildSemanticColorDocEntries(
  category: SemanticColorCategory,
  group?: string,
  mode: ThemeMode = 'light'
): SemanticColorDocEntry[] {
  const categoryNode = colorLightJson[category];
  if (!categoryNode || typeof categoryNode !== 'object') return [];

  const entries = flattenDtcgTokens(categoryNode as Record<string, unknown>, String(category))
    .filter((token) => token.type === 'color')
    .filter((token) => !isExcludedColorToken(...token.path.split('.')))
    .filter((token) => {
      if (!group) return true;
      return token.path.split('.')[1] === group;
    })
    .map((token) => {
      const path = `color.${token.path}`;
      const tokenGroup = token.path.split('.')[1] ?? '';
      const { primitiveName, primitiveValue } = resolvePrimitiveReference(token.rawValue);

      return {
        category,
        group: tokenGroup,
        path,
        tokenName: formatTokenName(token.path),
        description: token.description,
        resolvedValue: resolveThemeColor(path, mode).toLowerCase(),
        primitiveName,
        primitiveValue,
        usage: formatColorUsage(path)
      };
    });

  return sortByTokenName(entries);
}

export function buildSemanticColorDocSections(): Record<SemanticColorCategory, SemanticColorDocEntry[]> {
  return getSemanticColorCategories().reduce<Record<SemanticColorCategory, SemanticColorDocEntry[]>>(
    (sections, category) => {
      sections[category] = buildSemanticColorDocEntries(category);
      return sections;
    },
    {} as Record<SemanticColorCategory, SemanticColorDocEntry[]>
  );
}

export function getPrimitiveColorGroups(): string[] {
  return Object.keys(colorPrimitiveJson)
    .filter((key) => !key.startsWith('$') && !isExcludedColorToken(key))
    .sort((a, b) => a.localeCompare(b));
}

export function buildPrimitiveColorDocEntries(group?: string): PrimitiveColorDocEntry[] {
  return flattenDtcgTokens(colorPrimitiveJson as Record<string, unknown>)
    .filter((token) => token.type === 'color')
    .filter((token) => !isExcludedColorToken(...token.path.split('.')))
    .filter((token) => {
      if (!group) return true;
      return token.path.split('.')[0] === group;
    })
    .map((token) => {
      const tokenGroup = token.path.split('.')[0] ?? '';

      return {
        group: tokenGroup,
        path: `color.palette.${token.path}`,
        tokenName: `color.palette.${token.path}`,
        usage: formatColorUsage(`color.palette.${token.path}`),
        value:
          typeof token.rawValue === 'string'
            ? token.rawValue.toLowerCase()
            : resolveThemeColor(`color.palette.${token.path}`).toLowerCase()
      };
    });
}
