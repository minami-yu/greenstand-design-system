import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getShadow } from '../../theme/getShadow';
import { getSwitchLayout, getSwitchStyles } from './getSwitchStyles';

const SWITCH_ANIMATION_MS = 200;

export type SwitchProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Figma `toggled` property — thumb on the right when true. */
  toggled?: boolean;
  onToggledChange?: (toggled: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function Switch({
  toggled = false,
  onToggledChange,
  disabled,
  style,
  accessibilityRole = 'switch',
  accessibilityState,
  ...props
}: SwitchProps) {
  const t = useTheme();
  const layout = getSwitchLayout();
  const isDisabled = Boolean(disabled);
  const colors = getSwitchStyles(t.color, toggled, isDisabled);
  const enabledOffColors = getSwitchStyles(t.color, false, false);
  const enabledOnColors = getSwitchStyles(t.color, true, false);

  const thumbOffset = useRef(new Animated.Value(toggled ? layout.thumbTravel : 0)).current;
  const trackProgress = useRef(new Animated.Value(toggled ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(thumbOffset, {
        duration: SWITCH_ANIMATION_MS,
        easing: Easing.out(Easing.cubic),
        toValue: toggled ? layout.thumbTravel : 0,
        useNativeDriver: true
      }),
      Animated.timing(trackProgress, {
        duration: SWITCH_ANIMATION_MS,
        easing: Easing.out(Easing.cubic),
        toValue: toggled ? 1 : 0,
        useNativeDriver: false
      })
    ]).start();
  }, [layout.thumbTravel, thumbOffset, toggled, trackProgress]);

  const animatedTrackBackgroundColor = isDisabled
    ? colors.trackBackgroundColor
    : trackProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [
          enabledOffColors.trackBackgroundColor,
          enabledOnColors.trackBackgroundColor
        ]
      });

  return (
    <Pressable
      {...props}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        ...accessibilityState,
        checked: toggled,
        disabled: isDisabled
      }}
      disabled={disabled}
      onPress={() => {
        if (!isDisabled) {
          onToggledChange?.(!toggled);
        }
      }}
      style={({ pressed }) => [
        {
          opacity: pressed && !isDisabled ? 0.92 : 1
        },
        style
      ]}
    >
      <Animated.View
        style={{
          backgroundColor: animatedTrackBackgroundColor,
          borderRadius: layout.borderRadius,
          height: layout.trackHeight,
          justifyContent: 'center',
          paddingHorizontal: layout.paddingHorizontal,
          paddingVertical: layout.paddingVertical,
          width: layout.trackWidth
        }}
      >
        <Animated.View
          style={[
            !isDisabled ? getShadow(t.elevation.sm) : undefined,
            {
              backgroundColor: colors.thumbBackgroundColor,
              borderRadius: layout.borderRadius,
              height: layout.thumbSize,
              transform: [{ translateX: thumbOffset }],
              width: layout.thumbSize
            }
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}
