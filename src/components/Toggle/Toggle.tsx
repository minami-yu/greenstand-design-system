import { Pressable, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getToggleLayout, getToggleStyles } from './getToggleStyles';

export type ToggleProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Figma `toggled` property — thumb on the right when true. */
  toggled?: boolean;
  onToggledChange?: (toggled: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function Toggle({
  toggled = false,
  onToggledChange,
  disabled,
  style,
  accessibilityRole = 'switch',
  accessibilityState,
  ...props
}: ToggleProps) {
  const t = useTheme();
  const layout = getToggleLayout();
  const colors = getToggleStyles(t.color, toggled, Boolean(disabled));

  return (
    <Pressable
      {...props}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        ...accessibilityState,
        checked: toggled,
        disabled: Boolean(disabled)
      }}
      disabled={disabled}
      onPress={() => {
        if (!disabled) {
          onToggledChange?.(!toggled);
        }
      }}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: toggled ? 'flex-end' : 'flex-start',
          backgroundColor: colors.trackBackgroundColor,
          borderRadius: layout.borderRadius,
          opacity: pressed && !disabled ? 0.92 : 1,
          paddingHorizontal: layout.paddingHorizontal,
          paddingVertical: layout.paddingVertical,
          width: layout.trackWidth
        },
        style
      ]}
    >
      <View
        style={{
          backgroundColor: colors.thumbBackgroundColor,
          borderRadius: layout.borderRadius,
          height: layout.thumbSize,
          width: layout.thumbSize
        }}
      />
    </Pressable>
  );
}
