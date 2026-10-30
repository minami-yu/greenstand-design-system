import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Banner, BottomSheet, BottomSheetModal, Button, ListItem, Select, TextField, theme, useTheme } from '@greenstand/design-system';
import type { CaptureOrganization } from './CaptureFlowScreens';

type Props = {
  organizations: CaptureOrganization[];
  initialOrganization?: CaptureOrganization;
  busy: boolean;
  error?: string;
  onDiscard: () => void;
  onSave: (note: string, organization?: CaptureOrganization) => void;
};
export function CaptureReview({ organizations, initialOrganization, busy, error, onDiscard, onSave }: Props) {
  const t = useTheme();
  const [organization, setOrganization] = useState(initialOrganization);
  const [note, setNote] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  return <>
    <BottomSheet showTitle={false} showCloseButton={false} bottomPadding={theme.space['800']} style={styles.sheet}>
      <View style={styles.form}>
        <Select label="Organization" value={organization?.name} placeholder="No organization" avatarSource={organization?.image} expanded={pickerOpen} disabled={busy} onPress={() => setPickerOpen(true)} />
        <View style={styles.note}>
          <TextField label="Note" placeholder="Add note" value={note} onChangeText={setNote} editable={!busy} />
          <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>Optional</Text>
        </View>
        {error && <Banner tone="error" message={error} showTrailingIcon={false} />}
      </View>
      <View style={styles.actions}>
        <Button label="Discard" leadingIcon="close" variant="secondary" disabled={busy} onPress={onDiscard} style={styles.button} />
        <Button label={busy ? 'Saving…' : 'Save'} leadingIcon="check" disabled={busy} onPress={() => onSave(note, organization)} style={styles.button} />
      </View>
    </BottomSheet>
    <BottomSheetModal visible={pickerOpen} onClose={() => setPickerOpen(false)} title="Organization">
      {[undefined, ...organizations].map(option => <ListItem key={option?.id ?? 'none'} label={option?.name ?? 'No organization'} leadingElement={option ? 'avatar' : 'none'} avatarSource={option?.image} trailingElement="radioButton" selected={organization?.id === option?.id} onSelectedChange={() => { setOrganization(option); setPickerOpen(false); }} />)}
    </BottomSheetModal>
  </>;
}
const styles = StyleSheet.create({
  sheet: { flexShrink: 0 },
  form: { gap: theme.space['400'] },
  note: { gap: theme.space['200'] },
  actions: { flexDirection: 'row', gap: theme.space['200'], marginTop: theme.space['1200'] },
  button: { flex: 1 }
});
