import { Image, StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal, Button, Icon, theme, useTheme } from '@greenstand/design-system';

export type CaptureComparison = { uri: string; capturedAt: string };
type Props = {
  visible: boolean;
  previous?: CaptureComparison;
  currentUri?: string;
  onDiscard: () => void;
  onContinue: () => void;
};

/** Prototype duplicate comparison; the camera flow owns the second-capture trigger. */
export function DuplicateCaptureSheet({ visible, previous, currentUri, onDiscard, onContinue }: Props) {
  const t = useTheme();
  const previousTime = previous ? new Date(previous.capturedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
  return <BottomSheetModal visible={visible} onClose={onDiscard} showTitle={false} showCloseButton={false} bottomPadding={theme.space['800']}
    footer={<View style={styles.actions}>
      <Button label="Discard" leadingIcon="close" variant="tertiary" onPress={onDiscard} />
      <Button label="Continue anyway" trailingIcon="arrow-right" variant="secondary" onPress={onContinue} />
    </View>}>
    <View style={styles.content}>
      <View style={styles.message}>
        <Icon name="error" size="xl" color="warning.default" />
        <Text accessibilityRole="header" style={[t.typography.headingM, styles.center, { color: t.color.text.neutral.primary }]}>Duplicated capture</Text>
        <Text style={[t.typography.paragraphM, styles.center, { color: t.color.text.neutral.primary }]}>Looks like you’ve captured the same tree before.</Text>
      </View>
      <View style={styles.comparison}>
        <View style={styles.photoColumn}>
          <View style={styles.photo}>{previous ? <Image source={{ uri: previous.uri }} accessibilityLabel="Previously captured tree" resizeMode="cover" style={styles.image} /> : null}</View>
          <Text style={[t.typography.labelS, styles.center, { color: t.color.text.neutral.secondary }]}>{previousTime}, Today</Text>
        </View>
        <View style={styles.photoColumn}>
          <View style={styles.photo}>{currentUri ? <Image source={{ uri: currentUri }} accessibilityLabel="Current tree capture" resizeMode="cover" style={styles.image} /> : null}</View>
          <Text style={[t.typography.labelS, styles.center, { color: t.color.text.neutral.secondary }]}>Now</Text>
        </View>
      </View>
    </View>
  </BottomSheetModal>;
}

const styles = StyleSheet.create({
  content: { width: '100%', gap: theme.space['600'], paddingBottom: theme.space['400'] },
  message: { alignItems: 'center', gap: theme.space['300'] },
  center: { width: '100%', textAlign: 'center' },
  comparison: { flexDirection: 'row', gap: theme.space['200'] },
  photoColumn: { flex: 1, gap: theme.space['200'] },
  photo: { width: '100%', aspectRatio: 168 / 225, borderRadius: theme.radius.md, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: theme.space['200'] }
});
