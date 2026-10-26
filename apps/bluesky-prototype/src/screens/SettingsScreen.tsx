import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider, ListItem, TopNavigation, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../components/PrototypeScreenFrame';

type SettingsScreenProps = {
  bottomInset: number;
  onAccount: () => void;
  onUpload: () => void;
  onLogout: () => void;
};

/** Figma Settings-Top (14881:103941). Product navigation composed from shared components. */
export function SettingsScreen({ bottomInset, onAccount, onUpload, onLogout }: SettingsScreenProps) {
  return <PrototypeScreenFrame>
    <TopNavigation leftVariant={{ type: 'label', label: 'Settings' }} />
    <ScrollView contentContainerStyle={[styles.menu, { paddingBottom: bottomInset }]}>
      <View>
        <ListItem label="Account" size="md" leadingElement="icon" leadingIcon="account-outline" trailingElement="icon" showDivider={false} onPress={onAccount} />
        <ListItem label="Upload" size="md" leadingElement="icon" leadingIcon="cloud-upload-outline" trailingElement="icon" showDivider={false} onPress={onUpload} />
      </View>
      <Divider />
      <ListItem label="Log out" size="md" tone="destructive" leadingElement="icon" leadingIcon="logout" showDivider={false} onPress={onLogout} />
    </ScrollView>
  </PrototypeScreenFrame>;
}

export function AccountScreen({ onBack }: { onBack: () => void }) {
  const t = useTheme();
  return <PrototypeScreenFrame>
    <TopNavigation leftVariant={{ type: 'back', onPress: onBack }} centerVariant={{ type: 'label', label: 'Account' }} />
    <View style={styles.placeholder}>
      <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>
        Account details are not available in this prototype yet.
      </Text>
    </View>
  </PrototypeScreenFrame>;
}

const styles = StyleSheet.create({
  menu: { paddingHorizontal: theme.layout.marginX, gap: theme.space['300'] },
  placeholder: { padding: theme.space['400'] }
});
