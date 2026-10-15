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

type SizingCatalogProps = {
  entries: StorybookTokenCatalogEntry[];
};

const previewSize = theme.size['1600'];

function getPreviewSquareSize(sizeValue: number) {
  return Math.min(sizeValue, previewSize) || theme.border.sm;
}

const sizingColumnFlex = {
  preview: 14,
  tokenName: 24,
  value: 12,
  description: 50
} as const;

const sizingTableColumns = [
  { label: 'Preview', flex: sizingColumnFlex.preview },
  { label: 'Token name', flex: sizingColumnFlex.tokenName },
  { label: 'Value', flex: sizingColumnFlex.value },
  { label: 'Description', flex: sizingColumnFlex.description }
] satisfies StorybookTableColumn[];

function getSizeValue(entry: StorybookTokenCatalogEntry) {
  return theme.size[entry.name as keyof typeof theme.size] ?? 0;
}

export function SizingCatalog({ entries }: SizingCatalogProps) {
  return (
    <StorybookCatalogThemeProvider>
      <SizingCatalogView entries={entries} />
    </StorybookCatalogThemeProvider>
  );
}

function SizingCatalogView({ entries }: SizingCatalogProps) {
  const t = useTheme();
  const sortedEntries = [...entries].sort((a, b) => getSizeValue(a) - getSizeValue(b));

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      <StorybookTable columns={sizingTableColumns}>
        {sortedEntries.map((entry) => {
          const sizeValue = getSizeValue(entry);
          const squareSize = getPreviewSquareSize(sizeValue);

          return (
            <StorybookTableRow key={entry.name} style={{ alignItems: 'center' }}>
              <StorybookTableCell flex={sizingColumnFlex.preview}>
                <View
                  style={{
                    alignItems: 'flex-start',
                    height: previewSize,
                    justifyContent: 'center',
                    width: previewSize
                  }}
                >
                  <View
                    style={{
                      backgroundColor: t.color.fill.brand.default,
                      height: squareSize,
                      width: squareSize
                    }}
                  />
                </View>
              </StorybookTableCell>
              <StorybookTableCell flex={sizingColumnFlex.tokenName}>
                {entry.usage ? <StorybookInlineCode size="monoBodyS">{entry.usage}</StorybookInlineCode> : null}
              </StorybookTableCell>
              <StorybookTableCell flex={sizingColumnFlex.value}>
                <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.primary }]}>
                  {entry.value}
                </Text>
              </StorybookTableCell>
              <StorybookTableCell flex={sizingColumnFlex.description}>
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
