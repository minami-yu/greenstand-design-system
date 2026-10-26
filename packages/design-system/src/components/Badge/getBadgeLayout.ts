import { theme, themes, type ThemeMode } from '../../theme/tokens';

type ThemeTokens = (typeof themes)[ThemeMode];

/** Matches Figma Badge property `type`. */
export type BadgeType = 'label' | 'dot';

export type BadgeSize = 'md' | 'lg';

type TypographyKey = 'labelS' | 'labelM';

export type BadgeLayout = {
  borderRadius: number;
  height: number;
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
    textColor: t.color.text.info.onEmphasis
  };
}

export function getBadgeLayout(type: BadgeType, size: BadgeSize): BadgeLayout {
  if (type === 'dot') {
    const dimension = size === 'lg' ? theme.icon.sm : theme.icon.xs;

    return {
      borderRadius: theme.radius.full,
      height: dimension,
      minWidth: dimension,
      paddingHorizontal: theme.space['0'],
      typography: null,
      width: dimension
    };
  }

  const height = size === 'lg' ? theme.icon.md : theme.space['400'];
  const minWidth = size === 'lg' ? theme.icon.md : theme.space['400'];
  const paddingHorizontal =
    size === 'lg'
      ? theme.space['100']
      : theme.space['100'];

  return {
    borderRadius: theme.radius.full,
    height,
    minWidth,
    paddingHorizontal,
    typography: size === 'lg' ? 'labelM' : 'labelS'
  };
}
