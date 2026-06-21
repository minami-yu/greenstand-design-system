import { theme, themes, type ThemeMode } from '../../theme/tokens';

export type ThemeTokens = (typeof themes)[ThemeMode];

export type RadioIndicatorStyleTokens = {
  innerBackgroundColor: string;
  innerSize: number;
  outerBackgroundColor: string;
};

export type RadioLayout = {
  dotSize: number;
  gap: number;
  groupHintGap: number;
  groupLabelGap: number;
  groupSlotMarginLeft: number;
  groupSlotPaddingRight: number;
  groupSlotPaddingVertical: number;
  optionGap: number;
  ringInnerSize: number;
  size: number;
  touchTargetPadding: number;
};

/** Figma RadioButton (15274:37789) — 20px indicator with 12px touch target padding. */
export function getRadioLayout(): RadioLayout {
  return {
    dotSize: theme.space['200'],
    gap: theme.space['0'],
    groupHintGap: theme.space['100'],
    groupLabelGap: theme.space['100'],
    groupSlotMarginLeft: theme.space['n300'],
    groupSlotPaddingRight: theme.space['0'],
    groupSlotPaddingVertical: theme.space['100'],
    optionGap: theme.space['0'],
    ringInnerSize: theme.icon.sm,
    size: theme.icon.md,
    touchTargetPadding: theme.space['300']
  };
}

export function getRadioIndicatorStyles(
  color: ThemeTokens['color'],
  selected: boolean,
  disabled: boolean,
  error: boolean
): RadioIndicatorStyleTokens {
  const { dotSize, ringInnerSize } = getRadioLayout();

  if (disabled) {
    return {
      outerBackgroundColor: color.icon.neutral.disabled,
      innerBackgroundColor: color.icon.neutral.inverse,
      innerSize: selected ? dotSize : ringInnerSize
    };
  }

  if (error && selected) {
    return {
      outerBackgroundColor: color.icon.error.default,
      innerBackgroundColor: color.icon.brand.onBrand,
      innerSize: dotSize
    };
  }

  if (selected) {
    return {
      outerBackgroundColor: color.icon.brand.default,
      innerBackgroundColor: color.icon.brand.onBrand,
      innerSize: dotSize
    };
  }

  if (error) {
    return {
      outerBackgroundColor: color.icon.error.default,
      innerBackgroundColor: color.icon.error.onEmphasis,
      innerSize: ringInnerSize
    };
  }

  return {
    outerBackgroundColor: color.icon.neutral.secondary,
    innerBackgroundColor: color.icon.brand.onBrand,
    innerSize: ringInnerSize
  };
}

export function getRadioTouchSize(): number {
  const { size, touchTargetPadding } = getRadioLayout();
  return size + touchTargetPadding * 2;
}

export function getRadioLabelColor(
  color: ThemeTokens['color'],
  disabled: boolean
): string {
  return disabled ? color.text.neutral.disabled : color.text.neutral.primary;
}
