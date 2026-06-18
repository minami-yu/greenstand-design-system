import { Text, View } from 'react-native';
import { getElevationPreviewStyle } from '../../../theme/getShadow';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import type { ElevationCatalogEntry } from '../../utils/buildCatalogEntries';
import { StorybookCatalogThemeProvider } from '../../ui/StorybookCatalogThemeProvider';
import {
  StorybookInlineCode,
  StorybookTable,
  StorybookTableCell,
  StorybookTableRow,
  storybookRnTypography,
  type StorybookTableColumn
} from '../../ui';

type ElevationCatalogProps = {
  entries: ElevationCatalogEntry[];
};

const previewSquareSize = theme.space['1600'];
const previewPadding = theme.space['600'];
const previewContainerSize = previewSquareSize + previewPadding * 2;

const elevationColumnFlex = {
  preview: 25,
  token: 25,
  android: 25,
  ios: 25
} as const;

const elevationTableColumns = [
  { label: 'Preview', flex: elevationColumnFlex.preview },
  { label: 'Token', flex: elevationColumnFlex.token },
  { label: 'Android', flex: elevationColumnFlex.android },
  { label: 'iOS', flex: elevationColumnFlex.ios }
] satisfies StorybookTableColumn[];

const elevationOrder = ['sm', 'md', 'lg'] as const;

function sortElevationEntries(a: ElevationCatalogEntry, b: ElevationCatalogEntry) {
  return elevationOrder.indexOf(a.name as (typeof elevationOrder)[number])
    - elevationOrder.indexOf(b.name as (typeof elevationOrder)[number]);
}

export function ElevationCatalog({ entries }: ElevationCatalogProps) {
  return (
    <StorybookCatalogThemeProvider>
      <ElevationCatalogView entries={entries} />
    </StorybookCatalogThemeProvider>
  );
}

function ElevationCatalogView({ entries }: ElevationCatalogProps) {
  const t = useTheme();
  const sortedEntries = [...entries].sort(sortElevationEntries);
  const canvasBackground =
    t.color.background.neutral.base === t.color.fill.neutral.surface
      ? t.color.fill.neutral.subtle
      : t.color.background.neutral.base;
  const surfaceBackground =
    t.color.background.neutral.base === t.color.fill.neutral.surface
      ? t.color.fill.neutral.default
      : t.color.fill.neutral.surface;

  return (
    <StorybookTable columns={elevationTableColumns}>
      {sortedEntries.map((entry) => {
        const elevation = t.elevation[entry.name as keyof typeof t.elevation];

        return (
          <StorybookTableRow key={entry.name} style={{ alignItems: 'center' }}>
            <StorybookTableCell flex={elevationColumnFlex.preview}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: canvasBackground,
                  borderRadius: theme.radius.sm,
                  height: previewContainerSize,
                  justifyContent: 'center',
                  padding: previewPadding,
                  width: previewContainerSize
                }}
              >
                <View
                  style={[
                    {
                      backgroundColor: surfaceBackground,
                      borderRadius: theme.radius.sm,
                      height: previewSquareSize,
                      width: previewSquareSize
                    },
                    getElevationPreviewStyle(elevation, 'android')
                  ]}
                />
              </View>
            </StorybookTableCell>
            <StorybookTableCell flex={elevationColumnFlex.token}>
              <StorybookInlineCode size="monoBodyS">{entry.token}</StorybookInlineCode>
            </StorybookTableCell>
            <StorybookTableCell flex={elevationColumnFlex.android}>
              <Text
                style={[
                  storybookRnTypography.paragraphS,
                  { color: t.color.text.neutral.primary }
                ]}
              >
                {entry.androidValue}
              </Text>
            </StorybookTableCell>
            <StorybookTableCell flex={elevationColumnFlex.ios}>
              <View style={{ gap: theme.space['100'] }}>
                {entry.iosValue.map((line) => (
                  <Text
                    key={line}
                    style={[
                      storybookRnTypography.paragraphS,
                      { color: t.color.text.neutral.primary }
                    ]}
                  >
                    {line}
                  </Text>
                ))}
              </View>
            </StorybookTableCell>
          </StorybookTableRow>
        );
      })}
    </StorybookTable>
  );
}
