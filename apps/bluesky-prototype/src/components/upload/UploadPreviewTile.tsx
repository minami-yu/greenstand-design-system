import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { theme, useTheme } from '@greenstand/design-system';
import { PHOTO_CROPS, UPLOAD_IMAGES, QUEUE_THUMBNAILS } from './uploadQueuePhotos';

export function UploadPreviewTile({
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
      <Image source={QUEUE_THUMBNAILS.get(image) ?? image} resizeMode={PHOTO_CROPS[UPLOAD_IMAGES.indexOf(image)] ? 'stretch' : 'cover'} style={[styles.imageTileImage, PHOTO_CROPS[UPLOAD_IMAGES.indexOf(image)]]} />
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

const styles = StyleSheet.create({
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
});
