import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { BackHandler, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, Button, Divider, getShadow, Icon, IconButton, ListItem, SearchField, Select, Spinner, TextField, TopNavigation, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../../components/PrototypeScreenFrame';
import { AddUserFlow } from '../users/AddUserFlow';
import type { PrototypeUser } from '../users/userData';
import { AuthHelpSheet } from './AuthHelpSheet';
import { countries, countryFlag, contactKey, defaultCountry, validContact, type Country } from './countries';

type Stage = 'splash' | 'contact' | 'countries' | 'sending' | 'instructions' | 'profile' | 'creating';
type Props = {
  accounts: Readonly<Record<string, PrototypeUser>>;
  onComplete: (user: PrototypeUser, key: string, isNew: boolean) => void;
};
const SPLASH_MS = 2500;
const SENDING_MS = 1500;
const VERIFICATION_MS = 8000;
const CREATING_MS = 2000;
// Native SVG replaces the color's alpha with stopOpacity. Split the token's
// RGBA channels so native and web render the same transparent gradient.
const splashStops = theme.colorEffect.splash.map(stop => {
  const rgba = stop.color.match(/^rgba\((.+),\s*([\d.]+)\)$/);
  return { offset: stop.position, color: rgba ? `rgb(${rgba[1]})` : stop.color, opacity: rgba ? Number(rgba[2]) : 1 };
});

/** Session-only authentication demo: timers simulate verification; nothing is sent. */
export function AuthFlow({ accounts, onComplete }: Props) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [stage, setStage] = useState<Stage>('splash');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [query, setQuery] = useState('');
  const [slide, setSlide] = useState(0);
  const [help, setHelp] = useState(false);
  const [notice, setNotice] = useState<'language' | 'voice'>();
  const [error, setError] = useState('');
  const [createdUser, setCreatedUser] = useState<PrototypeUser>();
  const swipeStart = useRef(0);
  const countryList = useRef<ComponentRef<typeof ScrollView>>(null);
  const complete = useRef(onComplete);
  complete.current = onComplete;
  const value = method === 'phone' ? phone : email;
  const key = contactKey(method, value, country);
  const existing = accounts[key];
  const back = () => {
    Keyboard.dismiss();
    setError('');
    if (help) setHelp(false);
    else if (notice) setNotice(undefined);
    else if (stage === 'countries' || stage === 'sending' || stage === 'instructions' || stage === 'profile') setStage('contact');
    else if (stage === 'contact' && method === 'email') setMethod('phone');
    else if (stage === 'contact') setStage('splash');
  };
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => { if (stage === 'profile') return false; back(); return true; });
    return () => subscription.remove();
  });
  useEffect(() => {
    if (help || notice) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (stage === 'splash') timer = setTimeout(() => setStage('contact'), SPLASH_MS);
    if (stage === 'sending') timer = setTimeout(() => { setSlide(0); setStage('instructions'); }, SENDING_MS);
    if (stage === 'instructions') timer = setTimeout(() => {
      if (existing) complete.current(existing, key, false);
      else setStage('profile');
    }, VERIFICATION_MS);
    if (stage === 'creating' && createdUser) timer = setTimeout(() => complete.current(createdUser, key, true), CREATING_MS);
    return () => clearTimeout(timer);
  }, [stage, help, notice, existing, key, createdUser]);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  const send = () => {
    if (!validContact(method, value)) {
      setError(method === 'email' ? 'Enter a valid email address.' : 'Enter a WhatsApp number with 5–15 digits.');
      return;
    }
    Keyboard.dismiss(); setError(''); setStage('sending');
  };
  const title = (text: string, centered = false) => <Text accessibilityRole="header" style={[t.typography.headingM, { color: t.color.text.neutral.primary }, centered && styles.center]}>{text}</Text>;
  const body = (text: string, centered = false) => <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }, centered && styles.center]}>{text}</Text>;

  if (stage === 'profile') return <AddUserFlow mode="signup" onCancel={() => setStage('instructions')} onComplete={user => { setCreatedUser(user); setStage('creating'); }} />;

  if (stage === 'splash') return <PrototypeScreenFrame>
    <View style={styles.flex}>
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { top: -(Platform.OS === 'web' ? theme.size['1000'] : insets.top) }]}>
        <Svg width="100%" height="100%">
          <Defs><LinearGradient id="splash" x1="0%" y1="0%" x2="0%" y2="100%">{splashStops.map((stop, index) => <Stop key={index} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />)}</LinearGradient></Defs>
          <Rect width="100%" height="100%" fill="url(#splash)" />
        </Svg>
      </View>
      <View style={styles.splashCopy}>
        <Image source={require('../../../assets/auth/logo-splash.png')} accessibilityLabel="Treetracker" resizeMode="contain" style={styles.splashLogo} />
        <Text style={[t.typography.labelM, { color: t.color.text.neutral.secondary }]}>Powered by Greenstand</Text>
        <View style={{ marginTop: theme.space['400'] }}><Spinner /></View>
      </View>
      <Image source={require('../../../assets/auth/forest.png')} accessible={false} resizeMode="contain" style={styles.forest} />
    </View>
  </PrototypeScreenFrame>;

  if (stage === 'creating') return <PrototypeScreenFrame><View style={styles.creating}><Spinner size="md" />{title('Creating your account...', true)}</View></PrototypeScreenFrame>;

  const filtered = countries.filter(item => `${item[1]} ${item[0]} +${item[2]}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <PrototypeScreenFrame>
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : undefined}>
      <TopNavigation leftVariant={{ type: stage === 'countries' ? 'close' : 'back', onPress: back }} rightVariant={stage === 'contact' ? { type: 'language', onPress: () => setNotice('language') } : stage === 'instructions' ? { type: 'info', accessibilityLabel: 'Need help?', onPress: () => setHelp(true) } : undefined} />
      {stage === 'contact' ? <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.contact, keyboardOpen && { paddingTop: theme.space['0'] }]}>
        <View style={styles.heading}>
          <Image source={require('../../../assets/auth/logo-form.png')} accessibilityLabel="Treetracker" resizeMode="contain" style={styles.formLogo} />
          <View style={styles.copy}>{title('Log in or sign up', true)}{body('We’ll send you a link to get you in.', true)}</View>
        </View>
        <View style={{ gap: theme.space['200'] }}>
          <View style={styles.copy}>
            <View style={{ gap: theme.space['200'] }}>
              {method === 'phone' ? <Select label="Country code" hideLabel value={`${country[1]} (+${country[2]})`} leadingContent={<Text style={[t.typography.paragraphM, { fontSize: theme.icon.lg, lineHeight: theme.icon.lg }]}>{countryFlag(country[0])}</Text>} onPress={() => { Keyboard.dismiss(); setQuery(''); setStage('countries'); }} /> : null}
              <TextField accessibilityLabel={method === 'phone' ? 'WhatsApp number' : 'Email address'} leadingIcon={method === 'phone' ? 'whatsapp' : 'email-outline'} placeholder={method === 'phone' ? 'WhatsApp number' : 'Email address'} value={value} onChangeText={text => { method === 'phone' ? setPhone(text) : setEmail(text); setError(''); }} keyboardType={method === 'phone' ? 'phone-pad' : 'email-address'} autoComplete={method === 'phone' ? 'tel-national' : 'email'} autoCapitalize="none" autoCorrect={false} returnKeyType="next" onSubmitEditing={send} />
              {error ? <Text accessibilityRole="alert" style={[t.typography.paragraphS, { color: t.color.text.error.default }]}>{error}</Text> : null}
            </View>
            <Button label="Next" trailingIcon="arrow-right" onPress={send} />
          </View>
          <View style={styles.separator}><View style={styles.flex}><Divider /></View>{body('or')}<View style={styles.flex}><Divider /></View></View>
          <Button label={method === 'phone' ? 'Continue with Email' : 'Continue with WhatsApp'} variant="secondary" leadingIcon={method === 'phone' ? 'email-outline' : 'whatsapp'} onPress={() => { setMethod(method === 'phone' ? 'email' : 'phone'); setError(''); }} />
        </View>
      </ScrollView> : stage === 'countries' ? <View style={styles.flex}>
        <View style={styles.search}><SearchField variant="default" placeholder="Country name or code" accessibilityLabel="Country name or code" value={query} autoCapitalize="none" autoCorrect={false} onChangeText={text => { setQuery(text); countryList.current?.scrollTo({ y: 0, animated: false }); }} onVoicePress={() => setNotice('voice')} /></View>
        <ScrollView ref={countryList} style={styles.flex} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentContainerStyle={styles.countryList}>
          {filtered.map((item, index) => <View key={item[0]}>
            {index === 0 || filtered[index - 1][1][0] !== item[1][0] ? <Text style={[t.typography.labelM, styles.letter, { color: t.color.text.neutral.tertiary }]}>{item[1][0]}</Text> : null}
            <ListItem size="md" showDivider label={`${countryFlag(item[0])}  ${item[1]}`} trailingElement="text" caption={`+${item[2]}`} accessibilityLabel={`${item[1]}, country code +${item[2]}`} onPress={() => { setCountry(item); setStage('contact'); }} />
          </View>)}
          {!filtered.length ? body('No countries match your search.') : null}
        </ScrollView>
      </View> : stage === 'sending' ? <View style={styles.sending}><Spinner />{title('Sending a message...', true)}</View> : <>
        <ScrollView contentContainerStyle={styles.instructions}>
          <View style={styles.instructionHeading}>
            {method === 'phone' ? <Image source={require('../../../assets/auth/whatsapp.png')} accessible={false} style={styles.appIcon} /> : <Icon name="email-outline" size="lg" color="brand.default" />}
            <View style={styles.copy}>{title(method === 'phone' ? 'Open WhatsApp and tap the link' : 'Check your email and tap the link')}{body(`We sent a message to ${method === 'phone' ? `+${country[2]} ${phone} on WhatsApp` : email.trim()}.`)}</View>
          </View>
          <View style={styles.carousel} onTouchStart={event => { swipeStart.current = event.nativeEvent.pageX; }} onTouchEnd={event => { const delta = event.nativeEvent.pageX - swipeStart.current; if (Math.abs(delta) > theme.size['1200']) setSlide(delta < 0 ? 1 : 0); }}>
            <View style={styles.artRow}>
              {method === 'phone' ? <Image source={slide === 0 ? require('../../../assets/auth/whatsapp-step-1.png') : require('../../../assets/auth/whatsapp-step-2.png')} accessible={false} resizeMode="contain" style={styles.instructionArt} /> : <Icon name="email-outline" size="lg" color="brand.default" />}
              <View style={[styles.carouselArrow, slide === 0 ? styles.nextArrow : styles.previousArrow]}>
                <IconButton icon={slide === 0 ? 'chevron-right' : 'chevron-left'} size="md" variant="surface" accessibilityLabel={slide === 0 ? 'Next instruction' : 'Previous instruction'} onPress={() => setSlide(slide === 0 ? 1 : 0)} style={[styles.arrowSurface, { backgroundColor: t.color.fill.neutral.surface }, getShadow(t.elevation.lg)]} />
              </View>
            </View>
            <View accessibilityLiveRegion="polite" style={styles.slideCaption}>
              <Text style={[t.typography.labelSStrong, styles.center, { color: t.color.text.neutral.primary }]}>Step {slide + 1}</Text>
              <Text style={[method === 'phone' ? t.typography.paragraphS : t.typography.paragraphM, styles.center, { color: t.color.text.neutral.secondary }]}>{slide === 0 ? (method === 'phone' ? 'Open WhatsApp.' : 'Open your email inbox.') : 'Open the message from Greenstand and tap the sign in link.'}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, theme.space['1200']) }]}>
          <Button label="Resend message" leadingIcon="refresh" variant="secondary" onPress={() => setStage('sending')} />
          <Button label={method === 'phone' ? 'Open WhatsApp' : 'Open email'} trailingIcon="external-link" onPress={() => setSlide(1)} />
        </View>
      </>}
    </KeyboardAvoidingView>
    <AuthHelpSheet visible={help} onClose={() => setHelp(false)} />
    <BottomSheetModal visible={Boolean(notice)} title={notice === 'voice' ? 'Voice search' : 'Language'} onClose={() => setNotice(undefined)}>{body(notice === 'voice' ? 'Voice search is not connected in this prototype. Search by country name or calling code.' : 'This prototype is available in English.')}</BottomSheetModal>
  </PrototypeScreenFrame>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { textAlign: 'center' },
  contact: { paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['1200'], paddingBottom: theme.space['600'], gap: theme.space['800'] },
  heading: { alignItems: 'center', gap: theme.space['300'] },
  copy: { gap: theme.space['400'], width: '100%' },
  separator: { flexDirection: 'row', alignItems: 'center', gap: theme.space['300'] },
  search: { height: theme.size['1200'] + theme.space['200'], flexShrink: 0, paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['200'] },
  countryList: { paddingHorizontal: theme.layout.marginX, paddingVertical: theme.space['400'] },
  letter: { marginTop: theme.space['400'], paddingHorizontal: theme.space['200'] },
  sending: { alignItems: 'center', paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'], gap: theme.space['600'] },
  creating: { alignItems: 'center', paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['1600'], gap: theme.space['600'] },
  instructions: { paddingHorizontal: theme.layout.marginX, paddingBottom: theme.space['600'], gap: theme.space['800'] },
  instructionHeading: { alignItems: 'center', gap: theme.space['600'] },
  appIcon: { width: theme.size['1200'], height: theme.size['1200'] },
  carousel: { gap: theme.space['200'] },
  artRow: { width: '100%', aspectRatio: 528 / 353, alignItems: 'center', justifyContent: 'center' },
  carouselArrow: { position: 'absolute', top: theme.space['0'], bottom: theme.space['0'], justifyContent: 'center' },
  nextArrow: { right: theme.space['200'] },
  previousArrow: { left: theme.space['200'] },
  arrowSurface: { borderRadius: theme.radius.full },
  instructionArt: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
  slideCaption: { width: '100%', gap: theme.space['050'] },
  footer: { paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'], gap: theme.space['400'] },
  splashCopy: { position: 'absolute', top: '30%', width: '100%', alignItems: 'center', gap: theme.space['400'] },
  splashLogo: { width: '78%', height: 'auto', aspectRatio: 280 / 44 },
  formLogo: { width: '55%', height: 'auto', aspectRatio: 180 / 37 },
  forest: { position: 'absolute', bottom: 0, width: '100%', height: 'auto', aspectRatio: 720 / 430 }
});
