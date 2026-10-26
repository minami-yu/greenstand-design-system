import { useMemo, useState } from 'react';
import { PrototypeScreenFrame } from '../components/PrototypeScreenFrame';
import { TreeDetailContent } from './TreeDetailContent';
import {
  Image,
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
  uploaded?: boolean;
  onUpload?: () => void;
};

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
      <TreeTag size="lg" accessibilityLabel="Verified tree" />
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

export function UploadQueue({ uploaded = false, onUpload }: { uploaded?: boolean; onUpload?: () => void }) {
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
        onPress={onUpload}
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

export function HomeScreen({ bottomInset = 0, uploaded, onUpload }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  return <PrototypeScreenFrame>
    <AppHeader />
    <ScrollView contentContainerStyle={{ paddingBottom: bottomInset + insets.bottom }} showsVerticalScrollIndicator={false}>
      <HeroArea />
      <UploadQueue uploaded={uploaded} onUpload={onUpload} />
    </ScrollView>
  </PrototypeScreenFrame>;
}

const styles = StyleSheet.create({
  queueSheet: { gap: theme.space['1200'] },
  queueDetails: { gap: theme.space['600'] },
  queueGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space['200'] },
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
  }
});
