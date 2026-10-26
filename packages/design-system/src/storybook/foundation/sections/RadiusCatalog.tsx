import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { StorybookCatalogThemeProvider } from '../../ui/StorybookCatalogThemeProvider';
import {
  StorybookInlineCode,
  StorybookTable,
  StorybookTableCell,
  StorybookTableRow,
  storybookRnTypography,
  type StorybookTableColumn,
  type StorybookTokenCatalogEntry
} from '../../ui';

type RadiusCatalogProps = {
  entries: StorybookTokenCatalogEntry[];
};

const radiusColumnFlex = {
  preview: 14,
  tokenName: 24,
  value: 12,
  description: 50
} as const;

const radiusTableColumns = [
  { label: 'Preview', flex: radiusColumnFlex.preview },
  { label: 'Token name', flex: radiusColumnFlex.tokenName },
  { label: 'Value', flex: radiusColumnFlex.value },
  { label: 'Description', flex: radiusColumnFlex.description }
] satisfies StorybookTableColumn[];

function getRadiusValue(entry: StorybookTokenCatalogEntry) {
  return theme.radius[entry.name as keyof typeof theme.radius] ?? 0;
}

export function RadiusCatalog({ entries }: RadiusCatalogProps) {
  return (
    <StorybookCatalogThemeProvider>
      <RadiusCatalogView entries={entries} />
    </StorybookCatalogThemeProvider>
  );
}

function RadiusCatalogView({ entries }: RadiusCatalogProps) {
  const t = useTheme();
  const sortedEntries = [...entries].sort((a, b) => getRadiusValue(a) - getRadiusValue(b));

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      <StorybookTable columns={radiusTableColumns}>
        {sortedEntries.map((entry) => {
          const radius = getRadiusValue(entry);

          return (
            <StorybookTableRow key={entry.name} style={{ alignItems: 'center' }}>
              <StorybookTableCell flex={radiusColumnFlex.preview}>
                <View
                  style={{
                    backgroundColor: t.color.fill.brand.default,
                    borderRadius: radius,
                    height: 80,
                    width: 80
                  }}
                />
              </StorybookTableCell>
              <StorybookTableCell flex={radiusColumnFlex.tokenName}>
                {entry.usage ? <StorybookInlineCode size="monoBodyS">{entry.usage}</StorybookInlineCode> : null}
              </StorybookTableCell>
              <StorybookTableCell flex={radiusColumnFlex.value}>
                <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.primary }]}>
                  {entry.value}
                </Text>
              </StorybookTableCell>
              <StorybookTableCell flex={radiusColumnFlex.description}>
                <Text style={[storybookRnTypography.paragraphS, { color: t.color.text.neutral.primary }]}>
                  {entry.description ?? '—'}
                </Text>
              </StorybookTableCell>
            </StorybookTableRow>
          );
        })}
      </StorybookTable>
    </View>
  );
}
