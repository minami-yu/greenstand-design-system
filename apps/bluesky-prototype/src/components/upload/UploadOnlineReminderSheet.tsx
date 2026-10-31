import { StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal, Button, Icon, theme, useTheme } from '@greenstand/design-system';
import { QUEUED_IMAGES } from './uploadQueuePhotos';
import { UploadPreviewTile } from './UploadPreviewTile';

type Props = { visible: boolean; progress: number; onUpload: () => void; onClose: () => void };

/** Reconnection prompt for the same pending photos displayed on Home. */
export function UploadOnlineReminderSheet({ visible, progress, onUpload, onClose }: Props) {
  const t = useTheme();
  const uploadedCount = Math.floor(Math.max(0, Math.min(1, progress)) * QUEUED_IMAGES.length);
  const remaining = QUEUED_IMAGES.slice(uploadedCount);
  return <BottomSheetModal visible={visible} onClose={onClose} showTitle={false} showCloseButton={false} bottomPadding={theme.space['800']}>
    <View style={styles.content}>
      <View style={styles.message}>
        <Icon name="online" size="2xl" color="neutral.disabled" />
        <View style={styles.copy}>
          <Text accessibilityRole="header" style={[t.typography.headingS, styles.heading, { color: t.color.text.neutral.primary }]}>Do you want to upload photos?</Text>
          <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>You are back online. Upload to get your tree photos verified and get paid.</Text>
          <View style={styles.queue}>
            <Text style={[t.typography.labelM, { color: t.color.text.neutral.primary }]}>{remaining.length} {remaining.length === 1 ? 'photo' : 'photos'} • {(20.1 * remaining.length / QUEUED_IMAGES.length).toFixed(1)} MB</Text>
            <View style={styles.photos}>
              {remaining.slice(0, 5).map((source, index) => <UploadPreviewTile key={uploadedCount + index} image={source} overflowCount={index === 4 && remaining.length > 5 ? remaining.length - 5 : undefined} />)}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <Button label="Upload" leadingIcon="check" onPress={onUpload} />
        <Button label="Not now" leadingIcon="close" variant="secondary" onPress={onClose} />
      </View>
    </View>
  </BottomSheetModal>;
}

const styles = StyleSheet.create({
  content: { width: '100%', gap: theme.space['1200'] },
  message: { alignItems: 'center', gap: theme.space['600'] },
  copy: { width: '100%', gap: theme.space['400'] },
  heading: { width: '100%', textAlign: 'center' },
  queue: { gap: theme.space['300'] },
  photos: { width: '100%', flexDirection: 'row', gap: theme.space['200'], justifyContent: 'space-between' },
  actions: { gap: theme.space['300'] }
});
