import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, BottomSheetModal, Button, Icon, IconButton, SimpleTreeTag, Tabs, TopNavigation, theme, useTheme, type IconName } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../../components/PrototypeScreenFrame';
import { userMapPoints } from './userMapPoints';
import type { PrototypeUser } from './userData';

const tabs = [{ id: 'summary', label: 'Summary' }, { id: 'history', label: 'History' }, { id: 'profile', label: 'Profile' }];
export function UserDetailScreen({ user, onBack, onCapture }: { user: PrototypeUser; onBack: () => void; onCapture: () => void }) {
  const t = useTheme();
  const [tab, setTab] = useState('summary');
  const [expandedMap, setExpandedMap] = useState(false);
  return <PrototypeScreenFrame>
    <TopNavigation leftVariant={{ type: 'back', onPress: onBack }} />
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.profile}>
        <Avatar size="xl" source={user.image} initial={user.name} />
        <View style={styles.identity}>
          <Text accessibilityRole="header" style={[t.typography.headingS, styles.center, { color: t.color.text.neutral.primary }]}>{user.name}</Text>
          {user.deviceOwner ? <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>Device owner</Text> : null}
        </View>
      </View>
      <Tabs items={tabs} value={tab} onValueChange={setTab} />
      <View style={styles.panel}>
        {tab === 'summary' ? <>
          <View style={styles.stats}>
            <Statistic label="Verified trees" icon="check-circle-outline" value={user.verified} large />
            <View style={styles.row}>
              <Statistic label="Upload awaiting" icon="progress-upload" value={user.awaiting} />
              <Statistic label="Verification pending" icon="clock-outline" value={user.pending} />
            </View>
          </View>
          {user.verified ? <View style={styles.map} accessibilityLabel={`Map showing ${user.verified} verified trees near Kijabe Forest`}>
            <Image source={require('../../../assets/users/summary-map.png')} resizeMode="stretch" style={styles.mapImage} />
            {userMapPoints.map((point, index) => <SimpleTreeTag key={index} type="small" style={{ position: 'absolute', left: `${point.x * 100}%`, top: `${point.y * 100}%` }} />)}
            <IconButton icon="arrow-expand" accessibilityLabel="Open tree map" onPress={() => setExpandedMap(true)} style={styles.expand} />
          </View> : <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>No verified trees yet.</Text>}
          <Button label="Capture trees" leadingIcon="camera-outline" onPress={onCapture} style={styles.capture} />
        </> : tab === 'profile' ? <View style={styles.stats}>
          <Text style={[t.typography.labelMStrong, { color: t.color.text.neutral.primary }]}>Name</Text>
          <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>{user.name}</Text>
          <Text style={[t.typography.labelMStrong, { color: t.color.text.neutral.primary }]}>Organizations</Text>
          <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>{user.organizations.join('\n') || 'No organizations selected'}</Text>
        </View> : <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>Individual capture history is not available in this prototype.</Text>}
      </View>
    </ScrollView>
    <BottomSheetModal visible={expandedMap} title="Planted trees" onClose={() => setExpandedMap(false)}>
      <View style={styles.expandedMap}>
        <Image source={require('../../../assets/users/summary-map.png')} resizeMode="cover" style={styles.expandedMapImage} />
        {userMapPoints.map((point, index) => <SimpleTreeTag key={index} type="small" style={{ position: 'absolute', left: `${point.x * 100}%`, bottom: `${(1 - point.y) * 200 / (331 * 1024 / 576) * 100}%` }} />)}
      </View>
    </BottomSheetModal>
  </PrototypeScreenFrame>;
}
function Statistic({ label, icon, value, large = false }: { label: string; icon: IconName; value: number; large?: boolean }) {
  const t = useTheme();
  return <View style={styles.stat}>
    <View style={styles.statLabel}><Icon name={icon} size="sm" color="neutral.secondary" /><Text style={[t.typography.labelS, { flexShrink: 1, color: t.color.text.neutral.secondary }]}>{label}</Text></View>
    <Text style={[large ? t.typography.numericL : t.typography.numericM, { color: t.color.text.neutral.primary }]}>{value}</Text>
  </View>;
}
const styles = StyleSheet.create({
  content: { paddingBottom: theme.space['1200'], gap: theme.space['400'] },
  profile: { alignItems: 'center', gap: theme.space['300'], paddingHorizontal: theme.layout.marginX },
  identity: { gap: theme.space['100'], alignItems: 'center' },
  center: { textAlign: 'center' },
  panel: { paddingHorizontal: theme.layout.marginX, gap: theme.space['400'] },
  stats: { gap: theme.space['400'], paddingVertical: theme.space['200'] },
  row: { flexDirection: 'row', gap: theme.space['200'] },
  stat: { flex: 1 },
  statLabel: { flexDirection: 'row', gap: theme.space['100'], alignItems: 'center' },
  map: { width: '100%', aspectRatio: 331 / 200, borderRadius: theme.radius.md, overflow: 'hidden' },
  expandedMap: { width: '100%', aspectRatio: 576 / 1024, borderRadius: theme.radius.md, overflow: 'hidden' },
  expandedMapImage: { width: '100%', height: '100%' },
  mapImage: { position: 'absolute', width: '100%', height: '100%' },
  expand: { position: 'absolute', bottom: theme.space['200'], right: theme.space['200'] },
  capture: { marginTop: theme.space['400'] }
});
