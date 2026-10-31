import { useEffect, useRef, type ComponentRef, type PropsWithChildren } from 'react';
import { Animated, Platform, StyleSheet, View, type GestureResponderEvent } from 'react-native';
import { theme, useTheme } from '@greenstand/design-system';

/** Development overlay: observes touches without claiming the responder. */
export function TouchIndicator({ children }: PropsWithChildren) {
  const t = useTheme();
  const container = useRef<ComponentRef<typeof View>>(null);
  const origin = useRef({ x: 0, y: 0 });
  const position = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => () => opacity.stopAnimation(), [opacity]);

  function showTouch(event: GestureResponderEvent) {
    const { pageX, pageY } = event.nativeEvent;
    opacity.stopAnimation();
    position.setValue({
      x: pageX - origin.current.x - theme.icon.lg / 2,
      y: pageY - origin.current.y - theme.icon.lg / 2
    });
    opacity.setValue(1);
  }

  function hideTouch() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: theme.motion.duration.slow,
      useNativeDriver: Platform.OS !== 'web'
    }).start();
  }

  return (
    <View
      ref={container}
      collapsable={false}
      style={styles.container}
      onLayout={() => container.current?.measureInWindow((x, y) => {
        origin.current = { x, y };
      })}
      onTouchStart={showTouch}
      onTouchMove={showTouch}
      onTouchEnd={hideTouch}
      onTouchCancel={hideTouch}
    >
      {children}
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={StyleSheet.absoluteFill}
      >
        <Animated.View
          style={[
            styles.dot,
            {
              backgroundColor: t.color.fill.currentLocation.subtle,
              borderColor: t.color.fill.currentLocation.default,
              opacity,
              transform: position.getTranslateTransform()
            }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  dot: {
    position: 'absolute',
    width: theme.icon.lg,
    height: theme.icon.lg,
    borderRadius: theme.radius.full,
    borderWidth: theme.border.md
  }
});
