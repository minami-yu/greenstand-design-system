import type { themes, ThemeMode } from '../../theme/tokens';

type ThemeTokens = (typeof themes)[ThemeMode];

/** Semantic icon color paths under `theme.color.icon.*` */
export type IconColorPath =
  | 'neutral.primary'
  | 'neutral.secondary'
  | 'neutral.tertiary'
  | 'neutral.disabled'
  | 'neutral.inverse'
  | 'neutral.on-disabled'
  | 'brand.default'
  | 'brand.on-brand'
  | 'accent.default'
  | 'accent.on-accent'
  | 'error.default'
  | 'error.on-emphasis'
  | 'success.default'
  | 'success.on-emphasis'
  | 'info.default'
  | 'info.on-emphasis'
  | 'warning.default'
  | 'warning.on-emphasis';

const COLOR_LOOKUP: Record<IconColorPath, (theme: ThemeTokens) => string> = {
  'neutral.primary': (t) => t.color.icon.neutral.primary,
  'neutral.secondary': (t) => t.color.icon.neutral.secondary,
  'neutral.tertiary': (t) => t.color.icon.neutral.tertiary,
  'neutral.disabled': (t) => t.color.icon.neutral.disabled,
  'neutral.inverse': (t) => t.color.icon.neutral.inverse,
  'neutral.on-disabled': (t) => t.color.icon.neutral['on-disabled'],
  'brand.default': (t) => t.color.icon.brand.default,
  'brand.on-brand': (t) => t.color.icon.brand['on-brand'],
  'accent.default': (t) => t.color.icon.accent.default,
  'accent.on-accent': (t) => t.color.icon.accent['on-accent'],
  'error.default': (t) => t.color.icon.error.default,
  'error.on-emphasis': (t) => t.color.icon.error['on-emphasis'],
  'success.default': (t) => t.color.icon.success.default,
  'success.on-emphasis': (t) => t.color.icon.success['on-emphasis'],
  'info.default': (t) => t.color.icon.info.default,
  'info.on-emphasis': (t) => t.color.icon.info['on-emphasis'],
  'warning.default': (t) => t.color.icon.warning.default,
  'warning.on-emphasis': (t) => t.color.icon.warning['on-emphasis']
};

export function resolveIconColor(theme: ThemeTokens, color: IconColorPath): string {
  return COLOR_LOOKUP[color](theme);
}
