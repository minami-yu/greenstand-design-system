import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Button, theme, useTheme } from '@greenstand/design-system';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { successArtwork } from './successArtwork';

export function CaptureComplete({ count, onDone }: { count: number; onDone: () => void }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return <View style={[styles.root, { backgroundColor: t.color.background.neutral.default, paddingBottom: Math.max(insets.bottom, theme.space['800']) }]}>
    <View style={styles.content}>
      <SvgXml xml={successArtwork} accessible={false} />
      <View style={styles.copy}>
        <Text accessibilityRole="header" style={[t.typography.headingM, styles.text, { color: t.color.text.neutral.primary }]}>You captured {count} {count === 1 ? 'tree' : 'trees'}!</Text>
        <Text style={[t.typography.labelM, styles.text, { color: t.color.text.neutral.secondary }]}>Saved safely on your device. Upload later when you're back online.</Text>
      </View>
    </View>
    <Button label="Done" leadingIcon="check" onPress={onDone} />
  </View>;
}
const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: theme.layout.marginX },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.space['600'] },
  copy: { gap: theme.space['300'], width: '100%' },
  text: { textAlign: 'center' }
});
