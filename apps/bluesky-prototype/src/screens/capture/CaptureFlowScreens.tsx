import { useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { treeGuidanceSvg } from '../../components/camera/guidanceArtwork';
import { FadingCameraGuidance } from '../../components/camera/FadingCameraGuidance';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type ImageSourcePropType
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import {
  Avatar,
  AvatarCard,
  Button,
  CameraCaptureButton,
  DsLink,
  Hint,
  ImageGroup,
  IconButton,
  Icon,
  ThemeProvider,
  TopNavigation,
  theme,
  useTheme
} from '@greenstand/design-system';

import { CaptureReview } from './CaptureReview';
import { CaptureComplete } from './CaptureComplete';
import { saveCapture, type SavedCapture } from './captureStorage';

const userOluwatobiloba = require('../../../assets/capture/user-oluwatobiloba.png');
const userAmara = require('../../../assets/capture/user-amara.png');
const userChinecherem = require('../../../assets/capture/user-chinecherem.png');
const userNneka = require('../../../assets/capture/user-nneka.png');
const orgGreenstand = require('../../../assets/capture/org-greenstand.png');
const orgKilimanjaro = require('../../../assets/capture/org-kilimanjaro.png');
const cameraTree = require('../../../assets/capture/camera-tree.png');

export type CaptureUser = {
  id: string;
  image?: ImageSourcePropType;
  name: string;
};

export type CaptureOrganization = {
  id: string;
  image: ImageSourcePropType;
  name: string;
};

const USERS: CaptureUser[] = [
  { id: 'oluwatobiloba', image: userOluwatobiloba, name: 'Oluwatobiloba Adeyemi' },
  { id: 'amara', image: userAmara, name: 'Amara Diallo' },
  { id: 'chinecherem', image: userChinecherem, name: 'Chinecherem Okeke' },
  { id: 'nneka', image: userNneka, name: 'Nneka Ifeanyichukwu' }
];

const ORGANIZATIONS: CaptureOrganization[] = [
  { id: 'greenstand', image: orgGreenstand, name: 'Greenstand' },
  { id: 'kilimanjaro', image: orgKilimanjaro, name: 'Kilimanjaro Project' }
];

type SelectionScreenProps<T> = {
  addLabel: string;
  onAdd?: () => void;
  items: T[];
  onBack: () => void;
  onSelect: (item: T) => void;
  renderItem: (item: T, onPress: () => void) => ReactNode;
  title: string;
  footer?: ReactNode;
};

function AndroidStatusHeader() {
  const t = useTheme();

  return (
    <View style={styles.androidStatusHeader}>
      <Text style={[styles.androidTime, { color: t.color.icon.neutral.primary }]}>
        9:30
      </Text>
      <View style={[styles.androidCamera, { backgroundColor: t.color.icon.neutral.primary }]} />
      <View style={styles.androidStatusIcons}>
        <View style={[styles.wifiShape, { backgroundColor: t.color.icon.neutral.primary }]} />
        <View style={styles.signalBars}>
          <View style={[styles.signalBar, styles.signalBarSmall, { backgroundColor: t.color.icon.neutral.primary }]} />
          <View style={[styles.signalBar, styles.signalBarMedium, { backgroundColor: t.color.icon.neutral.primary }]} />
          <View style={[styles.signalBar, styles.signalBarLarge, { backgroundColor: t.color.icon.neutral.primary }]} />
        </View>
        <View style={[styles.batteryShape, { borderColor: t.color.icon.neutral.primary }]}>
          <View style={[styles.batteryFill, { backgroundColor: t.color.icon.neutral.primary }]} />
        </View>
      </View>
    </View>
  );
}

function CaptureHeader({
  doneDisabled = false,
  onBack,
  onDone
}: {
  doneDisabled?: boolean;
  onBack: () => void;
  onDone?: () => void;
}) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const showPrototypeStatusHeader = Platform.OS === 'web';

  return (
    <View
      style={[
        styles.headerSurface,
        {
          backgroundColor: t.color.background.neutral.default,
          paddingTop: showPrototypeStatusHeader ? 0 : insets.top
        }
      ]}
    >
      {showPrototypeStatusHeader ? <AndroidStatusHeader /> : null}
      <TopNavigation
        leftVariant={{
          type: 'back',
          accessibilityLabel: 'Back',
          onPress: onBack
        }}
        style={{ backgroundColor: t.color.background.neutral.default }}
      />
      {onDone ? (
        <View
          style={[
            styles.doneButtonLayer,
            { top: showPrototypeStatusHeader ? 44 : insets.top + theme.space['100'] }
          ]}
          pointerEvents="box-none"
        >
          <Button
            disabled={doneDisabled}
            label="Done"
            leadingIcon="check"
            onPress={onDone}
            variant="primary"
          />
        </View>
      ) : null}
    </View>
  );
}

function SelectionScreen<T extends { id: string }>({
  addLabel,
  onAdd,
  footer,
  items,
  onBack,
  onSelect,
  renderItem,
  title
}: SelectionScreenProps<T>) {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const surfaceWidth = Platform.OS === 'web' ? Math.min(width, 360) : width;
  const cardWidth = Math.floor(
    (surfaceWidth - theme.layout.marginX * 2 - theme.space['200']) / 2
  );

  return (
    <View style={[styles.screen, { backgroundColor: t.color.background.neutral.default }]}>
      <View style={[styles.phoneSurface, Platform.OS === 'web' ? styles.webPhoneSurface : undefined]}>
        <CaptureHeader onBack={onBack} />
        <ScrollView contentContainerStyle={styles.selectionContent}>
          <Text style={[t.typography.headingM, { color: t.color.text.neutral.primary }]}>
            {title}
          </Text>
          <View style={styles.cardGrid}>
            {items.map((item) => (
              <View key={item.id} style={[styles.cardGridItem, { width: cardWidth }]}>
                {renderItem(item, () => onSelect(item))}
              </View>
            ))}
            <View style={[styles.cardGridItem, { width: cardWidth }]}>
              <AvatarCard label={addLabel} visualElements="button" onPress={onAdd} disabled={!onAdd} style={styles.selectionCard} />
            </View>
          </View>
          {footer ? <View style={styles.linkStack}>{footer}</View> : null}
        </ScrollView>
      </View>
    </View>
  );
}

export function CaptureSelectUserScreen({
  users = USERS,
  onAddUser,
  onBack,
  onSelectUser
}: {
  onBack: () => void;
  onSelectUser: (user: CaptureUser) => void;
  users?: CaptureUser[];
  onAddUser?: () => void;
}) {
  return (
    <SelectionScreen
      addLabel="Add new user"
      items={users}
      onAdd={onAddUser}
      onBack={onBack}
      onSelect={onSelectUser}
      renderItem={(user, onPress) => (
        <AvatarCard label={user.name} onPress={onPress} source={user.image} style={styles.selectionCard} />
      )}
      title="Who's using?"
    />
  );
}

export function CaptureSelectOrganizationScreen({
  onBack,
  onContinueWithoutOrganization,
  onSelectOrganization
}: {
  onBack: () => void;
  onContinueWithoutOrganization: () => void;
  onSelectOrganization: (organization: CaptureOrganization) => void;
}) {
  return (
    <SelectionScreen
      addLabel="Add new organization"
      footer={(
        <DsLink
          color="brand"
          icon="leading"
          label="Continue without organization"
          leadingIcon="arrow-right"
          onPress={onContinueWithoutOrganization}
        />
      )}
      items={ORGANIZATIONS}
      onBack={onBack}
      onSelect={onSelectOrganization}
      renderItem={(organization, onPress) => (
        <AvatarCard label={organization.name} onPress={onPress} source={organization.image} style={styles.selectionCard} />
      )}
      title="Select organization"
    />
  );
}

function CameraStage({
  cameraRef,
  capturedUri,
  onReady,
  height,
  mountError,
  onMountError,
  onRequestPermission,
  permissionCanAskAgain,
  permissionGranted,
  showTutorial,
  onTutorialComplete,
  width
}: {
  cameraRef: RefObject<CameraView | null>;
  capturedUri?: string;
  onReady: () => void;
  height: number;
  mountError?: string;
  onMountError: (message: string) => void;
  onRequestPermission: () => void;
  permissionCanAskAgain: boolean;
  permissionGranted: boolean;
  showTutorial: boolean;
  onTutorialComplete: () => void;
  width: number;
}) {
  const t = useTheme();

  return (
    <View style={[styles.cameraStage, { height, width }]}>
      {permissionGranted ? (
        <CameraView
          onCameraReady={onReady}
          active={!capturedUri}
          animateShutter={false}
          facing="back"
          mode="picture"
          onMountError={(event) => {
            onMountError(event.message);
          }}
          ref={cameraRef}
          responsiveOrientationWhenOrientationLocked
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <Image source={cameraTree} style={styles.cameraImage} />
      )}
      {capturedUri ? (
        <Image source={{ uri: capturedUri }} style={[StyleSheet.absoluteFill, styles.cameraImage]} />
      ) : null}
      {!permissionGranted || mountError ? (
        <View style={[StyleSheet.absoluteFill, styles.permissionOverlay]}>
          <Text style={[t.typography.labelMStrong, styles.permissionTitle, { color: t.color.text.neutral.inverse }]}>
            {mountError ? 'Camera unavailable' : 'Camera access needed'}
          </Text>
          <Text style={[t.typography.paragraphS, styles.permissionCopy, { color: t.color.text.neutral.inverse }]}>
            {mountError ?? 'Allow camera access to preview and capture a tree photo in this prototype.'}
          </Text>
          {!mountError ? (
            <Button
              label={permissionCanAskAgain ? 'Enable camera' : 'Open settings'}
              onPress={onRequestPermission}
              variant="primary"
            />
          ) : null}
        </View>
      ) : null}
      {showTutorial ? (
        <FadingCameraGuidance onComplete={onTutorialComplete} style={[StyleSheet.absoluteFill, styles.tutorialOverlay]}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: t.color.background.neutral.overlay }]} />
          <View style={styles.sproutFrame}>
            <SvgXml xml={treeGuidanceSvg} accessible={false} />
          </View>
          <View style={styles.tutorialHint}>
            <Hint content="Point at a tree" pointer={false} showIcon={false} />
          </View>
        </FadingCameraGuidance>
      ) : null}
    </View>
  );
}

type CaptureCameraProps = {
  onBack: () => void;
  onDone: () => void;
  selectedUser?: CaptureUser;
  selectedOrganization?: CaptureOrganization;
};

function CameraScreenContent({ onBack, onDone, selectedUser, selectedOrganization }: CaptureCameraProps) {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView | null>(null);
  const mounted = useRef(true);
  const working = useRef(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [showTutorial, setShowTutorial] = useState(true);
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);
  const [photos, setPhotos] = useState<SavedCapture[]>([]);
  const [pendingUri, setPendingUri] = useState<string>();
  const [reviewSheetHeight, setReviewSheetHeight] = useState(0);
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [showEndHint, setShowEndHint] = useState(false);
  const [cameraError, setCameraError] = useState<string>();
  const [saveError, setSaveError] = useState<string>();
  const [captureError, setCaptureError] = useState<string>();
  const stageWidth = Platform.OS === 'web' ? Math.min(width, 360) : width;
  const stageHeight = stageWidth * (4 / 3);
  const permissionGranted = permission?.granted ?? false;
  const permissionCanAskAgain = permission?.canAskAgain ?? true;

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => {
    if (!showEndHint) return;
    const timer = setTimeout(() => setShowEndHint(false), 2500);
    return () => clearTimeout(timer);
  }, [showEndHint]);
  useEffect(() => {
    if (!permission || permission.granted || hasRequestedPermission || !permission.canAskAgain) return;
    setHasRequestedPermission(true);
    void requestPermission().catch(() => { if (mounted.current) setCaptureError('Unable to request camera access. Please try again.'); });
  }, [hasRequestedPermission, permission, requestPermission]);

  const handleRequestPermission = async () => {
    try {
      if (permission?.canAskAgain === false) await Linking.openSettings();
      else await requestPermission();
    } catch { if (mounted.current) setCaptureError('Unable to open camera permissions. Please try again.'); }
  };
  const handleCapture = async () => {
    if (working.current || pendingUri) return;
    if (!permissionGranted) { await handleRequestPermission(); return; }
    if (!ready) return;
    working.current = true;
    setBusy(true);
    setCaptureError(undefined);
    setShowEndHint(false);
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.75 });
      if (!photo?.uri) throw new Error('The camera did not return a photo. Please try again.');
      if (!mounted.current) return;
      setPendingUri(photo.uri);
      setReady(false);
      setShowTutorial(false);
    } catch (error) {
      if (mounted.current) setCaptureError(error instanceof Error ? error.message : 'Unable to capture photo.');
    } finally {
      working.current = false;
      if (mounted.current) setBusy(false);
    }
  };
  const discard = () => {
    if (working.current) return;
    setPendingUri(undefined);
    setSaveError(undefined);
    setReady(false);
  };
  const handleSave = async (note: string, organization?: CaptureOrganization) => {
    if (!pendingUri || working.current) return;
    working.current = true;
    setBusy(true);
    setSaveError(undefined);
    try {
      const saved = await saveCapture({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, uri: pendingUri, note, organizationId: organization?.id, userId: selectedUser?.id, capturedAt: new Date().toISOString() });
      if (!mounted.current) return;
      setPhotos(current => [...current, saved]);
      setPendingUri(undefined);
      setReady(false);
      if (photos.length === 0) setShowEndHint(true);
    } catch {
      if (mounted.current) setSaveError('Could not save this photo. Check available storage and try again.');
    } finally {
      working.current = false;
      if (mounted.current) setBusy(false);
    }
  };

  if (complete) return <ThemeProvider mode="light"><View style={[styles.cameraScreen, { backgroundColor: theme.color.background.neutral.default }]}>
    <View style={[styles.phoneSurface, Platform.OS === 'web' && styles.webPhoneSurface, { paddingTop: Platform.OS === 'web' ? theme.space['0'] : insets.top }]}>
      {Platform.OS === 'web' && <AndroidStatusHeader />}
      <CaptureComplete count={photos.length} onDone={onDone} />
    </View>
  </View></ThemeProvider>;

  return <View style={[styles.cameraScreen, { backgroundColor: t.color.background.neutral.default }]}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.phoneSurface, Platform.OS === 'web' && styles.webPhoneSurface]}>
      <CaptureHeader doneDisabled={photos.length === 0 || Boolean(pendingUri) || busy} onBack={() => { if (!working.current) { if (pendingUri) discard(); else onBack(); } }} onDone={() => { setShowEndHint(false); setComplete(true); }} />
      {pendingUri ? <View style={styles.reviewLayout}>
        <View style={[styles.reviewPreview, { bottom: reviewSheetHeight + theme.space['400'] }]}>
          {reviewSheetHeight > 0 &&
            <Image accessibilityLabel="Photo to save" source={{ uri: pendingUri }} resizeMode="contain" style={styles.reviewImage} />
          }
        </View>
        <View style={styles.reviewSheet} onLayout={event => setReviewSheetHeight(event.nativeEvent.layout.height)}>
          <ThemeProvider mode="light"><CaptureReview organizations={ORGANIZATIONS} initialOrganization={selectedOrganization} busy={busy} error={saveError} onDiscard={discard} onSave={(note, organization) => { void handleSave(note, organization); }} /></ThemeProvider>
        </View>
      </View> : <>
        <View style={styles.cameraBody}>
          <View>
            <CameraStage cameraRef={cameraRef} onReady={() => setReady(true)} height={stageHeight} width={stageWidth} mountError={cameraError} onMountError={message => { setReady(false); setCameraError(message); }} onRequestPermission={() => { void handleRequestPermission(); }} permissionCanAskAgain={permissionCanAskAgain} permissionGranted={permissionGranted} showTutorial={showTutorial && permissionGranted && ready && !cameraError} onTutorialComplete={() => setShowTutorial(false)} />
            {showEndHint && <View pointerEvents="none" style={styles.endHint}><Hint content="Tap to end" direction="up" alignment="center" /></View>}
          </View>
          <CameraCaptureButton disabled={busy || (permissionGranted && !ready)} onPress={() => { void handleCapture(); }} />
          {captureError && <Text accessibilityRole="alert" style={[t.typography.paragraphS, { color: t.color.text.error.default }]}>{captureError}</Text>}
        </View>
        <View style={[styles.cameraFooter, { paddingBottom: Math.max(insets.bottom, theme.space['800']) }]}>
          <ImageGroup images={photos.map(photo => ({ uri: photo.uri }))} />
          <View style={styles.cameraActions}>
            <IconButton icon="information-outline" variant="secondary" accessibilityLabel="Capture info" onPress={() => setShowTutorial(current => !current)} />
            <Avatar size="md" source={selectedUser?.image ?? USERS[0].image} />
          </View>
        </View>
      </>}
    </KeyboardAvoidingView>
  </View>;
}

export function CaptureCameraScreen(props: CaptureCameraProps) {
  return <ThemeProvider mode="dark"><CameraScreenContent {...props} /></ThemeProvider>;
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1
  },
  cameraScreen: {
    alignItems: 'center',
    flex: 1
  },
  phoneSurface: {
    flex: 1,
    overflow: 'hidden',
    width: '100%'
  },
  webPhoneSurface: {
    maxWidth: 360
  },
  androidStatusHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.marginX,
    position: 'relative',
    width: '100%'
  },
  androidTime: {
    fontSize: 14,
    lineHeight: 20
  },
  androidCamera: {
    borderRadius: theme.radius.full,
    height: theme.size['600'],
    left: '50%',
    marginLeft: -theme.size['300'],
    position: 'absolute',
    top: theme.space['200'],
    width: theme.size['600']
  },
  androidStatusIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['100']
  },
  signalBars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.space['050']
  },
  signalBar: {
    width: theme.space['050']
  },
  signalBarSmall: {
    height: theme.space['200']
  },
  signalBarMedium: {
    height: theme.space['300']
  },
  signalBarLarge: {
    height: theme.space['400']
  },
  wifiShape: {
    borderRadius: theme.radius.full,
    height: theme.size['300'],
    transform: [{ rotate: '45deg' }],
    width: theme.size['300']
  },
  batteryShape: {
    borderRadius: theme.radius.sm,
    borderWidth: theme.border.sm,
    height: theme.size['400'],
    padding: theme.space['050'],
    width: theme.size['600']
  },
  batteryFill: {
    borderRadius: theme.radius.sm,
    flex: 1
  },
  headerSurface: {
    width: '100%'
  },
  doneButtonLayer: {
    position: 'absolute',
    right: theme.space['400'],
    top: 44
  },
  selectionContent: {
    paddingBottom: theme.space['800'],
    gap: theme.space['600'],
    paddingHorizontal: theme.layout.marginX,
    paddingTop: theme.space['0']
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space['200']
  },
  cardGridItem: {
    minWidth: 0
  },
  selectionCard: {
    width: '100%'
  },
  linkStack: {
    alignItems: 'flex-start',
    gap: theme.space['300'],
    width: '100%'
  },
  cameraBody: {
    marginTop: theme.space['400'],
    alignItems: 'center',
    gap: theme.space['400']
  },
  cameraStage: {
    backgroundColor: theme.color.palette.black[900],
    overflow: 'hidden',
    position: 'relative'
  },
  cameraImage: {
    height: '100%',
    width: '100%'
  },
  tutorialOverlay: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  permissionOverlay: {
    alignItems: 'center',
    gap: theme.space['300'],
    justifyContent: 'center',
    paddingHorizontal: theme.layout.marginX
  },
  permissionTitle: {
    textAlign: 'center'
  },
  permissionCopy: {
    maxWidth: 280,
    textAlign: 'center'
  },
  sproutFrame: {
    marginBottom: theme.space['400'],
    marginTop: theme.space['800']
  },
  tutorialHint: {
    marginTop: theme.space.n800
  },
  cameraFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['300'],
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingBottom: theme.space['800'],
    paddingHorizontal: theme.layout.marginX
  },
  reviewLayout: { flex: 1, minHeight: theme.size['0'], overflow: 'hidden' },
  reviewSheet: { position: 'absolute', bottom: theme.space['0'], left: theme.space['0'], right: theme.space['0'], maxHeight: '100%' },
  reviewPreview: { position: 'absolute', top: theme.space['400'], left: theme.layout.marginX, right: theme.layout.marginX, overflow: 'hidden' },
  reviewImage: { ...StyleSheet.absoluteFill, borderRadius: theme.radius.md },
  cameraActions: { flexDirection: 'row', alignItems: 'center', gap: theme.space['300'] },
  endHint: { position: 'absolute', top: theme.space['100'], right: theme.layout.marginX },
  infoButton: {
    alignItems: 'center',
    borderRadius: theme.radius.full,
    height: theme.size['1200'],
    justifyContent: 'center',
    width: theme.size['1200']
  }
});
