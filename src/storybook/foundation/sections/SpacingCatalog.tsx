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

type SpacingCatalogProps = {
  entries: StorybookTokenCatalogEntry[];
};

const previewSize = theme.space['1600'];

const spacingColumnFlex = {
  preview: 14,
  tokenName: 24,
  value: 12,
  description: 50
} as const;

const spacingTableColumns = [
  { label: 'Preview', flex: spacingColumnFlex.preview },
  { label: 'Token name', flex: spacingColumnFlex.tokenName },
  { label: 'Value', flex: spacingColumnFlex.value },
  { label: 'Description', flex: spacingColumnFlex.description }
] satisfies StorybookTableColumn[];

function getSpaceValue(entry: StorybookTokenCatalogEntry) {
  return theme.space[entry.name as keyof typeof theme.space] ?? 0;
}

function getPreviewSquareSize(spaceValue: number) {
  return Math.min(Math.abs(spaceValue), previewSize) || theme.border.sm;
}

function sortSpacingEntries(a: StorybookTokenCatalogEntry, b: StorybookTokenCatalogEntry) {
  const aValue = getSpaceValue(a);
  const bValue = getSpaceValue(b);
  const aIsNegative = aValue < 0;
  const bIsNegative = bValue < 0;

  if (aIsNegative !== bIsNegative) {
    return aIsNegative ? 1 : -1;
  }

  if (aIsNegative) {
    return bValue - aValue;
  }

  return aValue - bValue;
}

export function SpacingCatalog({ entries }: SpacingCatalogProps) {
  return (
    <StorybookCatalogThemeProvider>
      <SpacingCatalogView entries={entries} />
    </StorybookCatalogThemeProvider>
  );
}

function SpacingCatalogView({ entries }: SpacingCatalogProps) {
  const t = useTheme();
  const sortedEntries = [...entries].sort(sortSpacingEntries);

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      <StorybookTable columns={spacingTableColumns}>
        {sortedEntries.map((entry) => {
          const spaceValue = getSpaceValue(entry);
          const isNegative = spaceValue < 0;
          const squareSize = getPreviewSquareSize(spaceValue);

          return (
            <StorybookTableRow key={entry.name} style={{ alignItems: 'center' }}>
              <StorybookTableCell flex={spacingColumnFlex.preview}>
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
                      backgroundColor: isNegative
                        ? t.color.fill.neutral.default
                        : t.color.fill.brand.default,
                      height: squareSize,
                      width: squareSize
                    }}
                  />
                </View>
              </StorybookTableCell>
              <StorybookTableCell flex={spacingColumnFlex.tokenName}>
                {entry.usage ? <StorybookInlineCode size="monoBodyS">{entry.usage}</StorybookInlineCode> : null}
              </StorybookTableCell>
              <StorybookTableCell flex={spacingColumnFlex.value}>
                <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.primary }]}>
                  {entry.value}
                </Text>
              </StorybookTableCell>
              <StorybookTableCell flex={spacingColumnFlex.description}>
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
