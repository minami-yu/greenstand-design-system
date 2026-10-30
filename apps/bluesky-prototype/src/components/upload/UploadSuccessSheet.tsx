import { StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal, Button, Icon, theme, useTheme } from '@greenstand/design-system';

export function UploadSuccessSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const t = useTheme();
  return (
    <BottomSheetModal visible={visible} onClose={onClose} showTitle={false} bottomPadding={theme.space['800']}>
      <View style={styles.content}>
        <View style={styles.message}>
          <Icon name="check-circle" size="3xl" color="success.default" />
          <Text accessibilityRole="header" style={[t.typography.headingS, styles.text, { color: t.color.text.neutral.primary }]}>
            Upload completed!
          </Text>
          <Text style={[t.typography.paragraphM, styles.text, { color: t.color.text.neutral.secondary }]}>
            Uploaded photos are going to be reviewed for verification.
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
