import { theme, themes, type ThemeMode } from '../../theme/tokens';

export type ThemeTokens = (typeof themes)[ThemeMode];

export type CheckInputIndicatorStyleTokens = {
  backgroundColor: string;
  checkColor: 'brand.onBrand' | 'neutral.inverse';
  innerBackgroundColor: string;
  innerSize: number;
};

export type CheckInputLayout = {
  checkIconSize: number;
  padding: number;
  ringInnerSize: number;
  size: number;
};

/** Figma CheckInput (12982:15345) — 20px indicator, 16px check, 2px padding. */
export function getCheckInputLayout(): CheckInputLayout {
  return {
    checkIconSize: theme.icon.sm,
    padding: theme.space['050'],
    ringInnerSize: theme.icon.sm,
    size: theme.icon.md
  };
}

export function getCheckInputIndicatorStyles(
  color: ThemeTokens['color'],
  selected: boolean,
  disabled: boolean
): CheckInputIndicatorStyleTokens {
  const { ringInnerSize } = getCheckInputLayout();

  if (disabled) {
    return {
      backgroundColor: color.icon.neutral.disabled,
      checkColor: 'neutral.inverse',
      innerBackgroundColor: color.icon.neutral.inverse,
      innerSize: ringInnerSize
    };
  }

  if (selected) {
    return {
      backgroundColor: color.icon.brand.default,
      checkColor: 'brand.onBrand',
      innerBackgroundColor: color.icon.brand.onBrand,
      innerSize: ringInnerSize
    };
  }

  return {
    backgroundColor: color.icon.neutral.tertiary,
    checkColor: 'brand.onBrand',
    innerBackgroundColor: color.icon.brand.onBrand,
    innerSize: ringInnerSize
  };
}

export function getCheckInputTouchSize(): number {
  const { padding, size } = getCheckInputLayout();
  return size + padding * 2;
}
