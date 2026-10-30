import { Modal, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopNavigation, theme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../components/PrototypeScreenFrame';
import { TreeDetailContent, type TreeDetailContentProps } from './TreeDetailContent';

export function TreeDetailScreen({ visible, onBack, ...props }: TreeDetailContentProps & { visible: boolean; onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return <Modal visible={visible} animationType="slide" onRequestClose={onBack} presentationStyle="fullScreen">
    <PrototypeScreenFrame>
      <TopNavigation leftVariant={{ type: 'back', onPress: onBack }} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, theme.space['800']) }]}>
        <TreeDetailContent {...props} />
      </ScrollView>
    </PrototypeScreenFrame>
  </Modal>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: theme.layout.marginX }
});
