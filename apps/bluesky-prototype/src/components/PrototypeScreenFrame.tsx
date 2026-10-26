import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme, useTheme } from '@greenstand/design-system';

// Existing prototype phone chrome, shared by Home and the user menu.
export function PrototypeScreenFrame({ children }: PropsWithChildren) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const web = Platform.OS === 'web';
  return <View style={[styles.safeArea, { backgroundColor: t.color.background.neutral.default }]}>
    <View style={[styles.phoneSurface, web && styles.webPhoneSurface, { paddingTop: web ? theme.space['0'] : insets.top }]}>
      {web && <AndroidStatusHeader />}
      {children}
    </View>
  </View>;
}

function AndroidStatusHeader() {
  const t = useTheme();

  return (
    <View style={[styles.androidStatusHeader, { backgroundColor: t.color.background.neutral.default }]}>
      <Text style={[styles.androidTime, { color: t.color.icon.neutral.primary }]}>
        9:30
      </Text>
      <View style={[styles.androidCamera, { backgroundColor: t.color.icon.neutral.primary }]} />
      <View style={styles.androidStatusIcons}>
        <View style={styles.signalBars}>
          <View style={[styles.signalBar, styles.signalBarSmall, { backgroundColor: t.color.icon.neutral.primary }]} />
          <View style={[styles.signalBar, styles.signalBarMedium, { backgroundColor: t.color.icon.neutral.primary }]} />
          <View style={[styles.signalBar, styles.signalBarLarge, { backgroundColor: t.color.icon.neutral.primary }]} />
        </View>
        <View style={[styles.wifiShape, { backgroundColor: t.color.icon.neutral.primary }]} />
        <View style={[styles.batteryShape, { borderColor: t.color.icon.neutral.primary }]}>
          <View style={[styles.batteryFill, { backgroundColor: t.color.icon.neutral.primary }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    flex: 1
  },
  phoneSurface: {
    flex: 1,
    overflow: 'hidden',
    width: '100%'
  },
  webPhoneSurface: {
    maxWidth: 360
  },
  androidStatusHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: theme.size['1000'],
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.marginX,
    position: 'relative',
    width: '100%'
  },
  androidTime: {
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 20
  },
  androidCamera: {
    borderRadius: theme.radius.full,
    height: theme.icon.lg,
    left: '50%',
    marginLeft: theme.space.n300,
    position: 'absolute',
    top: theme.space['200'],
    width: theme.icon.lg
  },
  androidStatusIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['100']
  },
  signalBars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.space['050'],
    height: theme.space['200']
  },
  signalBar: {
    borderRadius: theme.radius.full,
    width: theme.space['050']
  },
  signalBarSmall: {
    height: theme.space['100']
  },
  signalBarMedium: {
    height: theme.space['150']
  },
  signalBarLarge: {
    height: theme.space['200']
  },
  wifiShape: {
    borderRadius: theme.radius.full,
    height: theme.space['100'],
    width: theme.space['100']
  },
  batteryShape: {
    borderRadius: theme.radius.sm,
    borderWidth: theme.border.sm,
    height: theme.space['200'],
    padding: theme.space['050'],
    width: theme.space['400']
  },
  batteryFill: {
    borderRadius: theme.radius.sm,
    flex: 1,
    width: '70%'
  }
});
