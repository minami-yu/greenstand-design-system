import { useEffect, useState } from 'react';
import { AccessibilityInfo, Image, Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Dialog, DialogOverlay, Icon, IconButton, PointerDialog, theme, useTheme } from '@greenstand/design-system';

export type OnboardingAnchor = { x: number; y: number; width: number; height: number };
type Props = { navbar: OnboardingAnchor; uploadButton?: OnboardingAnchor; onComplete: () => void };
const steps = [
  { title: 'Welcome!', body: 'Take a quick tour to get started.', image: require('../../../assets/onboarding/welcome.png'), aspectRatio: 480 / 404 },
  { title: 'Plant a tree', body: 'Plant a tree to begin.', image: require('../../../assets/onboarding/plant.png'), aspectRatio: 480 / 424 },
  { title: 'Capture a tree', body: 'Tap this button to capture each planted tree.', image: require('../../../assets/onboarding/capture.png'), aspectRatio: 480 / 424 },
  { title: 'Upload tree photos', body: 'Your photos will be verified.', image: require('../../../assets/onboarding/upload.png'), aspectRatio: 480 / 400 },
  { title: 'Add users', body: 'You can also add people who use this device.', image: require('../../../assets/onboarding/users.png'), aspectRatio: 1 }
] as const;

/** Product-owned tour. Spotlight geometry follows the actual home controls. */
export function HomeOnboarding({ navbar, uploadButton, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const t = useTheme();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const current = steps[step];
  const next = () => step === steps.length - 1 ? onComplete() : setStep(previous => previous + 1);
  useEffect(() => {
    if (Platform.OS !== 'web') AccessibilityInfo.announceForAccessibility(`${step > 0 && step < 4 ? `Step ${step}. ` : ''}${current.title}. ${current.body}`);
  }, [step, current]);

  const camera = step === 2;
  const users = step === 4;
  const upload = step === 3;
  const targetSize = camera ? theme.size['2000'] : theme.size['1600'];
  const targetCenter = navbar.x + navbar.width * (users ? 1.5 / 5 : 0.5);
  const targetTop = upload && uploadButton ? uploadButton.y - theme.space['200']
    : camera ? navbar.y - theme.space['800'] - theme.space['200']
      : navbar.y + theme.space['600'] - targetSize / 2;
  const target = upload && uploadButton ? {
    x: uploadButton.x - theme.space['200'], y: targetTop,
    width: uploadButton.width + theme.space['400'], height: uploadButton.height + theme.space['400']
  } : { x: targetCenter - targetSize / 2, y: targetTop, width: targetSize, height: targetSize };
  const pointed = camera || users || (upload && Boolean(uploadButton));
  const dialogWidth = navbar.width * 0.8;
  const illustrationWidth = Math.min(theme.size['2400'], Math.max(theme.size['0'], dialogWidth - theme.space['400'] * 2));
  const dialogLeft = navbar.x + (navbar.width - dialogWidth) / 2;
  const pointerOffset = Math.max(theme.radius.lg, Math.min(dialogWidth - theme.radius.lg - theme.size['600'], target.x + target.width / 2 - dialogLeft - theme.size['600'] / 2));
  const availableHeight = targetTop - insets.top - theme.space['400'];
  // Only the card contents scroll; the pointer stays visible beside its target.
  const contentMaxHeight = Math.max(theme.size['1200'], availableHeight - theme.space['600'] * 2 - theme.size['500']);
  const content = <View style={{ gap: theme.space[step === 0 ? '400' : '600'] }}>
    {step > 0 ? <View style={styles.backWrapper}><IconButton icon="arrow-left" variant="secondary" size="sm" accessibilityLabel="Previous onboarding step" onPress={() => setStep(previous => Math.max(0, previous - 1))} /></View> : null}
    <View style={[styles.illustratedCopy, step === 0 && { gap: theme.space['400'] }]}>
      <Image source={current.image} accessible={false} resizeMode="contain" style={[styles.illustration, { width: illustrationWidth, height: illustrationWidth / current.aspectRatio }]} />
      <View style={styles.copy} accessibilityLiveRegion="polite">
        {step > 0 && step < 4 ? <Text style={[t.typography.labelM, styles.center, { color: t.color.text.neutral.secondary }]}>Step {step}</Text> : null}
        <Text accessibilityRole="header" style={[t.typography.headingS, styles.center, { color: t.color.text.neutral.primary }]}>{current.title}</Text>
        <Text style={[users ? t.typography.labelM : t.typography.paragraphM, styles.center, { color: t.color.text.neutral.secondary }]}>{current.body}</Text>
      </View>
    </View>
    <Button label={step === 0 ? 'Get started' : users ? 'Start using' : 'Next'} trailingIcon={users ? undefined : 'arrow-right'} leadingIcon={users ? 'check' : undefined} onPress={next} />
  </View>;

  return <DialogOverlay visible onClose={onComplete} label="Getting started tour">
    {pointed ? <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.spotlight, { left: target.x, top: target.y, width: target.width, height: target.height, backgroundColor: t.color.fill.neutral.surface }]}>
      {upload ? <Button label="Upload" leadingIcon="cloud-upload-outline" variant="accent" accessible={false} focusable={false} tabIndex={-1} style={styles.uploadHighlight} /> : <View style={[styles.targetIcon, { width: camera ? theme.size['1600'] : theme.size['1200'], height: camera ? theme.size['1600'] : theme.size['1200'], backgroundColor: camera ? t.color.fill.brand.default : t.color.fill.neutral.surface }]}><Icon name={camera ? 'camera-outline' : 'people-outline'} size="lg" color={camera ? 'neutral.inverse' : 'neutral.secondary'} /></View>}
    </View> : null}
    {pointed ? <View style={{ position: 'absolute', left: dialogLeft, width: dialogWidth, bottom: height - targetTop + (users ? theme.space['400'] : theme.space['0']) }}>
      <PointerDialog key={step} direction="down" pointerOffset={pointerOffset} style={styles.pointedCard}>
        <ScrollView bounces={false} style={[styles.cardScroll, { maxHeight: contentMaxHeight }]} contentContainerStyle={styles.cardScrollContent}>{content}</ScrollView>
      </PointerDialog>
    </View> : <ScrollView bounces={false} style={styles.scroll} contentContainerStyle={styles.centered}>
      <Dialog key={step} style={{ width: dialogWidth }}>{content}</Dialog>
    </ScrollView>}
  </DialogOverlay>;
}
const styles = StyleSheet.create({
  backWrapper: { alignSelf: 'flex-start', marginTop: theme.space.n100, marginLeft: theme.space.n100, marginBottom: theme.space.n400 },
  scroll: { flex: 1 },
  centered: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: theme.space['400'] },
  pointedCard: { width: '100%' },
  cardScroll: { flexGrow: 0, marginTop: theme.space.n100, marginLeft: theme.space.n100 },
  cardScrollContent: { paddingTop: theme.space['100'], paddingLeft: theme.space['100'] },
  illustration: { flexShrink: 0 },
  illustratedCopy: { alignItems: 'center', gap: theme.space['200'] },
  copy: { width: '100%', gap: theme.space['100'] },
  center: { textAlign: 'center', width: '100%' },
  spotlight: { position: 'absolute', borderRadius: theme.radius.full, alignItems: 'center', justifyContent: 'center' },
  targetIcon: { borderRadius: theme.radius.full, alignItems: 'center', justifyContent: 'center' },
  uploadHighlight: { alignSelf: 'stretch', marginHorizontal: theme.space['200'] }
});
