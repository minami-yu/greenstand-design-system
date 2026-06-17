import type { themes, ThemeMode } from '../../theme/tokens';

type ThemeTokens = (typeof themes)[ThemeMode];

/** Semantic icon color paths under `theme.color.icon.*` */
export type IconColorPath =
  | 'neutral.primary'
  | 'neutral.secondary'
  | 'neutral.tertiary'
  | 'neutral.disabled'
  | 'neutral.inverse'
  | 'neutral.onDisabled'
  | 'brand.default'
  | 'brand.onBrand'
  | 'accent.default'
  | 'accent.onAccent'
  | 'error.default'
  | 'error.onEmphasis'
  | 'success.default'
  | 'success.onEmphasis'
  | 'info.default'
  | 'info.onEmphasis'
  | 'warning.default'
  | 'warning.onEmphasis';

const COLOR_LOOKUP: Record<IconColorPath, (theme: ThemeTokens) => string> = {
  'neutral.primary': (t) => t.color.icon.neutral.primary,
  'neutral.secondary': (t) => t.color.icon.neutral.secondary,
  'neutral.tertiary': (t) => t.color.icon.neutral.tertiary,
  'neutral.disabled': (t) => t.color.icon.neutral.disabled,
  'neutral.inverse': (t) => t.color.icon.neutral.inverse,
  'neutral.onDisabled': (t) => t.color.icon.neutral.onDisabled,
  'brand.default': (t) => t.color.icon.brand.default,
  'brand.onBrand': (t) => t.color.icon.brand.onBrand,
  'accent.default': (t) => t.color.icon.accent.default,
  'accent.onAccent': (t) => t.color.icon.accent.onAccent,
  'error.default': (t) => t.color.icon.error.default,
  'error.onEmphasis': (t) => t.color.icon.error.onEmphasis,
  'success.default': (t) => t.color.icon.success.default,
  'success.onEmphasis': (t) => t.color.icon.success.onEmphasis,
  'info.default': (t) => t.color.icon.info.default,
  'info.onEmphasis': (t) => t.color.icon.info.onEmphasis,
  'warning.default': (t) => t.color.icon.warning.default,
  'warning.onEmphasis': (t) => t.color.icon.warning.onEmphasis
};

export function resolveIconColor(theme: ThemeTokens, color: IconColorPath): string {
  return COLOR_LOOKUP[color](theme);
}
