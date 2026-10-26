import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListItem, TopNavigation, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../components/PrototypeScreenFrame';

type UploadScreenProps = {
  onBack: () => void;
  automaticallyUpload: boolean;
  remindToUpload: boolean;
  onAutomaticallyUploadChange: (selected: boolean) => void;
  onRemindToUploadChange: (selected: boolean) => void;
};

/** Figma Settings-Upload (14881:103744), composed from shared ListItems. */
export function UploadScreen({
  onBack, automaticallyUpload, remindToUpload,
  onAutomaticallyUploadChange, onRemindToUploadChange
}: UploadScreenProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return <PrototypeScreenFrame>
    <TopNavigation leftVariant={{ type: 'back', onPress: onBack }} centerVariant={{ type: 'label', label: 'Settings' }} />
    <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + theme.space['400'] }]}>
      <Text accessibilityRole="header" style={[t.typography.headingM, { color: t.color.text.neutral.primary }]}>Upload</Text>
      <ListItem
        label="Automatically upload"
        paragraph="Upload photos automatically when internet is available."
        size="lg"
        trailingElement="switch"
        showDivider={false}
        selected={automaticallyUpload}
        onSelectedChange={onAutomaticallyUploadChange}
      />
      <ListItem
        label="Remind to upload"
        paragraph="Remind me to upload when reconnected."
        size="lg"
        trailingElement="switch"
        showDivider={false}
        selected={remindToUpload}
        onSelectedChange={onRemindToUploadChange}
      />
    </ScrollView>
  </PrototypeScreenFrame>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: theme.layout.marginX, gap: theme.space['400'] }
});
