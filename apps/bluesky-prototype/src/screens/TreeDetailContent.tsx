import { Image, Linking, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { Avatar, DetailRow, Icon, IconButton, SimpleTreeTag, theme, useTheme } from '@greenstand/design-system';

export type TreeDetailContentProps = { source: ImageSourcePropType; index: number; status?: 'verified' | 'waiting-to-upload' };

export function TreeDetailContent({ source, index, status = 'verified' }: TreeDetailContentProps) {
  const t = useTheme();
  const waitingToUpload = status === 'waiting-to-upload';
  const text = { color: t.color.text.neutral.primary };
  const caption = { color: t.color.text.neutral.tertiary };
  const heading = (label: string) => <Text accessibilityRole="header" style={[t.typography.headingS, text]}>{label}</Text>;
  return <View style={styles.content}>
    <Text accessibilityRole="header" style={[t.typography.headingM, text]}>Tree #{52 + index}</Text>
    <View style={styles.photo}>
      <Image source={source} accessibilityLabel={`Tree ${52 + index}`} style={styles.fillImage} resizeMode="cover" />
    </View>
    <View style={styles.sections}>
      <View style={styles.section}>
        {heading('Overview')}
        <View>
          <DetailRow label="Planted date"><Text style={[t.typography.paragraphM, text, styles.valueText]}>January 18, 2026</Text></DetailRow>
          <DetailRow label="Planter">
            <View style={styles.identity}>
              <View style={[styles.avatar, { borderColor: t.color.border.neutral.subtle }]}>
                <Image source={require('../../assets/capture/user-oluwatobiloba.png')} style={styles.planterCrop} accessible={false} />
              </View>
              <Text style={[styles.name, t.typography.paragraphM, text]}>Oluwatobiloba Adeyemi</Text>
            </View>
          </DetailRow>
          <DetailRow label="Organization" showDivider={false}>
            <View style={styles.identity}>
              <Avatar size="xs" source={require('../../assets/capture/org-kilimanjaro.png')} />
              <Text style={[styles.name, t.typography.paragraphM, text]}>Kilimanjalo project</Text>
            </View>
          </DetailRow>
        </View>
      </View>
      <View style={[styles.section, styles.sectionBottom]}>
        {heading('Verification')}
        <View style={styles.captionGroup}>
          <View style={styles.inline}><Text style={[t.typography.paragraphM, text]}>{waitingToUpload ? 'Waiting to upload' : 'Verified'}</Text><Icon name={waitingToUpload ? 'progress-upload' : 'check-circle'} size="md" color={waitingToUpload ? t.color.icon.neutral.secondary : t.color.icon.brand.default} /></View>
          <Text style={[t.typography.paragraphS, caption]}>{waitingToUpload ? 'Not uploaded yet.' : 'Reviewed on Jan 18, 2026 by Greenstand'}</Text>
        </View>
      </View>
      <View style={styles.section}>
        {heading('Location')}
        <View style={[styles.section, styles.sectionBottom]}>
          <View style={styles.captionGroup}>
            <Text style={[t.typography.paragraphM, text]}>Iringa, Tanzania</Text>
            <Text style={[t.typography.paragraphS, caption]}>Latitude -3.30877, Longitude 36.55933</Text>
          </View>
          <View style={styles.map}>
            <Image source={require('../../assets/tree-detail/location-map.png')} style={styles.fillImage} resizeMode="stretch" accessibilityLabel="Tree location map" />
            <SimpleTreeTag type="focus" accessibilityLabel="Tree location" style={styles.marker} />
            <IconButton icon="arrow-expand" size="sm" variant="surface" accessibilityLabel="Open tree location in maps"
              onPress={() => void Linking.openURL('https://www.openstreetmap.org/?mlat=-3.30877&mlon=36.55933#map=15/-3.30877/36.55933')}
              style={styles.expand} />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        {heading('Plant Data')}
        <View><DetailRow label="Species">Mvule</DetailRow><DetailRow label="Age">3 months</DetailRow></View>
      </View>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  content: { gap: theme.space['400'] },
  sections: { gap: theme.space['600'] },
  section: { gap: theme.space['200'] },
  sectionBottom: { paddingBottom: theme.space['200'] },
  captionGroup: { gap: theme.space['100'] },
  photo: { width: '100%', aspectRatio: 1, borderRadius: theme.radius.md, overflow: 'hidden' },
  fillImage: { position: 'absolute', width: '100%', height: '100%' },
  identity: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: theme.space['200'], maxWidth: '100%' },
  avatar: { width: theme.size['600'], height: theme.size['600'], flexShrink: 0, borderRadius: theme.radius.full, borderWidth: theme.border.sm, overflow: 'hidden' },
  // Figma image-fill crop; percentages describe the asset, not design-token dimensions.
  planterCrop: { position: 'absolute', width: '192.32%', height: '288.45%', left: '-29.46%', top: '-34.77%' },
  name: { flexShrink: 1, textAlign: 'right' },
  valueText: { textAlign: 'right' },
  inline: { flexDirection: 'row', alignItems: 'center', gap: theme.space['100'] },
  // Explicitly approved fixed height for this map preview.
  map: { width: '100%', height: 200, borderRadius: theme.radius.md, overflow: 'hidden', marginTop: theme.space[400] },
  marker: { position: 'absolute', left: '56.4024%', top: '31.5%' },
  expand: { position: 'absolute', bottom: theme.space['150'], right: theme.space['150'] }
});
