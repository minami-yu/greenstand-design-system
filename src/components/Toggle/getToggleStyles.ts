import { theme, themes, type ThemeMode } from '../../theme/tokens';

export type ThemeTokens = (typeof themes)[ThemeMode];

export type ToggleStyleTokens = {
  thumbBackgroundColor: string;
  trackBackgroundColor: string;
};

export type ToggleLayout = {
  borderRadius: number;
  paddingHorizontal: number;
  paddingVertical: number;
  thumbSize: number;
  trackWidth: number;
};

/** Figma Toggle (13571:25414) — 48×24 track, 20px thumb, pill radius. */
export function getToggleLayout(): ToggleLayout {
  return {
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.space['050'],
    paddingVertical: theme.space['050'],
    thumbSize: theme.icon.md,
    trackWidth: theme.icon['2xl']
  };
}

export function getToggleStyles(
  color: ThemeTokens['color'],
  toggled: boolean,
  disabled: boolean
): ToggleStyleTokens {
  if (disabled) {
    return {
      trackBackgroundColor: color.fill.neutral.disabled,
      thumbBackgroundColor: color.icon.neutral.onDisabled
    };
  }

  if (toggled) {
    return {
      trackBackgroundColor: color.fill.brand.default,
      thumbBackgroundColor: color.fill.neutral.surface
    };
  }

  return {
    trackBackgroundColor: color.fill.neutral.default,
    thumbBackgroundColor: color.fill.neutral.surface
  };
}
