import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BottomSheetModal, Button, theme, useTheme } from '@greenstand/design-system';
import { uploadOfflineSvg, uploadStoppedSvg } from './uploadArtwork';

export type UploadInterruption = 'stopped' | 'offline';

export function UploadInterruptionSheet({ reason, onClose }: {
  reason: UploadInterruption | null;
  onClose: () => void;
}) {
  const t = useTheme();
  // Preserve the last message while the modal animates out.
  const [displayReason, setDisplayReason] = useState(reason);
  if (reason !== null && reason !== displayReason) setDisplayReason(reason);
  const offline = displayReason === 'offline';
  return (
    <BottomSheetModal visible={reason !== null} onClose={onClose} showTitle={false}
      bottomPadding={theme.space['800']}>
      <View style={styles.content}>
        <View style={styles.message}>
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <SvgXml xml={offline ? uploadOfflineSvg : uploadStoppedSvg} />
          </View>
          <Text accessibilityRole="header" style={[t.typography.headingS, styles.text, { color: t.color.text.neutral.primary }]}>
            {offline ? 'Lost connection' : 'Upload stopped'}
          </Text>
          <Text style={[t.typography.paragraphM, styles.text, { color: t.color.text.neutral.secondary }]}>
            {offline ? 'Try uploading again when you’re back online.' : 'Uploaded photos are saved. You can upload the remaining photos later.'}
          </Text>
        </View>
        <Button label="Got it" leadingIcon="check" variant="primary" onPress={onClose} />
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  content: { gap: theme.space['1200'], width: '100%' },
  message: { gap: theme.space['400'], alignItems: 'center' },
  text: { textAlign: 'center', width: '100%' }
});
