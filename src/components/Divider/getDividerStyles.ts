import { theme, themes, type ThemeMode } from '../../theme/tokens';

export type ThemeTokens = (typeof themes)[ThemeMode];

export type DividerStyleTokens = {
  backgroundColor: string;
  thickness: number;
};

/** Figma Divider (12962:9382) — 1px line using border/neutral/subtle. */
export function getDividerStyles(color: ThemeTokens['color']): DividerStyleTokens {
  return {
    backgroundColor: color.border.neutral.subtle,
    thickness: theme.border.sm
  };
}
