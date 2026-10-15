import { useMemo, useState } from 'react';
import { TreeDetailContent } from './TreeDetailContent';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  BottomSheetModal,
  Icon,
  TopNavigation,
  theme,
  useTheme,
  type IconName
} from '@greenstand/design-system';

const treeTag = require('../../assets/home/tree-tag.png');
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
  bottomInset?: number;
};

function AndroidStatusHeader() {
  const t = useTheme();

  return (
    <View style={[styles.androidStatusHeader, { backgroundColor: t.color.background.neutral.default }]}>
      <Text style={[styles.androidTime, { color: t.color.icon.neutral.primary }]}>
        9:30
      </Text>
      <View style={[styles.androidCamera, { backgroundColor: t.color.icon.neutral.primary }]} />
      <View style={styles.androidStatusIcons}>
        <View style={styles.signalBars}>
          <View style={[styles.signalBar, styles.signalBarSmall, { backgroundColor: t.color.icon.neutral.primary }]} />
          <View style={[styles.signalBar, styles.signalBarMedium, { backgroundColor: t.color.icon.neutral.primary }]} />
          <View style={[styles.signalBar, styles.signalBarLarge, { backgroundColor: t.color.icon.neutral.primary }]} />
        </View>
        <View style={[styles.wifiShape, { backgroundColor: t.color.icon.neutral.primary }]} />
        <View style={[styles.batteryShape, { borderColor: t.color.icon.neutral.primary }]}>
          <View style={[styles.batteryFill, { backgroundColor: t.color.icon.neutral.primary }]} />
        </View>
      </View>
    </View>
  );
}

function AppHeader() {
  return (
    <TopNavigation
      leftVariant={{
        type: 'logo',
        logoVariant: 'default',
        accessibilityLabel: 'Greenstand'
      }}
      rightVariant={{
        type: 'notification',
        accessibilityLabel: 'Notifications',
        badgeValue: '3'
      }}
    />
  );
}

function StatLabel({ icon, label }: { icon: IconName; label: string }) {
  const t = useTheme();

  return (
    <View style={styles.statLabel}>
      <Icon color="neutral.primary" name={icon} size="sm" />
      <Text style={[t.typography.labelMStrong, { color: t.color.text.neutral.primary }]}>
        {label}
      </Text>
    </View>
  );
}

function HeroArea() {
  const t = useTheme();

  return (
    <View style={[styles.hero, { backgroundColor: t.color.fill.brand.subtle }]}>
      <View style={styles.heroCopy}>
        <StatLabel icon="check-circle-outline" label="Verified trees" />
        <Text style={[t.typography.numericL, styles.heroNumber, { color: t.color.text.neutral.primary }]}>
          153
        </Text>
      </View>
      <Image source={treeTag} style={styles.treeTag} />
    </View>
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
      <Image source={image} style={styles.imageTileImage} />
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

function UploadQueue() {
  const [uploaded, setUploaded] = useState(false);
  const [queueVisible, setQueueVisible] = useState(false);
  const [selectedTree, setSelectedTree] = useState<number | null>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const t = useTheme();
  const visibleImages = useMemo(() => UPLOAD_IMAGES.slice(0, 5), []);

  return (
    <View style={[styles.uploadQueue, { backgroundColor: t.color.fill.neutral.surface }]}>
      <View style={styles.uploadHeader}>
        <StatLabel icon="progress-upload" label={uploaded ? 'Uploaded' : 'Waiting to upload'} />
        <View style={styles.uploadMetric}>
          <Text style={[t.typography.numericM, { color: t.color.text.neutral.primary }]}>
            {uploaded ? 0 : 12}
          </Text>
          <Text style={[t.typography.labelM, styles.uploadSize, { color: t.color.text.neutral.primary }]}>
            {uploaded ? '(0 MB)' : '(20.1 MB)'}
          </Text>
        </View>
      </View>

      <View style={styles.imageStrip}>
        {visibleImages.map((image, index) => (
          <ImageTile
            image={image}
            key={index}
            overflowCount={index === visibleImages.length - 1 ? 7 : undefined}
            onPress={!uploaded ? () => { setSelectedTree(index === visibleImages.length - 1 ? null : index); setQueueVisible(true); } : undefined}
          />
        ))}
      </View>

      <Button
        accessibilityLabel={uploaded ? 'Upload complete' : 'Upload pending trees'}
        disabled={uploaded}
        label={uploaded ? 'Uploaded' : 'Upload'}
        leadingIcon="cloud-upload-outline"
        onPress={() => setUploaded(true)}
        style={styles.uploadButton}
        variant="accent"
      />
      <BottomSheetModal visible={queueVisible} onClose={() => setQueueVisible(false)}
        showCloseButton={selectedTree !== null} showTitle={false}>
        {selectedTree !== null ? <TreeDetailContent key={selectedTree} source={QUEUED_IMAGES[selectedTree]} index={selectedTree} /> : <View style={styles.queueSheet}>
          <View style={styles.queueDetails}>
            <Text accessibilityRole="header" style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>
              Waiting to upload ({uploaded ? 0 : QUEUED_IMAGES.length})
            </Text>
            <View style={styles.queueGrid} onLayout={event => setGridWidth(event.nativeEvent.layout.width)}>
              {!uploaded && QUEUED_IMAGES.map((source, index) => (
                <Pressable key={index} accessibilityRole="button" accessibilityLabel={`View tree ${52 + index} details`}
                  onPress={() => setSelectedTree(index)}
                  style={{ width: gridWidth ? (gridWidth - theme.space['200'] * 4) / 5 : '17%', aspectRatio: 1 }}>
                  <Image source={source} style={{ width: '100%', height: '100%', borderRadius: theme.radius.sm }} />
                </Pressable>
              ))}
            </View>
          </View>
          <Button label="Close" leadingIcon="close" variant="secondary" onPress={() => setQueueVisible(false)} />
        </View>}
      </BottomSheetModal>
    </View>
  );
}

export function HomeScreen({ bottomInset = 0 }: HomeScreenProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const showPrototypeStatusHeader = Platform.OS === 'web';

  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: t.color.background.neutral.default }
      ]}
    >
      <View
        style={[
          styles.phoneSurface,
          showPrototypeStatusHeader ? styles.webPhoneSurface : undefined,
          { paddingTop: showPrototypeStatusHeader ? 0 : insets.top }
        ]}
      >
        {showPrototypeStatusHeader ? <AndroidStatusHeader /> : null}
        <AppHeader />
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: bottomInset + insets.bottom }
          ]}
          showsVerticalScrollIndicator={false}
        >
          <HeroArea />
          <UploadQueue />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  queueSheet: { gap: theme.space['1200'] },
  queueDetails: { gap: theme.space['600'] },
  queueGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space['200'] },
  safeArea: {
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
  scrollContent: {},
  hero: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.space['400'],
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.marginX,
    paddingVertical: theme.space['600']
  },
  heroCopy: {
    flex: 1,
    gap: theme.space['200']
  },
  heroNumber: {
    textAlign: 'left'
  },
  treeTag: {
    height: theme.size['1200'],
    width: theme.size['1200']
  },
  statLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['100']
  },
  uploadQueue: {
    gap: theme.space['400'],
    paddingHorizontal: theme.layout.marginX,
    paddingVertical: theme.space['600']
  },
  uploadHeader: {
    gap: theme.space['200']
  },
  uploadMetric: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.space['200']
  },
  uploadSize: {
    paddingBottom: theme.space['100']
  },
  imageStrip: {
    flexDirection: 'row',
    gap: theme.space['200'],
    justifyContent: 'space-between'
  },
  imageTile: {
    borderRadius: theme.radius.sm,
    height: 59,
    overflow: 'hidden',
    width: 59
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
  },
  androidStatusHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: theme.size['1000'],
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.marginX,
    position: 'relative',
    width: '100%'
  },
  androidTime: {
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 20
  },
  androidCamera: {
    borderRadius: theme.radius.full,
    height: theme.icon.lg,
    left: '50%',
    marginLeft: theme.space.n300,
    position: 'absolute',
    top: theme.space['200'],
    width: theme.icon.lg
  },
  androidStatusIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['100']
  },
  signalBars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.space['050'],
    height: theme.space['200']
  },
  signalBar: {
    borderRadius: theme.radius.full,
    width: theme.space['050']
  },
  signalBarSmall: {
    height: theme.space['100']
  },
  signalBarMedium: {
    height: theme.space['150']
  },
  signalBarLarge: {
    height: theme.space['200']
  },
  wifiShape: {
    borderRadius: theme.radius.full,
    height: theme.space['100'],
    width: theme.space['100']
  },
  batteryShape: {
    borderRadius: theme.radius.sm,
    borderWidth: theme.border.sm,
    height: theme.space['200'],
    padding: theme.space['050'],
    width: theme.space['400']
  },
  batteryFill: {
    borderRadius: theme.radius.sm,
    flex: 1,
    width: '70%'
  }
});
