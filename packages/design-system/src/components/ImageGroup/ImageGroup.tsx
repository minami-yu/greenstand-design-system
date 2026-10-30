import { Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { getShadow } from '../../theme/getShadow';

export type ImageGroupProps = { images: readonly ImageSourcePropType[] };

/** Up to three overlapping previews, followed by the remaining image count. */
export function ImageGroup({ images }: ImageGroupProps) {
  const t = useTheme();
  const visible = images.slice(0, 3);
  return <View accessible accessibilityLabel={`${images.length} saved ${images.length === 1 ? 'photo' : 'photos'}`} style={styles.root}>
    <View style={styles.stack}>{visible.map((source, index) => <View key={index} style={[styles.tile, getShadow(t.elevation.sm), { borderColor: t.color.border.neutral.subtle, zIndex: visible.length - index }, index < visible.length - 1 && styles.overlap]}>
      <Image accessible={false} source={source} resizeMode="cover" style={styles.image} />
    </View>)}</View>
    {images.length > visible.length && <Text style={[t.typography.labelM, { color: t.color.text.neutral.primary }]}>+{images.length - visible.length}</Text>}
  </View>;
}
const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', gap: theme.space['200'] },
  stack: { flexDirection: 'row' },
  tile: { width: theme.size['1200'], height: theme.size['1200'], borderRadius: theme.radius.sm, borderWidth: theme.border.sm, overflow: 'hidden' },
  overlap: { marginRight: theme.space.n800 },
  image: { width: '100%', height: '100%' }
});
