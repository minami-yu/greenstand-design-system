import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  View,
  type ViewProps,
  type ViewStyle
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import {
  clampProgress,
  getProgressBarLayout,
  getProgressBarStyles,
  getProgressRatio
} from './getProgressBarStyles';

const PROGRESS_BAR_ANIMATION_MS = 200;
const PROGRESS_BAR_TRANSITION_EASING = 'cubic-bezier(0, 0, 0.2, 1)';

type WebTransitionStyle = ViewStyle & {
  transitionDuration?: string;
  transitionProperty?: string;
  transitionTimingFunction?: string;
};

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

function ProgressIndicatorWeb({
  indicatorBackgroundColor,
  ratio
}: ProgressIndicatorProps) {
  const layout = getProgressBarLayout();

  const indicatorStyle: WebTransitionStyle = {
    backgroundColor: indicatorBackgroundColor,
    borderRadius: layout.borderRadius,
    height: layout.height,
    transitionDuration: `${PROGRESS_BAR_ANIMATION_MS}ms`,
    transitionProperty: 'width',
    transitionTimingFunction: PROGRESS_BAR_TRANSITION_EASING,
    width: `${ratio * 100}%`
  };

  return <View style={indicatorStyle} />;
}

function ProgressIndicatorNative({
  indicatorBackgroundColor,
  ratio
}: ProgressIndicatorProps) {
  const layout = getProgressBarLayout();
  const progress = useRef(new Animated.Value(ratio)).current;

  useEffect(() => {
    Animated.timing(progress, {
      duration: PROGRESS_BAR_ANIMATION_MS,
      easing: Easing.out(Easing.cubic),
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

function ProgressIndicator(props: ProgressIndicatorProps) {
  if (Platform.OS === 'web') {
    return <ProgressIndicatorWeb {...props} />;
  }

  return <ProgressIndicatorNative {...props} />;
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
