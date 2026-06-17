import type { PropsWithChildren } from 'react';
import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import {
  getButtonLayout,
  getButtonStyles,
  type ButtonIconPosition,
  type ButtonSize,
  type ButtonVariant,
  type ButtonVisualState
} from './getButtonStyles';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> &
  PropsWithChildren<{
    label?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Figma `iconPosition` — none, leading, or trailing. */
    iconPosition?: ButtonIconPosition;
    /** Icon shown when `iconPosition` is leading or trailing. */
    icon?: IconName;
    /** Force a Figma interaction state (Storybook / previews). */
    visualState?: ButtonVisualState;
    style?: StyleProp<ViewStyle>;
  }>;

export function Button({
  label = 'Save',
  variant = 'primary',
  size = 'medium',
  iconPosition = 'none',
  icon,
  visualState,
  disabled,
  style,
  accessibilityRole = 'button',
  ...props
}: ButtonProps) {
  const t = useTheme();
  const showIcon = iconPosition !== 'none' && Boolean(icon);
  const layout = getButtonLayout(size, showIcon);

  const renderIcon = (colors: ReturnType<typeof getButtonStyles>) =>
    showIcon && icon ? (
      <Icon
        colorValue={colors.textColor}
        name={icon}
        size={size === 'medium' ? 'md' : 'sm'}
        style={{ height: layout.iconSize, width: layout.iconSize }}
      />
    ) : null;

  return (
    <Pressable
      {...props}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      style={({ pressed }) => {
        const resolvedState: ButtonVisualState =
          visualState ?? (disabled ? 'disabled' : pressed ? 'pressed' : 'default');
        const colors = getButtonStyles(t, variant, resolvedState);

        return [
          {
            alignItems: 'center',
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            borderRadius: layout.borderRadius,
            borderWidth: colors.borderWidth,
            flexDirection: 'row',
            gap: layout.gap,
            justifyContent: 'center',
            minHeight: layout.minHeight,
            minWidth: layout.minWidth,
            paddingHorizontal: layout.paddingHorizontal,
            paddingVertical: layout.paddingVertical
          },
          style
        ];
      }}
    >
      {({ pressed }) => {
        const resolvedState: ButtonVisualState =
          visualState ?? (disabled ? 'disabled' : pressed ? 'pressed' : 'default');
        const colors = getButtonStyles(t, variant, resolvedState);

        return (
          <>
            {iconPosition === 'leading' ? renderIcon(colors) : null}
            {label ? (
              <Text
                style={[
                  t.typography.labelMStrong,
                  { color: colors.textColor, textAlign: 'center' }
                ]}
              >
                {label}
              </Text>
            ) : null}
            {iconPosition === 'trailing' ? renderIcon(colors) : null}
          </>
        );
      }}
    </Pressable>
  );
}
