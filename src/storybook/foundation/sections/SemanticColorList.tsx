import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { StorybookCatalogThemeProvider } from '../../ui/StorybookCatalogThemeProvider';
import { useStorybookColorDocsMode } from '../../ui/StorybookColorDocsShell';
import { StorybookInlineCode, storybookRnTypography } from '../../ui';
import { ColorSwatch, StorybookDocRow } from '../../ui/storybookDocRow';
import type { SemanticColorCategory, SemanticColorDocEntry } from '../../utils/buildColorDocEntries';
import { buildSemanticColorDocEntries } from '../../utils/buildColorDocEntries';

type SemanticColorListProps = {
  category: SemanticColorCategory;
  group?: string;
  entries?: SemanticColorDocEntry[];
};

export function SemanticColorList({ category, group, entries }: SemanticColorListProps) {
  return (
    <StorybookCatalogThemeProvider>
      <SemanticColorListView category={category} group={group} entries={entries} />
    </StorybookCatalogThemeProvider>
  );
}

function SemanticColorListView({ category, group, entries }: SemanticColorListProps) {
  const t = useTheme();
  const mode = useStorybookColorDocsMode();
  const rows = entries ?? buildSemanticColorDocEntries(category, group, mode);

  if (rows.length === 0) {
    return null;
  }

  return (
    <View style={{ alignSelf: 'stretch', width: '100%' }}>
      {rows.map((entry, index) => (
        <StorybookDocRow key={entry.path} showDivider={index < rows.length - 1}>
          <ColorSwatch value={entry.resolvedValue} />
          <View style={{ flex: 1, gap: theme.space['100'] }}>
            <StorybookInlineCode size="monoBodyS">{entry.usage}</StorybookInlineCode>
            {entry.description ? (
              <Text style={[storybookRnTypography.paragraphS, { color: t.color.text.neutral.secondary }]}>
                {entry.description}
              </Text>
            ) : null}
          </View>
          <View style={{ gap: theme.space['100'], minWidth: 120 }}>
            {entry.primitiveName ? (
              <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.secondary }]}>
                {entry.primitiveName}
              </Text>
            ) : null}
            <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.secondary }]}>
              {entry.resolvedValue}
            </Text>
          </View>
        </StorybookDocRow>
      ))}
    </View>
  );
}
