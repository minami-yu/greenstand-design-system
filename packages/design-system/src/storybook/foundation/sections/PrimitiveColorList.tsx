import { Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { StorybookCatalogThemeProvider } from '../../ui/StorybookCatalogThemeProvider';
import { StorybookInlineCode, storybookRnTypography } from '../../ui';
import { ColorSwatch, StorybookDocRow } from '../../ui/storybookDocRow';
import type { PrimitiveColorDocEntry } from '../../utils/buildColorDocEntries';
import { buildPrimitiveColorDocEntries } from '../../utils/buildColorDocEntries';

type PrimitiveColorListProps = {
  group?: string;
  entries?: PrimitiveColorDocEntry[];
};

export function PrimitiveColorList({ group, entries }: PrimitiveColorListProps) {
  return (
    <StorybookCatalogThemeProvider>
      <PrimitiveColorListView group={group} entries={entries} />
    </StorybookCatalogThemeProvider>
  );
}

function PrimitiveColorListView({ group, entries }: PrimitiveColorListProps) {
  const t = useTheme();
  const rows = entries ?? buildPrimitiveColorDocEntries(group);

  if (rows.length === 0) {
    return null;
  }

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      {rows.map((entry, index) => (
        <StorybookDocRow key={entry.path} showDivider={index < rows.length - 1}>
          <ColorSwatch value={entry.value} />
          <View style={{ flex: 1 }}>
            <StorybookInlineCode size="monoBodyS">{entry.usage}</StorybookInlineCode>
          </View>
          <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.secondary }]}>
            {entry.value}
          </Text>
        </StorybookDocRow>
      ))}
    </View>
  );
}
