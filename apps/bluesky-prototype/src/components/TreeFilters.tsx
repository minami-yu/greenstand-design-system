import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Chip, Divider, DsLink, SearchField, theme, useTheme, type IconName } from '@greenstand/design-system';

export const statusOptions = [
  { label: 'Verified', icon: 'check-circle-outline' },
  { label: 'Upload awaiting', icon: 'progress-upload' },
  { label: 'Verification pending', icon: 'clock-outline' },
  { label: 'Denied', icon: 'error-outline' }
] satisfies { label: string; icon: IconName }[];

export const planterOptions = [
  { label: 'Oluwatobiloba Adeyemi', source: require('../../assets/filters/oluwatobiloba.png') },
  { label: 'Chinecherem Okeke', source: require('../../assets/capture/user-chinecherem.png') },
  { label: 'Amara Diallo', source: require('../../assets/capture/user-amara.png') },
  { label: 'Nneka Ifeanyichukwu', source: require('../../assets/capture/user-nneka.png') }
];
export const organizationOptions = [
  { label: 'Greenstand', source: require('../../assets/capture/org-greenstand.png') },
  { label: 'Kilimanjalo project', source: require('../../assets/capture/org-kilimanjaro.png') },
  { label: 'Bondy', source: require('../../assets/filters/bondy.png') }
];

export type TreeFiltersValue = Record<'Status' | 'Planter' | 'Organization', string[]>;
export const emptyTreeFilters = (): TreeFiltersValue => ({ Status: [], Planter: [], Organization: [] });

export function matchesTreeFilters(tree: { status: string; planter: string; organization: string }, filters: TreeFiltersValue) {
  return (!filters.Status.length || filters.Status.includes(tree.status))
    && (!filters.Planter.length || filters.Planter.includes(tree.planter))
    && (!filters.Organization.length || filters.Organization.includes(tree.organization));
}

/** Product filter composition; selections are committed only by Apply. */
export function TreeFilters({ initialValue, onApply }: { initialValue: TreeFiltersValue; onApply: (value: TreeFiltersValue) => void }) {
  const t = useTheme();
  const [draft, setDraft] = useState(initialValue);
  const [showAllPlanters, setShowAllPlanters] = useState(false);
  const [planterQuery, setPlanterQuery] = useState('');
  const toggle = (category: keyof TreeFiltersValue, value: string) => setDraft(previous => ({
    ...previous,
    [category]: previous[category].includes(value) ? previous[category].filter(item => item !== value) : [...previous[category], value]
  }));
  const labelStyle = [t.typography.labelMStrong, { color: t.color.text.neutral.primary }];
  const visiblePlanters = planterOptions.filter(option => !showAllPlanters || option.label.toLowerCase().includes(planterQuery.trim().toLowerCase()));

  return <View style={styles.content}>
    <View style={styles.sections}>
      <View style={styles.section}>
        <Text accessibilityRole="header" style={labelStyle}>Status</Text>
        <View style={styles.chips}>{statusOptions.map(option => <Chip key={option.label} {...option} trailingElements="none" selected={draft.Status.includes(option.label)} onPress={() => toggle('Status', option.label)} />)}</View>
      </View>
      <Divider />
      <View style={styles.section}>
        <Text accessibilityRole="header" style={labelStyle}>Planter</Text>
        {showAllPlanters ? <SearchField accessibilityLabel="Search all planters" value={planterQuery} onChangeText={setPlanterQuery} showAudio={false} /> : null}
        <View style={styles.chips}>{visiblePlanters.map(option => <Chip key={option.label} {...option} leadingElements="avatar" trailingElements="none" selected={draft.Planter.includes(option.label)} onPress={() => toggle('Planter', option.label)} />)}</View>
        {showAllPlanters ? <Text accessibilityLiveRegion="polite" style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>{visiblePlanters.length} planters available in this prototype</Text> : null}
        <DsLink label={showAllPlanters ? 'See less' : 'See all'} size="sm" trailingIcon={showAllPlanters ? 'chevron-up' : 'chevron-down'} accessibilityRole="button" onPress={() => setShowAllPlanters(value => !value)} style={styles.seeAll} />
      </View>
      <Divider />
      <View style={styles.section}>
        <Text accessibilityRole="header" style={labelStyle}>Organization</Text>
        <View style={styles.chips}>{organizationOptions.map(option => <Chip key={option.label} {...option} leadingElements="avatar" trailingElements="none" selected={draft.Organization.includes(option.label)} onPress={() => toggle('Organization', option.label)} />)}</View>
      </View>
    </View>
    <View style={styles.actions}>
      <Button label="Reset" leadingIcon="counterclockwise-arrows" variant="tertiary" style={styles.action} onPress={() => { setDraft(emptyTreeFilters()); setPlanterQuery(''); }} />
      <Button label="Apply" leadingIcon="check" style={styles.action} onPress={() => onApply(draft)} />
    </View>
  </View>;
}

const styles = StyleSheet.create({
  content: { gap: theme.space['1600'], paddingBottom: theme.space['400'] },
  sections: { gap: theme.space['600'] },
  section: { gap: theme.space['300'] },
  chips: { flexDirection: 'row', flexWrap: 'wrap', columnGap: theme.space['200'], rowGap: theme.space['0'] },
  seeAll: { alignSelf: 'flex-end', minHeight: theme.size['1100'], minWidth: theme.size['1100'] },
  actions: { flexDirection: 'row', gap: theme.space['200'] },
  action: { flex: 1 }
});
