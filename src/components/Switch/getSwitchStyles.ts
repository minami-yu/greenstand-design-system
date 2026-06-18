import { theme, themes, type ThemeMode } from '../../theme/tokens';

export type ThemeTokens = (typeof themes)[ThemeMode];

export type SwitchStyleTokens = {
  thumbBackgroundColor: string;
  trackBackgroundColor: string;
};

export type SwitchLayout = {
  borderRadius: number;
  paddingHorizontal: number;
  paddingVertical: number;
  thumbSize: number;
  thumbTravel: number;
  trackHeight: number;
  trackWidth: number;
};

/** Figma Switch (13571:25414) — 48×24 track, 20px thumb, pill radius. */
export function getSwitchLayout(): SwitchLayout {
  const paddingHorizontal = theme.space['050'];
  const thumbSize = theme.icon.md;
  const trackWidth = theme.icon['2xl'];

  return {
    borderRadius: theme.radius.full,
    paddingHorizontal,
    paddingVertical: theme.space['050'],
    thumbSize,
    thumbTravel: trackWidth - paddingHorizontal * 2 - thumbSize,
    trackHeight: theme.icon.lg,
    trackWidth
  };
}

export function getSwitchStyles(
  color: ThemeTokens['color'],
  toggled: boolean,
  disabled: boolean
): SwitchStyleTokens {
  if (disabled) {
    return {
      trackBackgroundColor: color.fill.neutral.default,
      thumbBackgroundColor: color.icon.neutral.onDisabled
    };
  }

  if (toggled) {
    return {
      trackBackgroundColor: color.fill.brand.default,
      thumbBackgroundColor: color.icon.neutral.inverse
    };
  }

  return {
    trackBackgroundColor: color.fill.neutral.default,
    thumbBackgroundColor: color.icon.neutral.inverse
  };
}
