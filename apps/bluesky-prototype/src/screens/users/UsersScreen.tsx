import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomSheetModal, IconButton, ListItem, SearchField, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../../components/PrototypeScreenFrame';
import type { PrototypeUser } from './userData';

export function UsersScreen({ users, bottomInset, onAdd, onSelect }: { users: PrototypeUser[]; bottomInset: number; onAdd: () => void; onSelect: (user: PrototypeUser) => void }) {
  const t = useTheme();
  const [query, setQuery] = useState('');
  const [voiceNotice, setVoiceNotice] = useState(false);
  const filtered = users.filter(user => user.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <PrototypeScreenFrame>
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text accessibilityRole="header" style={[t.typography.headingM, { color: t.color.text.neutral.primary }]}>Users</Text>
        <IconButton icon="add" variant="primary" accessibilityLabel="Add user" onPress={onAdd} />
      </View>
      <View style={styles.search}><SearchField variant="default" value={query} onChangeText={setQuery} onVoicePress={() => setVoiceNotice(true)} accessibilityLabel="Search users" /></View>
    </View>
    <ScrollView contentContainerStyle={[styles.list, { paddingBottom: bottomInset }]}>
      <Text accessibilityLiveRegion="polite" style={[t.typography.labelM, { color: t.color.text.neutral.secondary }]}>{filtered.length} {filtered.length === 1 ? 'user' : 'users'}</Text>
      <View>{filtered.map(user => <ListItem key={user.id} label={user.name} paragraph={user.deviceOwner ? 'Device owner' : undefined} leadingElement="avatar" avatarSource={user.image} trailingElement="icon" showDivider={false} onPress={() => onSelect(user)} />)}</View>
      {!filtered.length ? <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>No users match your search.</Text> : null}
    </ScrollView>
    <BottomSheetModal visible={voiceNotice} title="Voice search" onClose={() => setVoiceNotice(false)}><Text style={[t.typography.paragraphM, { color: t.color.text.neutral.primary }]}>Voice search is not connected in this prototype. Enter a name in Search.</Text></BottomSheetModal>
  </PrototypeScreenFrame>;
}
const styles = StyleSheet.create({
  header: { paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['300'], gap: theme.space['400'] },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  search: { height: theme.size['1200'] },
  list: { paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'], gap: theme.space['200'] }
});
