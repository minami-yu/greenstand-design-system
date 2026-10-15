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

type BorderCatalogProps = {
  entries: StorybookTokenCatalogEntry[];
};

const previewSize = theme.space['1600'];

const borderColumnFlex = {
  preview: 14,
  tokenName: 24,
  value: 12,
  description: 50
} as const;

const borderTableColumns = [
  { label: 'Preview', flex: borderColumnFlex.preview },
  { label: 'Token name', flex: borderColumnFlex.tokenName },
  { label: 'Value', flex: borderColumnFlex.value },
  { label: 'Description', flex: borderColumnFlex.description }
] satisfies StorybookTableColumn[];

function getBorderValue(entry: StorybookTokenCatalogEntry) {
  return theme.border[entry.name as keyof typeof theme.border] ?? 0;
}

export function BorderCatalog({ entries }: BorderCatalogProps) {
  return (
    <StorybookCatalogThemeProvider>
      <BorderCatalogView entries={entries} />
    </StorybookCatalogThemeProvider>
  );
}

function BorderCatalogView({ entries }: BorderCatalogProps) {
  const t = useTheme();
  const sortedEntries = [...entries].sort((a, b) => getBorderValue(a) - getBorderValue(b));

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      <StorybookTable columns={borderTableColumns}>
        {sortedEntries.map((entry) => {
          const borderWidth = getBorderValue(entry);

          return (
            <StorybookTableRow key={entry.name} style={{ alignItems: 'center' }}>
              <StorybookTableCell flex={borderColumnFlex.preview}>
                <View
                  style={{
                    borderColor: t.color.border.neutral.strong,
                    borderRadius: theme.radius.sm,
                    borderWidth: borderWidth,
                    height: previewSize,
                    width: previewSize
                  }}
                />
              </StorybookTableCell>
              <StorybookTableCell flex={borderColumnFlex.tokenName}>
                {entry.usage ? <StorybookInlineCode size="monoBodyS">{entry.usage}</StorybookInlineCode> : null}
              </StorybookTableCell>
              <StorybookTableCell flex={borderColumnFlex.value}>
                <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.primary }]}>
                  {entry.value}
                </Text>
              </StorybookTableCell>
              <StorybookTableCell flex={borderColumnFlex.description}>
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
