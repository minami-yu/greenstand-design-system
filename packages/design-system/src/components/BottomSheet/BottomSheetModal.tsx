import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Modal, PanResponder, Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import GorhomBottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import { getMotionEasing } from '../../theme/getMotion';
import { theme } from '../../theme/tokens';
import { BottomSheet, BottomSheetScrollContext, type BottomSheetProps } from './BottomSheet';
import { getBottomSheetSnapHeights } from './bottomSheetSnapPoints';

export type BottomSheetModalProps = Omit<BottomSheetProps, 'modal' | 'onClose'> & {
  visible: boolean;
  onClose: () => void;
  /** Show the dimmed background. Outside-tap dismissal remains available when false. */
  showBackdrop?: boolean;
  /** Optional sheet heights as fractions of the available screen, sorted from smallest to largest. */
  snapPoints?: readonly number[];
  /** Index of the opening height in the sorted snap points. Defaults to zero. */
  initialSnapIndex?: number;
};

/** Keep mounted and change visible so the native dismiss transition can finish. */
export function BottomSheetModal({ visible, onClose, showBackdrop = true, snapPoints, initialSnapIndex = 0, ...props }: BottomSheetModalProps) {
  const t = useTheme();
  const insets = useContext(SafeAreaInsetsContext);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [presented, setPresented] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;
  const dragOffset = useRef(new Animated.Value(0)).current;
  const sheetHeight = useRef(0);
  const { height } = useWindowDimensions();
  const availableHeight = Math.max(0, height - (insets?.top ?? 0));
  const snapHeights = useMemo(() => getBottomSheetSnapHeights(snapPoints, availableHeight), [snapPoints, availableHeight]);
  const resizable = snapHeights.length > 0;
  const maximumHeight = resizable ? snapHeights[snapHeights.length - 1] : availableHeight * 0.9;
  const headerPan = useMemo(() => {
    const restore = () => {
      if (reduceMotion) dragOffset.setValue(0);
      else Animated.spring(dragOffset, { toValue: 0, useNativeDriver: Platform.OS !== 'web' }).start();
    };
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => visible && gesture.dy > theme.space['200'] && Math.abs(gesture.dy) > Math.abs(gesture.dx),
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
    if (visible && !presented) {
      setPresented(true);
      return;
    }

    if (!presented) return;
    if (visible) dragOffset.setValue(0);

    progress.stopAnimation();
    const animation = Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: reduceMotion ? 0 : theme.motion.duration.slow,
      easing: getMotionEasing(theme.motion.easing.decelerate),
      useNativeDriver: Platform.OS !== 'web'
    });
    animation.start(({ finished }) => { if (finished && !visible) setPresented(false); });
    return () => animation.stop();
  }, [visible, presented, reduceMotion, progress, dragOffset]);

  return (
    <Modal transparent visible={presented} animationType="none"
      statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <GestureHandlerRootView style={styles.gestureRoot}>
      <View style={[styles.container, { paddingTop: insets?.top ?? 0 }]}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: Animated.multiply(progress, dragOffset.interpolate({ inputRange: [0, availableHeight || 1], outputRange: [1, 0], extrapolate: 'clamp' })) }]}>
          <Pressable accessibilityRole="button" accessibilityLabel="Dismiss bottom sheet" onPress={onClose}
            style={[StyleSheet.absoluteFill, showBackdrop ? { backgroundColor: t.color.background.neutral.overlay } : undefined]} />
        </Animated.View>
        {resizable ? (
          <Animated.View pointerEvents="box-none" style={[StyleSheet.absoluteFill, {
            transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }]
          }]}>
            <GorhomBottomSheet
              index={Math.max(0, Math.min(initialSnapIndex, snapHeights.length - 1))}
              snapPoints={snapHeights}
              topInset={insets?.top ?? 0}
              animateOnMount={false}
              enableDynamicSizing={false}
              enablePanDownToClose
              handleComponent={null}
              backgroundComponent={null}
              animationConfigs={{ duration: reduceMotion ? 0 : theme.motion.duration.moderate }}
              onClose={onClose}
            >
              <BottomSheetScrollContext.Provider value={BottomSheetScrollView}>
                <BottomSheet {...props} style={[props.style, styles.expandableSheet]} onClose={onClose} />
              </BottomSheetScrollContext.Provider>
            </GorhomBottomSheet>
          </Animated.View>
        ) : (
          <Animated.View onLayout={event => { sheetHeight.current = event.nativeEvent.layout.height; }}
            style={{ maxHeight: maximumHeight, transform: [{ translateY: Animated.add(dragOffset, progress.interpolate({ inputRange: [0, 1], outputRange: [height, 0] })) }] }}>
            <BottomSheet {...props} headerGestureHandlers={headerPan.panHandlers}
              style={[props.style, { maxHeight: maximumHeight }]} onClose={onClose} />
          </Animated.View>
        )}
      </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  gestureRoot: { flex: 1 },
  expandableSheet: { flex: 1 },
  container: { flex: 1, justifyContent: 'flex-end' }
});
