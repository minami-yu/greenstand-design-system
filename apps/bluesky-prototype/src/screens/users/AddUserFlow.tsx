import { useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, Button, ListItem, SearchField, TextField, TopNavigation, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../../components/PrototypeScreenFrame';
import { UserPhotoScreen } from './UserPhotoScreen';
import { userOrganizations, type PrototypeUser } from './userData';

type Step = 'name' | 'organization-question' | 'organizations' | 'photo';
export function AddUserFlow({ onCancel, onComplete }: { onCancel: () => void; onComplete: (user: PrototypeUser) => void }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<Step>('name');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState<'language' | 'voice'>();
  const photoBack = useRef<Step>('organization-question');
  const completed = useRef(false);
  const finish = (image?: ImageSourcePropType) => {
    if (completed.current) return;
    completed.current = true;
    onComplete({ id: `user-${Date.now()}`, name: `${firstName.trim()} ${lastName.trim()}`.trim(), image, organizations, verified: 0, awaiting: 0, pending: 0 });
  };
  const goToPhoto = (from: Step, skipOrganizations = false) => {
    if (skipOrganizations) setOrganizations([]);
    photoBack.current = from;
    setStep('photo');
  };
  const back = () => {
    Keyboard.dismiss();
    if (step === 'name') onCancel();
    else if (step === 'organization-question') setStep('name');
    else if (step === 'organizations') setStep('organization-question');
    else setStep(photoBack.current);
  };
  const nextName = () => { if (firstName.trim() && lastName.trim()) { Keyboard.dismiss(); setStep('organization-question'); } };
  if (step === 'photo') return <UserPhotoScreen onBack={back} onComplete={finish} />;
  const filteredOrganizations = userOrganizations.filter(org => org.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const letters = [...new Set(filteredOrganizations.map(org => org.name[0]))];
  return <PrototypeScreenFrame>
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'web' ? undefined : 'height'}>
      <TopNavigation leftVariant={{ type: 'back', onPress: back }} rightVariant={step === 'name' ? undefined : { type: 'language', onPress: () => setNotice('language') }} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={[t.typography.headingM, styles.center, { color: t.color.text.neutral.primary }]}>
          {step === 'name' ? 'What’s the name?' : step === 'organization-question' ? 'Are you going to use Treetracker as a part of organizations?' : 'Select your organizations'}
        </Text>
        {step === 'name' ? <View style={styles.fields}>
          <TextField label="Name" accessibilityLabel="First name" placeholder="First name" value={firstName} onChangeText={setFirstName} autoComplete="given-name" autoCapitalize="words" returnKeyType="next" />
          <TextField accessibilityLabel="Last name" placeholder="Last name" value={lastName} onChangeText={setLastName} autoComplete="family-name" autoCapitalize="words" returnKeyType="done" onSubmitEditing={nextName} />
        </View> : step === 'organization-question' ? <Text style={[t.typography.paragraphM, styles.center, { color: t.color.text.neutral.secondary }]}>If you are not sure, please select No.</Text> : <View style={styles.organizations}>
          <View style={styles.search}><SearchField variant="default" placeholder="Organization name" accessibilityLabel="Search organizations" value={query} onChangeText={setQuery} onVoicePress={() => setNotice('voice')} /></View>
          {letters.map(letter => <View key={letter}>
            <Text style={[t.typography.labelM, { color: t.color.text.neutral.tertiary }]}>{letter}</Text>
            {filteredOrganizations.filter(org => org.name[0] === letter).map((org, index, group) => <ListItem key={org.name} label={org.name} showDivider={index < group.length - 1} leadingElement="avatar" avatarSource={org.image} avatarSize={org.image ? 'md' : 'sm'} trailingElement="checkInput" selected={organizations.includes(org.name)} onSelectedChange={selected => setOrganizations(previous => selected ? [...previous, org.name] : previous.filter(name => name !== org.name))} />)}
          </View>)}
          {!filteredOrganizations.length ? <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>No organizations match your search.</Text> : null}
        </View>}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, step === 'name' ? theme.space['400'] : theme.space['1200']) }]}>
        {step === 'name' ? <Button label="Continue" trailingIcon="arrow-right" onPress={nextName} disabled={!firstName.trim() || !lastName.trim()} style={styles.flex} /> : step === 'organization-question' ? <>
          <Button label="No" variant="tertiary" leadingIcon="close" style={styles.flex} onPress={() => goToPhoto('organization-question', true)} />
          <Button label="Yes" leadingIcon="check" style={styles.flex} onPress={() => setStep('organizations')} />
        </> : <>
          <Button label="Skip" variant="tertiary" trailingIcon="arrow-right" style={styles.flex} onPress={() => goToPhoto('organizations', true)} />
          <Button label="Next" trailingIcon="arrow-right" style={styles.flex} disabled={!organizations.length} onPress={() => goToPhoto('organizations')} />
        </>}
      </View>
    </KeyboardAvoidingView>
    <BottomSheetModal visible={Boolean(notice)} title={notice === 'language' ? 'Language' : 'Voice search'} onClose={() => setNotice(undefined)}>
      <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.primary }]}>{notice === 'language' ? 'This prototype is currently available in English.' : 'Voice search is not connected in this prototype. Enter an organization name in Search.'}</Text>
    </BottomSheetModal>
  </PrototypeScreenFrame>;
}
const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: theme.layout.marginX, gap: theme.space['400'], paddingBottom: theme.space['400'] },
  center: { textAlign: 'center' },
  fields: { gap: theme.space['400'], marginTop: theme.space['400'] },
  organizations: { gap: theme.space['400'], marginTop: theme.space['400'] },
  search: { height: theme.size['1200'] },
  footer: { flexDirection: 'row', gap: theme.space['200'], paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'] }
});
