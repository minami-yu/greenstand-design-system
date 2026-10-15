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

export type ButtonSize = 'md' | 'sm';

/** Figma `state` — default, active (press / web interaction), or disabled. */
export type ButtonState = 'default' | 'active' | 'disabled';

/** `state` prop — preview default or active only; use `disabled` for the disabled look. */
export type ButtonPreviewState = Exclude<ButtonState, 'disabled'>;

export type ButtonStyleTokens = {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth: number;
  textColor: string;
};

export function getButtonStyles(
  t: ThemeTokens,
  variant: ButtonVariant,
  state: ButtonState
): ButtonStyleTokens {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor:
          state === 'disabled'
            ? t.color.fill.brand.disabled
            : state === 'active'
              ? t.color.fill.brand.defaultActive
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
            : state === 'active'
              ? t.color.fill.neutral.defaultActive
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
            : state === 'active'
              ? t.color.fill.neutral.subtleActive
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
            : state === 'active'
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
            : state === 'active'
              ? t.color.fill.error.subtleActive
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
            : state === 'active'
              ? t.color.fill.error.subtleActive
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
  const isMd = size === 'md';

  return {
    minHeight: isMd
      ? theme.size[1200]
      : theme.size[900],
    minWidth: theme.size[1200],
    paddingHorizontal: isMd ? theme.space['400'] : theme.space['300'],
    paddingVertical: isMd ? theme.space['300'] : theme.space['0'],
    gap: hasIcon ? (isMd ? theme.space['200'] : theme.space['100']) : theme.space['0'],
    iconSize: isMd ? theme.icon.md : theme.typography.labelM.fontSize,
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
