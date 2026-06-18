import sizeJson from '../../../tokens/variables/size/value.json';
import typographyJson from '../../../tokens/styles/typography.json';
import { theme, themes } from '../../theme/tokens';
import type { ElevationToken } from '../../theme/getShadow';
import type { StorybookTokenCatalogEntry } from '../ui';
import { flattenDtcgTokens, getByPath } from './parseDtcgTokens';
import { camelCasePath, formatTokenPath, kebabToCamel } from './tokenKey';

const elevationLevels = ['sm', 'md', 'lg'] as const;

function resolveThemeValue(path: string): string {
  const value = getByPath(themes.light, camelCasePath(path));
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '—';
}

export function buildTypographyCatalogEntries(): StorybookTokenCatalogEntry[] {
  return flattenDtcgTokens(typographyJson as Record<string, unknown>)
    .filter((token) => token.type === 'typography')
    .map((token) => {
      const key = kebabToCamel(token.path.split('.').pop() ?? token.path);
      const sample = getByPath(themes.light.typography, key);

      return {
        name: key,
        value: sample ? formatTypographyValue(sample) : token.path,
        description: token.description,
        usage: formatTokenPath(`typography.${key}`)
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
  section: 'space' | 'radius' | 'border' | 'icon',
  themePath: 'space' | 'radius' | 'border' | 'icon'
): StorybookTokenCatalogEntry[] {
  const sectionNode = (sizeJson as Record<string, unknown>)[section] as Record<string, unknown>;

  return flattenDtcgTokens(sectionNode).map((token) => {
    const key = token.path.split('.').pop() ?? token.path;
    const resolved = resolveThemeValue(`${themePath}.${key}`);

    return {
      name: key,
      value: `${resolved}px`,
      description: token.description,
      usage: formatTokenPath(`${themePath}.${key}`)
    };
  });
}

function formatAlias(rawValue: unknown): string {
  if (typeof rawValue !== 'string') return '—';
  const match = rawValue.match(/^\{([^}]+)\}$/);
  return match?.[1] ?? rawValue;
}

export type ElevationCatalogEntry = {
  androidValue: string;
  iosValue: string[];
  name: string;
  token: string;
};

export function buildElevationCatalogEntries(): ElevationCatalogEntry[] {
  return elevationLevels.map((key) => {
    const token = theme.elevation[key] as ElevationToken;

    return {
      name: key,
      token: formatTokenPath(`elevation.${key}`),
      androidValue: formatAndroidElevationValue(token),
      iosValue: formatIosElevationValue(token)
    };
  });
}

function formatAndroidElevationValue(token: ElevationToken): string {
  return String(token.android.elevation);
}

function formatIosElevationValue(token: ElevationToken): string[] {
  const { shadowColor, shadowOpacity, shadowRadius, shadowOffset } = token.ios;

  return [
    `color ${shadowColor}`,
    `opacity ${shadowOpacity}`,
    `radius ${shadowRadius}px`,
    `offsetY ${shadowOffset.height}px`
  ];
}

export type LayoutCatalogEntry = {
  alias: string;
  description?: string;
  name: string;
  resolvedPx: number;
  usage: string;
  value: string;
};

export function buildLayoutCatalogEntries(): LayoutCatalogEntry[] {
  const sectionNode = (sizeJson as Record<string, unknown>).layout as Record<string, unknown>;

  return flattenDtcgTokens(sectionNode).map((token) => {
    const key = kebabToCamel(token.path.split('.').pop() ?? token.path);
    const resolved = resolveThemeValue(`layout.${key}`);

    return {
      alias: formatAlias(token.rawValue),
      description: token.description,
      name: key,
      resolvedPx: Number(resolved) || 0,
      usage: formatTokenPath(`layout.${key}`),
      value: `${resolved}px`
    };
  });
}

export type ViewportCatalogEntry = {
  description: string;
  name: string;
  width: string;
};

export function buildViewportCatalogEntries(): ViewportCatalogEntry[] {
  return [
    {
      name: 'Minimum supported',
      width: '320px',
      description: 'Validate usability on narrow screens'
    },
    {
      name: 'Design reference',
      width: '360px',
      description: 'Primary design viewport'
    }
  ];
}
