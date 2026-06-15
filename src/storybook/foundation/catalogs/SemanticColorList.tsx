import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { CatalogThemeProvider } from '../../ui/CatalogThemeProvider';
import { useColorDocsMode } from '../../ui/ColorDocsShell';
import { storybookRnTypography } from '../../ui';
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
            <Text style={[storybookRnTypography['label-m-strong'], { color: t.color.text.neutral.primary }]}>
              {entry.tokenName}
            </Text>
            {entry.description ? (
              <Text style={[storybookRnTypography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
                {entry.description}
              </Text>
            ) : null}
          </View>
          <View style={{ gap: theme.space['300'], minWidth: 120 }}>
            {entry.primitiveName ? (
              <Text style={[storybookRnTypography['label-s'], { color: t.color.text.neutral.secondary }]}>
                {entry.primitiveName}
              </Text>
            ) : null}
            <Text style={[storybookRnTypography['label-s'], { color: t.color.text.neutral.secondary }]}>
              {entry.resolvedValue}
            </Text>
          </View>
        </StorybookDocRow>
      ))}
    </View>
  );
}
