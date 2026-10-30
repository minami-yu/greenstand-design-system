import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, Platform, StyleSheet, Text, type ViewProps } from 'react-native';
import { getMotionEasing } from '../../theme/getMotion';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { getShadow } from '../../theme/getShadow';

export type SnackbarProps = ViewProps & { message: string; icon?: IconName };
/** Transient feedback. The caller owns visibility, duration, and placement. */
export function Snackbar({ message, icon = 'check-circle', style, ...props }: SnackbarProps) {
  const t = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let active = true;
    const show = (reduceMotion: boolean) => {
      if (!active) return;
      opacity.stopAnimation();
      if (reduceMotion) {
        opacity.setValue(1);
      } else {
        Animated.timing(opacity, {
          toValue: 1,
          duration: theme.motion.duration.moderate,
          easing: getMotionEasing(theme.motion.easing.decelerate),
          useNativeDriver: Platform.OS !== 'web'
        }).start();
      }
    };
    AccessibilityInfo.isReduceMotionEnabled().then(show, () => show(true));
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', show);
    return () => {
      active = false;
      subscription.remove();
      opacity.stopAnimation();
    };
  }, [opacity]);

  return <Animated.View accessibilityRole="alert" accessibilityLiveRegion="polite" {...props} style={[styles.root, getShadow(t.elevation.lg), { backgroundColor: t.color.fill.neutral.inverse }, style, { opacity }]}>
    <Icon name={icon} size="md" color="neutral.inverse" />
    <Text style={[t.typography.paragraphM, styles.message, { color: t.color.text.neutral.inverse }]}>{message}</Text>
  </Animated.View>;
}
const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', gap: theme.space['300'], padding: theme.space['400'], borderRadius: theme.radius.md },
  message: { flex: 1 }
});
