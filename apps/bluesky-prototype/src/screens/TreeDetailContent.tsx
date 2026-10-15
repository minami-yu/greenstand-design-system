import type { ReactNode } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { Avatar, Icon, theme, useTheme } from '@greenstand/design-system';

export function TreeDetailContent({ source, index }: { source: ImageSourcePropType; index: number }) {
  const t = useTheme();
  const text = { color: t.color.text.neutral.primary };
  const heading = (label: string) => <Text accessibilityRole="header" style={[t.typography.headingS, text]}>{label}</Text>;
  return (
    <View style={styles.content}>
      <Text accessibilityRole="header" style={[t.typography.headingM, text]}>Tree #{52 + index}</Text>
      <View style={styles.photo}>
        <Image source={source} accessibilityLabel={`Tree ${52 + index}`} style={styles.fillImage} resizeMode="cover" />
      </View>
      <View style={styles.sections}>
        <View>
          {heading('Overview')}
          <DetailRow label="Planted on"><Text style={[t.typography.paragraphM, text]}>January 18, 2026</Text></DetailRow>
          <DetailRow label="Planter">
            <Avatar size="xs" source={require('../../assets/capture/user-oluwatobiloba.png')} />
            <Text style={[styles.name, t.typography.paragraphM, text]}>Oluwatobiloba Adeyemi</Text>
          </DetailRow>
          <DetailRow label="Organization" last>
            <Avatar size="xs" source={require('../../assets/capture/org-kilimanjaro.png')} />
            <Text style={[styles.name, t.typography.paragraphM, text]}>Kilimanjalo project</Text>
          </DetailRow>
        </View>
        <View style={styles.section}>
          {heading('Location')}
          <Text style={[t.typography.labelMStrong, text]}>Iringa, Tanzania</Text>
          <Text style={[t.typography.paragraphS, { color: t.color.text.neutral.secondary }]}>Latitude -3.30877, Longitude 36.55933</Text>
          <View style={styles.map}>
            <Image source={require('../../assets/home/tree-location-map.png')} style={styles.fillImage} resizeMode="cover" accessibilityLabel="Tree location map" />
            <Image source={require('../../assets/home/tree-tag.png')} style={styles.marker} />
            <Pressable accessibilityRole="link" accessibilityLabel="Open tree location in maps"
              onPress={() => void Linking.openURL('https://www.openstreetmap.org/?mlat=-3.30877&mlon=36.55933#map=15/-3.30877/36.55933')}
              style={[styles.expand, { backgroundColor: t.color.fill.neutral.surface }]}>
              <Icon name="arrow-expand" size="sm" />
            </Pressable>
          </View>
        </View>
        <View style={styles.section}>
          {heading('Verification')}
          <View style={styles.inline}><Text style={[t.typography.labelMStrong, text]}>Verified</Text><Icon name="check-circle-outline" size="md" /></View>
          <Text style={[t.typography.paragraphS, { color: t.color.text.neutral.secondary }]}>Reviewed on January 18, 9:35 AM by Greenstand</Text>
        </View>
        <View>
          {heading('Plant Data')}
          <DetailRow label="Species"><Text style={[t.typography.paragraphM, text]}>Mvule</Text></DetailRow>
          <DetailRow label="Age" last><Text style={[t.typography.paragraphM, text]}>3 months</Text></DetailRow>
        </View>
      </View>
    </View>
  );
}

function DetailRow({ label, children, last = false }: { label: string; children: ReactNode; last?: boolean }) {
  const t = useTheme();
  return <View style={[styles.row, { borderBottomWidth: last ? 0 : theme.border.sm, borderColor: t.color.border.neutral.subtle }]}>
    <Text style={[styles.rowLabel, t.typography.labelM, { color: t.color.text.neutral.primary }]}>{label}</Text>
    <View style={styles.rowValue}>{children}</View>
  </View>;
}

const styles = StyleSheet.create({
  content: { gap: theme.space['400'] },
  sections: { gap: theme.space['600'] },
  section: { gap: theme.space['200'] },
  photo: { width: '100%', aspectRatio: 1, borderRadius: theme.radius.md, overflow: 'hidden' },
  fillImage: { position: 'absolute', width: '100%', height: '100%' },
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space['200'], paddingVertical: theme.space['200'], minHeight: theme.size['1000'] },
  rowLabel: { flex: 1 },
  rowValue: { flex: 2, flexDirection: 'row', alignItems: 'center', gap: theme.space['200'], minWidth: 0 },
  name: { flex: 1 },
  inline: { flexDirection: 'row', alignItems: 'center', gap: theme.space['100'] },
  map: { width: '100%', aspectRatio: 1.64, borderRadius: theme.radius.md, overflow: 'hidden' },
  marker: { width: theme.size['600'], height: theme.size['600'], position: 'absolute', left: '58%', top: '37%' },
  expand: { position: 'absolute', bottom: theme.space['300'], right: theme.space['300'], width: theme.size['1100'], height: theme.size['1100'], borderRadius: theme.radius.full, alignItems: 'center', justifyContent: 'center' }
});
