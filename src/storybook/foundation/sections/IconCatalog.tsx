import { Text, View } from 'react-native';
import { Icon } from '../../../components/Icon/Icon';
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

type IconCatalogProps = {
  entries: StorybookTokenCatalogEntry[];
};

const previewSize = theme.space['1600'];

const iconColumnFlex = {
  preview: 14,
  tokenName: 24,
  value: 12,
  description: 50
} as const;

const iconTableColumns = [
  { label: 'Preview', flex: iconColumnFlex.preview },
  { label: 'Token name', flex: iconColumnFlex.tokenName },
  { label: 'Value', flex: iconColumnFlex.value },
  { label: 'Description', flex: iconColumnFlex.description }
] satisfies StorybookTableColumn[];

function getIconValue(entry: StorybookTokenCatalogEntry) {
  return theme.icon[entry.name as keyof typeof theme.icon] ?? 0;
}

export function IconCatalog({ entries }: IconCatalogProps) {
  return (
    <StorybookCatalogThemeProvider>
      <IconCatalogView entries={entries} />
    </StorybookCatalogThemeProvider>
  );
}

function IconCatalogView({ entries }: IconCatalogProps) {
  const t = useTheme();
  const sortedEntries = [...entries].sort((a, b) => getIconValue(a) - getIconValue(b));

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      <StorybookTable columns={iconTableColumns}>
        {sortedEntries.map((entry) => (
          <StorybookTableRow key={entry.name} style={{ alignItems: 'center' }}>
            <StorybookTableCell flex={iconColumnFlex.preview}>
              <View
                style={{
                  alignItems: 'flex-start',
                  height: previewSize,
                  justifyContent: 'center',
                  width: previewSize
                }}
              >
                <Icon
                  color="neutral.primary"
                  name="heart-outline"
                  size={entry.name as keyof typeof theme.icon}
                />
              </View>
            </StorybookTableCell>
            <StorybookTableCell flex={iconColumnFlex.tokenName}>
              {entry.usage ? <StorybookInlineCode size="monoBodyS">{entry.usage}</StorybookInlineCode> : null}
            </StorybookTableCell>
            <StorybookTableCell flex={iconColumnFlex.value}>
              <Text style={[storybookRnTypography.labelM, { color: t.color.text.neutral.primary }]}>
                {entry.value}
              </Text>
            </StorybookTableCell>
            <StorybookTableCell flex={iconColumnFlex.description}>
              <Text style={[storybookRnTypography.paragraphS, { color: t.color.text.neutral.primary }]}>
                {entry.description ?? '—'}
              </Text>
            </StorybookTableCell>
          </StorybookTableRow>
        ))}
      </StorybookTable>
    </View>
  );
}
