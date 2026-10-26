import { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  type ViewProps
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getMotionEasing } from '../../theme/getMotion';
import { theme } from '../../theme/tokens';
import {
  clampProgress,
  getProgressBarLayout,
  getProgressBarStyles,
  getProgressRatio
} from './getProgressBarStyles';

export type ProgressBarProps = ViewProps & {
  /** Current progress value. Clamped to `0…max`. */
  value?: number;
  /** Maximum progress value. */
  max?: number;
};

type ProgressIndicatorProps = {
  indicatorBackgroundColor: string;
  ratio: number;
};

function ProgressIndicator({
  indicatorBackgroundColor,
  ratio
}: ProgressIndicatorProps) {
  const layout = getProgressBarLayout();
  const progress = useRef(new Animated.Value(ratio)).current;

  useEffect(() => {
    Animated.timing(progress, {
      duration: theme.motion.duration.moderate,
      easing: getMotionEasing(theme.motion.easing.decelerate),
      toValue: ratio,
      useNativeDriver: false
    }).start();
  }, [progress, ratio]);

  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <Animated.View
      style={{
        backgroundColor: indicatorBackgroundColor,
        borderRadius: layout.borderRadius,
        height: layout.height,
        width: animatedWidth
      }}
    />
  );
}

export function ProgressBar({
  accessibilityRole = 'progressbar',
  accessibilityValue,
  max = 100,
  style,
  value = 0,
  ...props
}: ProgressBarProps) {
  const t = useTheme();
  const layout = getProgressBarLayout();
  const colors = getProgressBarStyles(t.color);
  const clampedValue = clampProgress(value, max);
  const ratio = getProgressRatio(clampedValue, max);

  return (
    <View
      {...props}
      accessibilityRole={accessibilityRole}
      accessibilityValue={{
        max,
        min: 0,
        now: clampedValue,
        ...accessibilityValue
      }}
      style={[
        {
          alignSelf: 'stretch',
          backgroundColor: colors.trackBackgroundColor,
          borderRadius: layout.borderRadius,
          height: layout.height,
          overflow: 'hidden',
          width: '100%'
        },
        style
      ]}
    >
      <ProgressIndicator
        indicatorBackgroundColor={colors.indicatorBackgroundColor}
        ratio={ratio}
      />
    </View>
  );
}
