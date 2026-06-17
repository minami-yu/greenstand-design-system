import { Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { CatalogThemeProvider } from '../../ui/CatalogThemeProvider';
import {
  StorybookTable,
  StorybookTableCell,
  StorybookTableRow,
  storybookRnTypography,
  type StorybookTableColumn
} from '../../ui';
import type { ViewportCatalogEntry } from '../../utils/buildCatalogEntries';

type ViewportCatalogProps = {
  entries: ViewportCatalogEntry[];
};

const viewportColumnFlex = {
  name: 28,
  width: 12,
  description: 60
} as const;

const viewportTableColumns = [
  { label: 'Viewport', flex: viewportColumnFlex.name },
  { label: 'Width', flex: viewportColumnFlex.width },
  { label: 'Purpose', flex: viewportColumnFlex.description }
] satisfies StorybookTableColumn[];

export function ViewportCatalog({ entries }: ViewportCatalogProps) {
  return (
    <CatalogThemeProvider>
      <ViewportCatalogView entries={entries} />
    </CatalogThemeProvider>
  );
}

function ViewportCatalogView({ entries }: ViewportCatalogProps) {
  const t = useTheme();

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      <StorybookTable columns={viewportTableColumns}>
        {entries.map((entry) => (
          <StorybookTableRow key={entry.name} style={{ alignItems: 'center' }}>
            <StorybookTableCell flex={viewportColumnFlex.name}>
              <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.primary }]}>
                {entry.name}
              </Text>
            </StorybookTableCell>
            <StorybookTableCell flex={viewportColumnFlex.width}>
              <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.primary }]}>
                {entry.width}
              </Text>
            </StorybookTableCell>
            <StorybookTableCell flex={viewportColumnFlex.description}>
              <Text style={[storybookRnTypography.paragraphS, { color: t.color.text.neutral.primary }]}>
                {entry.description}
              </Text>
            </StorybookTableCell>
          </StorybookTableRow>
        ))}
      </StorybookTable>
    </View>
  );
}
