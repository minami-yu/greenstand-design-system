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
  resolveButtonIcons,
  type ButtonSize,
  type ButtonVariant,
  type ButtonVisualState
} from './getButtonStyles';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> &
  PropsWithChildren<{
    label?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Icon before the label — maps to Figma `iconPosition=leading`. */
    leadingIcon?: IconName;
    /** Icon after the label — maps to Figma `iconPosition=trailing`. */
    trailingIcon?: IconName;
    /** Force a Figma interaction state (Storybook / previews). */
    visualState?: ButtonVisualState;
    style?: StyleProp<ViewStyle>;
  }>;

export function Button({
  label = 'Save',
  variant = 'primary',
  size = 'medium',
  leadingIcon,
  trailingIcon,
  visualState,
  disabled,
  style,
  accessibilityRole = 'button',
  ...props
}: ButtonProps) {
  const t = useTheme();
  const icons = resolveButtonIcons(leadingIcon, trailingIcon);
  const layout = getButtonLayout(size, icons.hasIcon);

  const renderIcon = (name: IconName, colors: ReturnType<typeof getButtonStyles>) => (
    <Icon
      colorValue={colors.textColor}
      name={name}
      size={size === 'medium' ? 'md' : 'sm'}
      style={{ height: layout.iconSize, width: layout.iconSize }}
    />
  );

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
            {icons.leading ? renderIcon(icons.leading, colors) : null}
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
            {icons.trailing ? renderIcon(icons.trailing, colors) : null}
          </>
        );
      }}
    </Pressable>
  );
}
