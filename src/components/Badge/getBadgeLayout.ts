import { theme, themes, type ThemeMode } from '../../theme/tokens';

type ThemeTokens = (typeof themes)[ThemeMode];

/** Matches Figma Badge property `badge`. */
export type BadgeType = 'label' | 'dot';

export type BadgeSize = 'medium' | 'large';

type TypographyKey = 'label-s' | 'label-m';

export type BadgeLayout = {
  borderRadius: number;
  height?: number;
  minHeight?: number;
  minWidth: number;
  paddingHorizontal: number;
  typography: TypographyKey | null;
  width?: number;
};

export type BadgeStyleTokens = {
  backgroundColor: string;
  textColor: string;
};

export function getBadgeStyles(t: ThemeTokens): BadgeStyleTokens {
  return {
    backgroundColor: t.color.fill.error.emphasis,
    textColor: t.color.text.info['on-emphasis']
  };
}

export function getBadgeLayout(badge: BadgeType, size: BadgeSize): BadgeLayout {
  if (badge === 'dot') {
    const dimension = size === 'large' ? theme.icon.sm : theme.icon.xs;

    return {
      borderRadius: theme.radius.full,
      height: dimension,
      minWidth: dimension,
      paddingHorizontal: theme.space['0'],
      typography: null,
      width: dimension
    };
  }

  return {
    borderRadius: theme.radius.full,
    minHeight:
      size === 'large'
        ? theme.space['400'] + theme.space['100']
        : theme.space['400'],
    minWidth: theme.space['400'],
    paddingHorizontal:
      size === 'large'
        ? theme.space['050'] + theme.space['100']
        : theme.space['100'],
    typography: size === 'large' ? 'label-m' : 'label-s'
  };
}
