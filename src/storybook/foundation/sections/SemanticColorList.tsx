import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { CatalogThemeProvider } from '../../ui/CatalogThemeProvider';
import { useColorDocsMode } from '../../ui/ColorDocsShell';
import { InlineCode, storybookRnTypography } from '../../ui';
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
    <CatalogThemeProvider>
      <SemanticColorListView category={category} group={group} entries={entries} />
    </CatalogThemeProvider>
  );
}

function SemanticColorListView({ category, group, entries }: SemanticColorListProps) {
  const t = useTheme();
  const mode = useColorDocsMode();
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
            <InlineCode size="monoBodyS">{entry.usage}</InlineCode>
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
