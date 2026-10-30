import { useEffect, useRef, useState } from 'react';
import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, Button, Chip, ListItem, SearchField, TextField, TopNavigation, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../../components/PrototypeScreenFrame';
import { UserPhotoScreen } from './UserPhotoScreen';
import { userOrganizations, type PrototypeUser } from './userData';

type Step = 'name' | 'organizations' | 'photo';
export function AddUserFlow({ onCancel, onComplete, mode = 'add-user' }: { onCancel: () => void; onComplete: (user: PrototypeUser) => void; mode?: 'add-user' | 'signup' }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<Step>('name');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState<'language' | 'voice' | 'terms' | 'privacy'>();
  const completed = useRef(false);
  const finish = (image?: ImageSourcePropType) => {
    if (completed.current) return;
    completed.current = true;
    onComplete({ id: `user-${Date.now()}`, name: `${firstName.trim()} ${lastName.trim()}`.trim(), image, organizations, verified: 0, awaiting: 0, pending: 0 });
  };
  const goToPhoto = (skipOrganizations = false) => {
    if (skipOrganizations) setOrganizations([]);
    setStep('photo');
  };
  const back = () => {
    Keyboard.dismiss();
    if (step === 'name') onCancel();
    else if (step === 'organizations') setStep('name');
    else setStep('organizations');
  };
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => { back(); return true; });
    return () => subscription.remove();
  });
  const nextName = () => { if (firstName.trim() && lastName.trim()) { Keyboard.dismiss(); setStep('organizations'); } };
  if (step === 'photo') return <UserPhotoScreen onBack={back} onComplete={finish} />;
  const filteredOrganizations = userOrganizations.filter(org => org.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const letters = [...new Set(filteredOrganizations.map(org => org.name[0]))];
  return <PrototypeScreenFrame>
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'web' ? undefined : 'height'}>
      <TopNavigation leftVariant={{ type: 'back', onPress: back }} rightVariant={step === 'name' ? (mode === 'signup' ? { type: 'menu', onPress: () => setNotice('language') } : undefined) : { type: 'language', onPress: () => setNotice('language') }} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={[t.typography.headingM, styles.title, { color: t.color.text.neutral.primary }]}>
          {step === 'name' ? (mode === 'signup' ? 'Create your account' : 'What’s the name?') : 'Select organizations'}
        </Text>
        {step === 'name' ? <View style={styles.fields}>
          <TextField label="Name" accessibilityLabel="First name" placeholder="First name" value={firstName} onChangeText={setFirstName} autoComplete="given-name" autoCapitalize="words" returnKeyType="next" />
          <TextField accessibilityLabel="Last name" placeholder="Last name" value={lastName} onChangeText={setLastName} autoComplete="family-name" autoCapitalize="words" returnKeyType="done" onSubmitEditing={nextName} />
        </View> : <View style={styles.organizations}>
          <View style={styles.search}><SearchField variant="default" placeholder="Organization name" accessibilityLabel="Search organizations" value={query} onChangeText={setQuery} onVoicePress={() => setNotice('voice')} /></View>
          {organizations.length ? <View style={styles.selectedOrganizations}>
            {organizations.map(name => <Chip key={name} label={name} size="md" leadingElements="avatar" trailingElements="close"
              source={userOrganizations.find(org => org.name === name)?.image}
              onPress={() => setOrganizations(previous => previous.filter(selected => selected !== name))} />)}
          </View> : null}
          {letters.map(letter => <View key={letter}>
            <Text style={[t.typography.labelM, { color: t.color.text.neutral.tertiary }]}>{letter}</Text>
            {filteredOrganizations.filter(org => org.name[0] === letter).map((org, index, group) => <ListItem key={org.name} label={org.name}
              // showDivider={index < group.length - 1}
              showDivider={false}
              leadingElement="avatar" avatarSource={org.image} trailingElement="checkInput" selected={organizations.includes(org.name)} onSelectedChange={selected => setOrganizations(previous => selected ? [...previous, org.name] : previous.filter(name => name !== org.name))} />)}
          </View>)}
          {!filteredOrganizations.length ? <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>No organizations match your search.</Text> : null}
        </View>}
      </ScrollView>
      {mode === 'signup' && step === 'name' ? <Text style={[t.typography.paragraphS, { textAlign: 'center', paddingHorizontal: theme.layout.marginX, color: t.color.text.neutral.tertiary }]}>By continuing, you agree to our <Text accessibilityRole="link" onPress={() => setNotice('terms')} style={{ textDecorationLine: 'underline', color: t.color.text.neutral.secondary }}>Terms</Text> and acknowledge our <Text accessibilityRole="link" onPress={() => setNotice('privacy')} style={{ textDecorationLine: 'underline', color: t.color.text.neutral.secondary }}>Privacy policy</Text></Text> : null}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, step === 'name' && mode !== 'signup' ? theme.space['400'] : theme.space['1200']) }]}>
        {step === 'name' ? <Button label={mode === 'signup' ? "Agree and continue" : "Continue"} trailingIcon="arrow-right" onPress={nextName} disabled={!firstName.trim() || !lastName.trim()} style={styles.flex} /> : <>
          <Button label="Skip" variant="secondary" trailingIcon="arrow-right" style={styles.flex} onPress={() => goToPhoto(true)} />
          <Button label="Next" trailingIcon="arrow-right" style={styles.flex} disabled={!organizations.length} onPress={() => goToPhoto()} />
        </>}
      </View>
    </KeyboardAvoidingView>
    <BottomSheetModal visible={Boolean(notice)} title={notice === 'terms' ? 'Terms' : notice === 'privacy' ? 'Privacy policy' : notice === 'language' ? 'Language' : 'Voice search'} onClose={() => setNotice(undefined)}>
      <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.primary }]}>{notice === 'terms' || notice === 'privacy' ? 'This is a working prototype. No real account is created and no verification message is sent. Information entered here is used only for this demo session.' : notice === 'language' ? 'This prototype is currently available in English.' : 'Voice search is not connected in this prototype. Enter an organization name in Search.'}</Text>
    </BottomSheetModal>
  </PrototypeScreenFrame>;
}
const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: theme.layout.marginX, gap: theme.space['400'], paddingBottom: theme.space['400'] },
  title: { textAlign: 'left', width: '100%' },
  center: { textAlign: 'center' },
  fields: { gap: theme.space['400'], marginTop: theme.space['400'] },
  organizations: { gap: theme.space['400'], marginTop: theme.space['400'] },
  search: { height: theme.size['1200'] },
  selectedOrganizations: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space['200'] },
  footer: { flexDirection: 'row', gap: theme.space['200'], paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'] }
});
