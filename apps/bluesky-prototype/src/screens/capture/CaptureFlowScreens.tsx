import { useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type ImageSourcePropType
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, Ellipse, Mask, Rect, Path } from 'react-native-svg';
import {
  Avatar,
  AvatarCard,
  Button,
  CameraCaptureButton,
  DsLink,
  Hint,
  Icon,
  ThemeProvider,
  TopNavigation,
  theme,
  useTheme
} from '@greenstand/design-system';

const userOluwatobiloba = require('../../../assets/capture/user-oluwatobiloba.png');
const userAmara = require('../../../assets/capture/user-amara.png');
const userChinecherem = require('../../../assets/capture/user-chinecherem.png');
const userNneka = require('../../../assets/capture/user-nneka.png');
const orgGreenstand = require('../../../assets/capture/org-greenstand.png');
const orgKilimanjaro = require('../../../assets/capture/org-kilimanjaro.png');
const cameraTree = require('../../../assets/capture/camera-tree.png');

export type CaptureUser = {
  id: string;
  image: ImageSourcePropType;
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
        <View style={styles.selectionContent}>
          <Text style={[t.typography.headingM, { color: t.color.text.neutral.primary }]}>
            {title}
          </Text>
          <View style={styles.cardGrid}>
            {items.map((item) => (
              <View key={item.id} style={[styles.cardGridItem, { width: cardWidth }]}>
                {renderItem(item, () => onSelect(item))}
              </View>
            ))}
          </View>
          <View style={styles.linkStack}>
            <DsLink icon="leading" label={addLabel} leadingIcon="add" />
            {footer}
          </View>
        </View>
      </View>
    </View>
  );
}

export function CaptureSelectUserScreen({
  onBack,
  onSelectUser
}: {
  onBack: () => void;
  onSelectUser: (user: CaptureUser) => void;
}) {
  return (
    <SelectionScreen
      addLabel="Add new user"
      items={USERS}
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
          color="neutralPrimary"
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

function CameraMask() {
  const t = useTheme();

  return (
    <Svg height="100%" viewBox="0 0 360 480" width="100%">
      <Defs>
        <Mask id="camera-cutout">
          <Rect fill="white" height="480" width="360" x="0" y="0" />
          <Ellipse cx="180" cy="224" fill="black" rx="120" ry="180" />
        </Mask>
      </Defs>
      <Rect
        fill={t.color.background.neutral.overlay}
        height="480"
        mask="url(#camera-cutout)"
        width="360"
        x="0"
        y="0"
      />
    </Svg>
  );
}

function TutorialSprout() {
  const t = useTheme();

  return (
    <Svg height={220} viewBox="0 0 220 220" width={220}>
      <Ellipse cx="110" cy="180" fill="none" rx="86" ry="16" stroke={t.color.icon.neutral.primary} strokeWidth={2} />
      <Path d="M110 178V105" stroke={t.color.icon.neutral.primary} strokeLinecap="round" strokeWidth={2} />
      <Path
        d="M108 110C78 68 42 74 34 78c2 28 23 58 58 50 8-2 13-7 16-18Z"
        fill="none"
        stroke={t.color.icon.neutral.primary}
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        d="M112 112c12-50 59-60 91-54 4 36-27 72-70 70-10-1-17-5-21-16Z"
        fill="none"
        stroke={t.color.icon.neutral.primary}
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path d="M110 130c-15-20-30-34-50-46M112 128c18-24 40-40 66-50" stroke={t.color.icon.neutral.primary} strokeLinecap="round" strokeWidth={2} />
    </Svg>
  );
}

function CameraStage({
  cameraRef,
  capturedUri,
  height,
  mountError,
  onMountError,
  onRequestPermission,
  permissionCanAskAgain,
  permissionGranted,
  showTutorial,
  width
}: {
  cameraRef: RefObject<CameraView | null>;
  capturedUri?: string;
  height: number;
  mountError?: string;
  onMountError: (message: string) => void;
  onRequestPermission: () => void;
  permissionCanAskAgain: boolean;
  permissionGranted: boolean;
  showTutorial: boolean;
  width: number;
}) {
  const t = useTheme();

  return (
    <View style={[styles.cameraStage, { height, width }]}>
      {permissionGranted ? (
        <CameraView
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
      <View style={StyleSheet.absoluteFill}>
        <CameraMask />
      </View>
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
        <View style={[StyleSheet.absoluteFill, styles.tutorialOverlay]}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: t.color.background.neutral.overlay }]} />
          <View style={styles.sproutFrame}>
            <TutorialSprout />
          </View>
          <View style={styles.tutorialHint}>
            <Hint content="Point at a tree" pointer={false} showIcon={false} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

function CameraScreenContent({
  onBack,
  onDone,
  selectedUser
}: {
  onBack: () => void;
  onDone: () => void;
  selectedUser?: CaptureUser;
}) {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [showTutorial, setShowTutorial] = useState(true);
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [capturedUri, setCapturedUri] = useState<string | undefined>();
  const [cameraError, setCameraError] = useState<string | undefined>();
  const stageWidth = Platform.OS === 'web' ? Math.min(width, 360) : width;
  const stageHeight = stageWidth * (4 / 3);
  const permissionGranted = permission?.granted ?? false;
  const permissionCanAskAgain = permission?.canAskAgain ?? true;

  useEffect(() => {
    const timer = setTimeout(() => setShowTutorial(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!permission || permission.granted || hasRequestedPermission || !permission.canAskAgain) {
      return;
    }

    setHasRequestedPermission(true);
    requestPermission();
  }, [hasRequestedPermission, permission, requestPermission]);

  const handleRequestPermission = async () => {
    if (permission?.canAskAgain === false) {
      await Linking.openSettings();
      return;
    }

    await requestPermission();
  };

  const handleCapture = async () => {
    if (!permissionGranted) {
      await handleRequestPermission();
      return;
    }

    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.75 });

      if (photo?.uri) {
        setCapturedUri(photo.uri);
      }

      setCaptured(true);
      setShowTutorial(false);
    } catch (error) {
      setCameraError(error instanceof Error ? error.message : 'Unable to capture photo.');
    }
  };

  return (
    <View style={[styles.cameraScreen, { backgroundColor: t.color.background.neutral.default }]}>
      <View style={[styles.phoneSurface, Platform.OS === 'web' ? styles.webPhoneSurface : undefined]}>
        <CaptureHeader doneDisabled={!captured} onBack={onBack} onDone={onDone} />
        <View style={styles.cameraBody}>
          <CameraStage
            cameraRef={cameraRef}
            capturedUri={capturedUri}
            height={stageHeight}
            mountError={cameraError}
            onMountError={setCameraError}
            onRequestPermission={handleRequestPermission}
            permissionCanAskAgain={permissionCanAskAgain}
            permissionGranted={permissionGranted}
            showTutorial={showTutorial && permissionGranted && !capturedUri}
            width={stageWidth}
          />
          <CameraCaptureButton onPress={handleCapture} />
        </View>
        <View style={styles.cameraFooter}>
          <Pressable
            accessibilityLabel="Capture info"
            accessibilityRole="button"
            style={[styles.infoButton, { backgroundColor: t.color.fill.neutral.default }]}
          >
            <Icon color="neutral.primary" name="information-outline" size="lg" />
          </Pressable>
          <Avatar size="md" source={selectedUser?.image ?? USERS[0].image} />
        </View>
      </View>
    </View>
  );
}

export function CaptureCameraScreen(props: {
  onBack: () => void;
  onDone: () => void;
  selectedUser?: CaptureUser;
}) {
  return (
    <ThemeProvider mode="dark">
      <CameraScreenContent {...props} />
    </ThemeProvider>
  );
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
    justifyContent: 'flex-end',
    marginTop: 'auto',
    paddingBottom: theme.space['800'],
    paddingHorizontal: theme.layout.marginX
  },
  infoButton: {
    alignItems: 'center',
    borderRadius: theme.radius.full,
    height: theme.size['1200'],
    justifyContent: 'center',
    width: theme.size['1200']
  }
});
