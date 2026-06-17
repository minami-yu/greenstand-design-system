import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { CatalogThemeProvider } from '../../ui/CatalogThemeProvider';
import {
  InlineCode,
  StorybookTable,
  StorybookTableCell,
  StorybookTableRow,
  storybookRnTypography,
  type StorybookTableColumn
} from '../../ui';
import type { LayoutCatalogEntry } from '../../utils/buildCatalogEntries';

type LayoutCatalogProps = {
  entries: LayoutCatalogEntry[];
};

const previewSize = theme.space['1600'];

const layoutColumnFlex = {
  preview: 10,
  tokenName: 30,
  value: 20,
  description: 40
} as const;

const layoutTableColumns = [
  { label: 'Preview', flex: layoutColumnFlex.preview },
  { label: 'Token name', flex: layoutColumnFlex.tokenName },
  { label: 'Value', flex: layoutColumnFlex.value },
  { label: 'Description', flex: layoutColumnFlex.description }
] satisfies StorybookTableColumn[];

function getPreviewSquareSize(resolvedPx: number) {
  return Math.min(Math.abs(resolvedPx), previewSize) || theme.border.sm;
}

export function LayoutCatalog({ entries }: LayoutCatalogProps) {
  return (
    <CatalogThemeProvider>
      <LayoutCatalogView entries={entries} />
    </CatalogThemeProvider>
  );
}

function LayoutCatalogView({ entries }: LayoutCatalogProps) {
  const t = useTheme();

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      <StorybookTable columns={layoutTableColumns}>
        {entries.map((entry) => {
          const squareSize = getPreviewSquareSize(entry.resolvedPx);

          return (
            <StorybookTableRow key={entry.name} style={{ alignItems: 'center' }}>
              <StorybookTableCell flex={layoutColumnFlex.preview}>
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
              <StorybookTableCell flex={layoutColumnFlex.tokenName}>
                <InlineCode size="monoBodyS">{entry.usage}</InlineCode>
              </StorybookTableCell>
              <StorybookTableCell flex={layoutColumnFlex.value}>
                <View style={{ gap: theme.space['200'] }}>
                  <InlineCode size="monoBodyS">{entry.alias}</InlineCode>
                  <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.primary }]}>
                    {entry.value}
                  </Text>
                </View>
              </StorybookTableCell>
              <StorybookTableCell flex={layoutColumnFlex.description}>
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
