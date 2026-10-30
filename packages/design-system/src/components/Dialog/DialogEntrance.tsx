import { createContext, useContext, useEffect, useRef, type PropsWithChildren } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '../../theme/tokens';

const EntranceContext = createContext(false);

/** A composed pointer and card share one entrance animation. */
export function DialogEntrance({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const nested = useContext(EntranceContext);
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (nested) return;
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().catch(() => false).then(reduceMotion => {
      if (!active) return;
      Animated.timing(opacity, {
        toValue: 1,
        duration: reduceMotion ? 0 : theme.motion.duration.slow,
        easing: Easing.bezier(...theme.motion.easing.decelerate),
        useNativeDriver: Platform.OS !== 'web'
      }).start();
    });
    return () => { active = false; opacity.stopAnimation(); };
  }, [nested, opacity]);
  if (nested) return <View style={style}>{children}</View>;
  return <EntranceContext.Provider value={true}>
    <Animated.View style={[style, { opacity }]}>{children}</Animated.View>
  </EntranceContext.Provider>;
}
