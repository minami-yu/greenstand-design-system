import { theme, themes, type ThemeMode } from '../../theme/tokens';

export type ThemeTokens = (typeof themes)[ThemeMode];

export type ProgressBarStyleTokens = {
  indicatorBackgroundColor: string;
  trackBackgroundColor: string;
};

export type ProgressBarLayout = {
  borderRadius: number;
  height: number;
};

/** Figma ProgressBar (13472:24568) — 8px track, pill radius, brand fill. */
export function getProgressBarLayout(): ProgressBarLayout {
  return {
    borderRadius: theme.radius.full,
    height: theme.size[200]
  };
}

export function getProgressBarStyles(color: ThemeTokens['color']): ProgressBarStyleTokens {
  return {
    indicatorBackgroundColor: color.fill.brand.default,
    trackBackgroundColor: color.fill.neutral.default
  };
}

export function clampProgress(value: number, max: number): number {
  if (max <= 0) {
    return 0;
  }

  return Math.min(max, Math.max(0, value));
}

export function getProgressRatio(value: number, max: number): number {
  const clamped = clampProgress(value, max);
  return clamped / max;
}
