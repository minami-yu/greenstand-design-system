import { theme, themes, type ThemeMode } from '../../theme/tokens';
import type { IconName } from '../Icon/icons';

export type ThemeTokens = (typeof themes)[ThemeMode];

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'error'
  | 'error-secondary';

export type ButtonSize = 'medium' | 'small';

export type ButtonVisualState = 'default' | 'hover' | 'pressed' | 'disabled';

export type ButtonStyleTokens = {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth: number;
  textColor: string;
};

type Interaction = 'default' | 'hover' | 'pressed' | 'disabled';

function resolveInteraction(visualState: ButtonVisualState): Interaction {
  if (visualState === 'disabled') return 'disabled';
  if (visualState === 'pressed') return 'pressed';
  if (visualState === 'hover') return 'hover';
  return 'default';
}

export function getButtonStyles(
  t: ThemeTokens,
  variant: ButtonVariant,
  visualState: ButtonVisualState
): ButtonStyleTokens {
  const state = resolveInteraction(visualState);

  switch (variant) {
    case 'primary':
      return {
        backgroundColor:
          state === 'disabled'
            ? t.color.fill.neutral.disabled
            : state === 'pressed'
              ? t.color.fill.brand.defaultSelected
              : state === 'hover'
                ? t.color.fill.brand.defaultHover
                : t.color.fill.brand.default,
        borderWidth: 0,
        textColor:
          state === 'disabled'
            ? t.color.text.neutral.disabled
            : t.color.text.brand.onBrand
      };

    case 'secondary':
      return {
        backgroundColor:
          state === 'disabled'
            ? t.color.fill.neutral.disabled
            : state === 'pressed'
              ? t.color.fill.neutral.defaultSelected
              : state === 'hover'
                ? t.color.fill.neutral.defaultHover
                : t.color.fill.neutral.default,
        borderWidth: 0,
        textColor:
          state === 'disabled'
            ? t.color.text.neutral.disabled
            : t.color.text.neutral.primary
      };

    case 'tertiary':
      return {
        backgroundColor:
          state === 'disabled'
            ? undefined
            : state === 'pressed'
              ? t.color.fill.neutral.subtleSelected
              : state === 'hover'
                ? t.color.fill.neutral.subtleHover
                : undefined,
        borderWidth: 0,
        textColor:
          state === 'disabled'
            ? t.color.text.neutral.disabled
            : t.color.text.neutral.primary
      };

    case 'accent':
      return {
        backgroundColor:
          state === 'disabled'
            ? undefined
            : state === 'pressed'
              ? t.color.fill.brand.subtleHover
              : state === 'hover'
                ? t.color.fill.brand.subtle
                : undefined,
        borderColor:
          state === 'disabled'
            ? t.color.border.neutral.disabled
            : t.color.border.brand.default,
        borderWidth: theme.border.sm,
        textColor:
          state === 'disabled'
            ? t.color.text.neutral.disabled
            : t.color.text.brand.default
      };

    case 'error':
      return {
        backgroundColor:
          state === 'disabled'
            ? t.color.fill.neutral.disabled
            : state === 'pressed'
              ? t.color.fill.error.subtleSelected
              : state === 'hover'
                ? t.color.fill.error.subtleHover
                : t.color.fill.error.subtle,
        borderWidth: 0,
        textColor:
          state === 'disabled'
            ? t.color.text.neutral.disabled
            : t.color.text.error.default
      };

    case 'error-secondary':
      return {
        backgroundColor:
          state === 'disabled'
            ? t.color.fill.neutral.disabled
            : state === 'pressed'
              ? t.color.fill.error.subtleSelected
              : state === 'hover'
                ? t.color.fill.error.subtleHover
                : undefined,
        borderWidth: 0,
        textColor:
          state === 'disabled'
            ? t.color.text.neutral.disabled
            : t.color.text.error.default
      };
  }
}

export function getButtonLayout(size: ButtonSize, hasIcon: boolean) {
  const isMedium = size === 'medium';

  return {
    minHeight: isMedium
      ? theme.space['1200']
      : theme.space['300'] + theme.space['600'],
    minWidth: theme.space['1200'],
    paddingHorizontal: isMedium ? theme.space['400'] : theme.space['300'],
    paddingVertical: isMedium ? theme.space['300'] : theme.space['0'],
    gap: hasIcon ? (isMedium ? theme.space['200'] : theme.space['100']) : theme.space['0'],
    iconSize: isMedium ? theme.icon.md : theme.typography.labelM.fontSize,
    borderRadius: theme.radius.md
  };
}

/** Derives icon slots from props — Figma `iconPosition` is leading, trailing, or none. */
export function resolveButtonIcons(leadingIcon?: IconName, trailingIcon?: IconName) {
  if (leadingIcon) {
    return { hasIcon: true, leading: leadingIcon, trailing: undefined };
  }

  if (trailingIcon) {
    return { hasIcon: true, leading: undefined, trailing: trailingIcon };
  }

  return { hasIcon: false, leading: undefined, trailing: undefined };
}
