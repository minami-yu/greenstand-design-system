import colorLightJson from '../../../tokens/variables/color/light.json';
import sizeJson from '../../../tokens/variables/size/value.json';
import stylesJson from '../../../tokens/styles/value.json';
import { themes } from '../../theme/tokens';
import type { TokenCatalogEntry } from '../components/TokenCatalog';
import { flattenDtcgTokens, getByPath } from './parseDtcgTokens';

function resolveThemeValue(path: string): string {
  const value = getByPath(themes.light, path);
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '—';
}

export function buildColorCatalogEntries(): TokenCatalogEntry[] {
  return flattenDtcgTokens(colorLightJson as Record<string, unknown>)
    .filter((token) => token.type === 'color')
    .map((token) => ({
      name: token.path,
      value: resolveThemeValue(`color.${token.path}`),
      description: token.description,
      usage: `t.color.${token.path}`
    }));
}

export function buildTypographyCatalogEntries(): TokenCatalogEntry[] {
  return flattenDtcgTokens(stylesJson as Record<string, unknown>)
    .filter((token) => token.type === 'typography')
    .map((token) => {
      const key = token.path.split('.').pop() ?? token.path;
      const sample = getByPath(themes.light.typography, key);

      return {
        name: key,
        value: sample ? formatTypographyValue(sample) : token.path,
        description: token.description,
        usage: `t.typography['${key}']`
      };
    });
}

function formatTypographyValue(value: unknown): string {
  if (!value || typeof value !== 'object') return '—';
  const style = value as Record<string, unknown>;
  return [
    style.fontFamily,
    style.fontSize ? `${style.fontSize}px` : undefined,
    style.fontWeight ? `weight ${style.fontWeight}` : undefined
  ]
    .filter(Boolean)
    .join(' · ');
}

export function buildScaleCatalogEntries(
  section: 'space' | 'radius' | 'stroke' | 'icon',
  themePath: 'space' | 'radius' | 'stroke' | 'icon'
): TokenCatalogEntry[] {
  const sectionNode = (sizeJson as Record<string, unknown>)[section] as Record<string, unknown>;

  return flattenDtcgTokens(sectionNode).map((token) => {
    const key = token.path.split('.').pop() ?? token.path;
    const resolved = resolveThemeValue(`${themePath}.${key}`);

    return {
      name: key,
      value: `${resolved}px`,
      description: token.description,
      usage:
        themePath === 'space'
          ? `<Box p="${key}" /> or theme.space['${key}']`
          : `theme.${themePath}.${key}`
    };
  });
}

export function buildElevationCatalogEntries(): TokenCatalogEntry[] {
  const elevation = (stylesJson as Record<string, unknown>).elevation as Record<string, unknown>;

  return flattenDtcgTokens(elevation).map((token) => {
    const key = token.path.split('.').pop() ?? token.path;

    return {
      name: key,
      value: Array.isArray(token.rawValue)
        ? `${(token.rawValue as unknown[]).length} shadow layer(s)`
        : String(token.rawValue),
      description: token.description,
      usage: `getShadow(t.elevation.${key})`
    };
  });
}
