import { useEffect, useMemo, useRef, useState, type ComponentRef } from 'react';
import { NotificationsSheet } from '../components/NotificationsSheet';
import { PrototypeScreenFrame } from '../components/PrototypeScreenFrame';
import type { OnboardingAnchor } from '../components/onboarding/HomeOnboarding';
import { TreeDetailScreen } from './TreeDetailScreen';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type ImageStyle,
  type ImageSourcePropType
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Banner,
  Card,
  Button,
  ProgressBar,
  BottomSheetModal,
  Icon,
  TreeTag,
  TopNavigation,
  theme,
  useTheme,
  type IconName
} from '@greenstand/design-system';

const treeImage1 = require('../../assets/home/raw_image_1.png');
const treeImage2 = require('../../assets/home/raw_image_8.png');
const treeImage3 = require('../../assets/home/raw_image_5.jpeg');
const treeImage4 = require('../../assets/home/raw_image_7.jpeg');
const treeImage5 = require('../../assets/home/raw_image_10.png');

const UPLOAD_IMAGES: ImageSourcePropType[] = [
  treeImage1,
  treeImage2,
  treeImage3,
  treeImage4,
  treeImage5
];

// Preserve the Figma image-fill crops for the existing photo assets.
const PHOTO_CROPS: ImageStyle[] = [
  { width: '102.78%', height: '137.66%', left: '-2.78%', top: '-11.44%' },
  { width: '168.78%', height: '168.78%', left: '-40.4%', top: '-38.24%' },
  { width: '100.69%', height: '150.77%', left: '-0.75%', top: '-36.44%' },
  { width: '100%', height: '150%', left: '0.02%', top: '-35.17%' },
  { width: '150.4%', height: '99.98%', left: '-20.06%', top: '0%' }
];

const QUEUED_IMAGES = [
  ...UPLOAD_IMAGES,
  require('../../assets/home/raw_image_2.png'),
  require('../../assets/home/raw_image_9.png'),
  require('../../assets/home/raw_image_6.jpeg'),
  require('../../assets/home/raw_image_4.png'),
  require('../../assets/home/raw_image_3.jpeg'),
  treeImage2,
  treeImage4
];

type HomeScreenProps = {
  offline?: boolean;
  emptyQueue?: boolean;
  onboarding?: boolean;
  onUploadAnchor?: (anchor: OnboardingAnchor) => void;
  bottomInset?: number;
  uploaded?: boolean;
  onUpload?: () => void;
  onStopUpload?: () => void;
  uploadProgress?: number;
  uploading?: boolean;
};

function AppHeader({ onNotifications }: { onNotifications: () => void }) {
  return (
    <TopNavigation
      leftVariant={{
        type: 'logo',
        logoVariant: 'default',
        accessibilityLabel: 'Greenstand'
      }}
      rightVariant={{
        type: 'notification',
        accessibilityLabel: 'Notifications, 3 unread',
        onPress: onNotifications,
        badgeValue: '3'
      }}
    />
  );
}

function StatLabel({ icon, label, subtle = false }: { icon: IconName; label: string; subtle?: boolean }) {
  const t = useTheme();

  return (
    <View style={styles.statLabel}>
      <Icon color={subtle ? "neutral.secondary" : "neutral.primary"} name={icon} size="sm" />
      <Text style={[t.typography.labelM, { color: subtle ? t.color.text.neutral.secondary : t.color.text.neutral.primary }]}>
        {label}
      </Text>
    </View>
  );
}

function HeroArea() {
  const t = useTheme();

  return (
    <Card>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={[t.typography.numericL, styles.heroNumber, { color: t.color.text.neutral.primary }]}>
            153
          </Text>
          <StatLabel icon="check-circle-outline" label="Verified trees" subtle />
        </View>
        <View style={styles.treeArtwork}>
          <TreeTag size="lg" style={styles.treeScale} />
        </View>
      </View>
    </Card>
  );
}

function ImageTile({
  image,
  overflowCount,
  onPress
}: {
  image: ImageSourcePropType;
  overflowCount?: number;
  onPress?: () => void;
}) {
  const t = useTheme();

  return (
    <Pressable style={styles.imageTile} onPress={onPress} disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? (overflowCount ? 'View all 12 photos waiting to upload' : 'View tree details') : undefined}>
      <Image source={image} resizeMode="stretch" style={[styles.imageTileImage, PHOTO_CROPS[UPLOAD_IMAGES.indexOf(image)]]} />
      {overflowCount ? (
        <View style={[styles.imageOverlay, { backgroundColor: t.color.background.neutral.overlay }]}>
          <Text style={[t.typography.numericS, { color: t.color.text.neutral.inverse }]}>
            +{overflowCount}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function UploadQueue({ offline = false, emptyQueue = false, uploaded = false, onUpload, onStopUpload, uploadProgress = 0, uploading = false, onUploadAnchor }: HomeScreenProps) {
  const uploadButtonRef = useRef<ComponentRef<typeof View>>(null);
  const viewport = useWindowDimensions();
  useEffect(() => {
    const frame = requestAnimationFrame(() => uploadButtonRef.current?.measureInWindow((x, y, width, height) => onUploadAnchor?.({ x, y, width, height })));
    return () => cancelAnimationFrame(frame);
  }, [viewport.width, viewport.height, onUploadAnchor]);
  const [queueVisible, setQueueVisible] = useState(false);
  const [selectedTree, setSelectedTree] = useState<number | null>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const t = useTheme();
  const progress = Number.isFinite(uploadProgress) ? Math.max(0, Math.min(1, uploadProgress)) : 0;
  const uploadedCount = Math.floor(progress * 12);
  const remainingCount = uploaded || emptyQueue ? 0 : 12 - uploadedCount;
  const visibleImages = useMemo(() => QUEUED_IMAGES.slice(uploadedCount, uploadedCount + 5), [uploadedCount]);

  if (uploading && !offline) return <Card style={styles.uploadQueue}>
    <View style={styles.uploadHeader}>
      <StatLabel icon="progress-upload" label="Uploading" />
      <View style={styles.progressDetails}>
        <Text style={[t.typography.labelM, { color: t.color.text.neutral.secondary }]}>{uploadedCount} of 12 photos uploaded</Text>
        <ProgressBar accessibilityLabel="Photo upload progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress * 100} aria-valuetext={`${uploadedCount} of 12 photos uploaded`} value={progress * 100} accessibilityValue={{ text: `${uploadedCount} of 12 photos uploaded` }} />
      </View>
    </View>
    <View style={styles.actionArea}><Button label="Stop" leadingIcon="close" variant="secondary" onPress={onStopUpload} style={styles.stopButton} /></View>
  </Card>;

  return (
    <Card style={styles.uploadQueue}>
      <View style={styles.uploadHeader}>
        <StatLabel icon={remainingCount === 0 ? "check-circle-outline" : "progress-upload"} label={remainingCount === 0 ? "All photo uploaded" : "Waiting to upload"} />
        <View style={styles.uploadMetric}>
          <Text style={[t.typography.numericM, { color: t.color.text.neutral.primary }]}>
            {uploaded ? 0 : remainingCount}
          </Text>
          {!uploaded && !emptyQueue && <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>
            {(20.1 * remainingCount / 12).toFixed(1)} MB
          </Text>}
        </View>
      </View>

      {!uploaded && !emptyQueue && <View style={styles.imageStrip}>
        {visibleImages.map((image, index) => (
          <ImageTile
            image={image}
            key={index}
            overflowCount={index === visibleImages.length - 1 && remainingCount > 5 ? remainingCount - 5 : undefined}
            onPress={!uploaded ? () => { setSelectedTree(index === visibleImages.length - 1 ? null : index + uploadedCount); setQueueVisible(true); } : undefined}
          />
        ))}
      </View>}

      <View style={styles.actionArea}>
        <View ref={uploadButtonRef} onLayout={() => uploadButtonRef.current?.measureInWindow((x, y, width, height) => onUploadAnchor?.({ x, y, width, height }))}>
          <Button
            accessibilityLabel={offline ? 'Upload unavailable while offline' : emptyQueue ? 'Upload, no photos waiting' : remainingCount === 0 ? 'Upload complete' : 'Upload pending trees'}
            disabled={offline || remainingCount === 0}
            label="Upload"
            leadingIcon="cloud-upload-outline"
            onPress={onUpload}
            style={styles.uploadButton}
            variant="accent"
          />
        </View>
      </View>
      {offline && <Banner tone="neutral" title="You are offline" message="Try uploading when you are online." showTrailingIcon={false} style={styles.offlineBanner} />}
      {selectedTree !== null && <TreeDetailScreen visible={queueVisible} onBack={() => setSelectedTree(null)} source={QUEUED_IMAGES[selectedTree]} index={selectedTree} />}
      <BottomSheetModal visible={queueVisible && selectedTree === null} onClose={() => setQueueVisible(false)}
        showCloseButton={false} showTitle={false}>
        <View style={styles.queueSheet}>
          <View style={styles.queueDetails}>
            <Text accessibilityRole="header" style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>
              Waiting to upload ({uploaded ? 0 : remainingCount})
            </Text>
            <View style={styles.queueGrid} onLayout={event => setGridWidth(event.nativeEvent.layout.width)}>
              {!uploaded && !emptyQueue && QUEUED_IMAGES.slice(uploadedCount).map((source, offset) => (
                <Pressable key={offset} accessibilityRole="button" accessibilityLabel={`View tree ${52 + uploadedCount + offset} details`}
                  onPress={() => setSelectedTree(uploadedCount + offset)}
                  style={{ width: gridWidth ? (gridWidth - theme.space['200'] * 4) / 5 : '17%', aspectRatio: 1 }}>
                  <Image source={source} style={{ width: '100%', height: '100%', borderRadius: theme.radius.sm }} />
                </Pressable>
              ))}
            </View>
          </View>
          <Button label="Close" leadingIcon="close" variant="secondary" onPress={() => setQueueVisible(false)} />
        </View>
      </BottomSheetModal>
    </Card>
  );
}

export function HomeScreen({ bottomInset = 0, ...uploadProps }: HomeScreenProps) {
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const t = useTheme();
  return <PrototypeScreenFrame>
    <AppHeader onNotifications={() => setNotificationsVisible(true)} />
    <ScrollView style={{ backgroundColor: t.color.background.neutral.base }} contentContainerStyle={[styles.content, { paddingBottom: bottomInset + insets.bottom + theme.space['500'] }]} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text accessibilityRole="header" style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>Your Impact</Text>
        <HeroArea />
      </View>
      <View style={styles.section}>
        <Text accessibilityRole="header" style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>Upload</Text>
        <UploadQueue {...uploadProps} />
      </View>
    </ScrollView>
    <NotificationsSheet visible={notificationsVisible} onClose={() => setNotificationsVisible(false)} />
  </PrototypeScreenFrame>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['500'], gap: theme.space['800'] },
  section: { gap: theme.space['300'] },
  actionArea: { paddingTop: theme.space['400'], paddingBottom: theme.space['200'] },
  offlineBanner: { marginTop: theme.space['200'] },
  treeArtwork: { width: theme.size['1600'], height: theme.size['1600'], alignItems: 'center', justifyContent: 'center' },
  treeScale: { transform: [{ scale: theme.size['1600'] / theme.size['1200'] }] },
  progressDetails: { gap: theme.space['300'] },
  stopButton: { alignSelf: 'flex-start' },
  queueSheet: { gap: theme.space['1200'] },
  queueDetails: { gap: theme.space['600'] },
  queueGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space['200'] },
  hero: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['400'],
    justifyContent: 'space-between'
  },
  heroCopy: {
    flex: 1,
    gap: theme.space['050']
  },
  heroNumber: {
    textAlign: 'left'
  },
  statLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['100']
  },
  uploadQueue: {
    gap: theme.space['200']
  },
  uploadHeader: {
    gap: theme.space['200']
  },
  uploadMetric: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['200']
  },
  imageStrip: {
    flexDirection: 'row',
    gap: theme.space['200'],
    justifyContent: 'space-between'
  },
  imageTile: {
    borderRadius: theme.radius.sm,
    aspectRatio: 1,
    flex: 1,
    minWidth: theme.size['1100'],
    overflow: 'hidden'
  },
  imageTileImage: {
    height: '100%',
    width: '100%'
  },
  imageOverlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  uploadButton: {
    alignSelf: 'stretch',
    width: '100%'
  }
});
