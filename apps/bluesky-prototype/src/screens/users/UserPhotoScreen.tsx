import { useEffect, useRef, useState } from 'react';
import { CameraView, useCameraPermissions, type CameraType } from 'expo-camera';
import { Image, Linking, Platform, ScrollView, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { photoMask } from './photoMask';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Banner, Button, CameraCaptureButton, IconButton, ThemeProvider, TopNavigation, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../../components/PrototypeScreenFrame';

type Props = { onBack: () => void; onComplete: (image?: ImageSourcePropType) => void };
const demoPortrait = require('../../../assets/filters/oluwatobiloba.png');
export function UserPhotoScreen(props: Props) {
  return <ThemeProvider mode="dark"><PhotoContent {...props} /></ThemeProvider>;
}
function PhotoContent({ onBack, onComplete }: Props) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const camera = useRef<CameraView>(null);
  const mounted = useRef(true);
  const captureInFlight = useRef(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [stage, setStage] = useState<'tutorial' | 'camera' | 'confirmation'>('tutorial');
  const [previewWidth, setPreviewWidth] = useState(360);
  const [facing, setFacing] = useState<CameraType>('front');
  const [photo, setPhoto] = useState<ImageSourcePropType>();
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const demo = Platform.OS === 'web';
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const capture = async () => {
    if (captureInFlight.current) return;
    captureInFlight.current = true;
    setBusy(true);
    setError('');
    try {
      if (stage === 'tutorial') {
        const result = demo ? { granted: true } : permission?.granted ? permission : await requestPermission();
        if (!mounted.current) return;
        if (result.granted) setStage('camera');
        else setError('Allow camera access to take your profile photo, or skip this step.');
      } else {
        const result = demo ? undefined : await camera.current?.takePictureAsync();
        if (!mounted.current) return;
        if (!demo && !result?.uri) throw new Error('No photo returned');
        setPhoto(demo ? demoPortrait : { uri: result!.uri });
        setStage('confirmation');
      }
    } catch {
      if (mounted.current) setError('The camera could not take a photo. Please try again or skip this step.');
    } finally {
      captureInFlight.current = false;
      if (mounted.current) setBusy(false);
    }
  };
  const retake = () => { setPhoto(undefined); setReady(false); setStage('camera'); setError(''); };
  return <PrototypeScreenFrame>
    <TopNavigation leftVariant={{ type: 'back', onPress: stage === 'confirmation' ? retake : onBack }} />
    <ScrollView contentContainerStyle={styles.content}>
      {stage !== 'confirmation' ? <Text accessibilityRole="header" style={[t.typography.headingM, styles.title, { color: t.color.text.neutral.primary }]}>Let’s take your profile photo</Text> : <View style={styles.confirmationSpacer} />}
      <View style={styles.preview} onLayout={event => setPreviewWidth(event.nativeEvent.layout.width)}>
        {stage === 'tutorial' ? <Image source={require('../../../assets/users/photo-background.png')} style={styles.image} /> : stage === 'confirmation' || demo ? <Image source={photo ?? demoPortrait} style={[styles.image, demo && facing === 'back' && { transform: [{ scaleX: -1 }] }]} /> : <CameraView ref={camera} facing={facing} style={StyleSheet.absoluteFill} onCameraReady={() => setReady(true)} onMountError={() => { setReady(false); setError('The camera is unavailable. Please try again or skip this step.'); }} />}
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { transformOrigin: 'top left', transform: [{ scale: previewWidth / 360 }] }]}><SvgXml xml={photoMask} /></View>
        {stage === 'tutorial' ? <>
          <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: t.color.background.neutral.overlay }]} />
          <Image pointerEvents="none" source={require('../../../assets/users/photo-guide.png')} resizeMode="contain" style={styles.guide} />
        </> : null}
      </View>
      {stage !== 'confirmation' ? <CameraCaptureButton accessibilityLabel={stage === 'tutorial' ? 'Start profile camera' : 'Take profile photo'} disabled={busy || (stage === 'camera' && !demo && !ready)} onPress={capture} /> : null}
      {demo ? <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>Demo camera preview</Text> : null}
      {error ? <View style={styles.message}><Banner tone="error" message={error} showTrailingIcon={false} />{permission && !permission.granted && !permission.canAskAgain ? <Button label="Open camera settings" variant="secondary" onPress={() => { void Linking.openSettings().catch(() => setError('Open device settings to enable camera access.')); }} /> : null}</View> : null}
    </ScrollView>
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, theme.space['1200']) }]}>
      {stage === 'confirmation' ? <>
        <Button label="Retake" variant="secondary" leadingIcon="refresh" style={styles.flex} onPress={retake} />
        <Button label="Use this photo" leadingIcon="check" style={[styles.flex, { paddingHorizontal: theme.space['200'] }]} onPress={() => onComplete(photo)} />
      </> : <>
        <Button label="Skip" variant="secondary" trailingIcon="arrow-right" style={{ width: '48%' }} onPress={() => onComplete()} />
        <IconButton icon="counterclockwise-arrows" variant="secondary" accessibilityLabel="Switch camera" disabled={busy || stage === 'tutorial'} onPress={() => { setReady(false); setFacing(value => value === 'front' ? 'back' : 'front'); }} />
      </>}
    </View>
  </PrototypeScreenFrame>;
}
const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { alignItems: 'center', gap: theme.space['400'], paddingBottom: theme.space['400'] },
  title: { textAlign: 'center', paddingHorizontal: theme.layout.marginX },
  confirmationSpacer: { height: theme.size['1400'] },
  preview: { width: '100%', aspectRatio: 1, overflow: 'hidden' },
  image: { position: 'absolute', width: '100%', height: '100%' },
  // Artwork placement is normalized to the exported 360-square camera viewport.
  guide: { position: 'absolute', width: '62.5%', height: '78.2%', left: '18.89%', bottom: '2.22%' },
  message: { paddingHorizontal: theme.layout.marginX, gap: theme.space['200'], width: '100%' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', gap: theme.space['200'], paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'] }
});
