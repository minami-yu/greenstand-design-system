import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Modal, PanResponder, Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import { theme } from '../../theme/tokens';
import { BottomSheet, type BottomSheetProps } from './BottomSheet';

export type BottomSheetModalProps = Omit<BottomSheetProps, 'modal' | 'onClose'> & {
  visible: boolean;
  onClose: () => void;
};

/** Keep mounted and change visible so the native dismiss transition can finish. */
export function BottomSheetModal({ visible, onClose, ...props }: BottomSheetModalProps) {
  const t = useTheme();
  const insets = useContext(SafeAreaInsetsContext);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [presented, setPresented] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;
  const dragOffset = useRef(new Animated.Value(0)).current;
  const sheetHeight = useRef(0);
  const { height } = useWindowDimensions();
  const availableHeight = Math.max(0, height - (insets?.top ?? 0));
  const headerPan = useMemo(() => {
    const restore = () => {
      if (reduceMotion) dragOffset.setValue(0);
      else Animated.spring(dragOffset, { toValue: 0, useNativeDriver: Platform.OS !== 'web' }).start();
    };
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => visible && gesture.dy > theme.space['200'] && gesture.dy > Math.abs(gesture.dx),
      onPanResponderGrant: () => dragOffset.stopAnimation(),
      onPanResponderMove: (_, gesture) => dragOffset.setValue(Math.max(0, gesture.dy)),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > sheetHeight.current * 0.25 || (gesture.dy > theme.space['200'] && gesture.vy > 0.7)) onClose();
        else restore();
      },
      onPanResponderTerminate: restore
    });
  }, [dragOffset, onClose, reduceMotion, visible]);
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then(value => { if (active) setReduceMotion(value); });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => { active = false; subscription.remove(); };
  }, []);

  useEffect(() => {
    if (visible) { dragOffset.setValue(0); setPresented(true); }
    const animation = Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      ...(reduceMotion ? { duration: 0 } : {}),
      useNativeDriver: Platform.OS !== 'web'
    });
    animation.start(({ finished }) => { if (finished && !visible) setPresented(false); });
    return () => animation.stop();
  }, [visible, reduceMotion, progress, dragOffset]);

  return (
    <Modal transparent visible={presented} animationType="none"
      statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={[styles.container, { paddingTop: insets?.top ?? 0 }]}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: Animated.multiply(progress, dragOffset.interpolate({ inputRange: [0, availableHeight || 1], outputRange: [1, 0], extrapolate: 'clamp' })) }]}>
          <Pressable accessibilityRole="button" accessibilityLabel="Dismiss bottom sheet" onPress={onClose}
            style={[StyleSheet.absoluteFill, { backgroundColor: t.color.background.neutral.overlay }]} />
        </Animated.View>
        <Animated.View onLayout={event => { sheetHeight.current = event.nativeEvent.layout.height; }}
          style={{ maxHeight: availableHeight * 0.9, transform: [{ translateY: Animated.add(dragOffset, progress.interpolate({ inputRange: [0, 1], outputRange: [height, 0] })) }] }}>
          <BottomSheet {...props} headerGestureHandlers={headerPan.panHandlers} style={[props.style, { maxHeight: availableHeight * 0.9 }]} onClose={onClose} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' }
});
