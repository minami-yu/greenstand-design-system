import { useEffect, useRef, type PropsWithChildren } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '@greenstand/design-system';

/** Mounted only when the camera is ready; unmounting cancels the whole sequence. */
export function FadingCameraGuidance({ children, onComplete, style }: PropsWithChildren<{
  onComplete: () => void;
  style?: StyleProp<ViewStyle>;
}>) {
  const opacity = useRef(new Animated.Value(0)).current;
  const complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  useEffect(() => {
    let active = true;
    let animation: Animated.CompositeAnimation | undefined;
    void AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(reduceMotion => {
      if (!active) return;
      const duration = reduceMotion ? 0 : theme.motion.duration.slow;
      const fade = (toValue: number) => Animated.timing(opacity, {
        toValue, duration,
        easing: Easing.bezier(...theme.motion.easing.decelerate),
        useNativeDriver: Platform.OS !== 'web'
      });
      animation = Animated.sequence([fade(1), Animated.delay(2500), fade(0)]);
      animation.start(({ finished }) => { if (active && finished) complete.current(); });
    });
    return () => { active = false; animation?.stop(); opacity.stopAnimation(); };
  }, [opacity]);
  return <Animated.View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[style, { opacity }]}>
    {children}
  </Animated.View>;
}
