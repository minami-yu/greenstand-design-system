import { Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { InlineCode } from './InlineCode';
import { CatalogThemeProvider } from './CatalogThemeProvider';
import { storybookRnTypography } from './storybookRnTypography';

export type TokenCatalogEntry = {
  description?: string;
  name: string;
  preview?: React.ReactNode;
  usage?: string;
  value: string;
};

type TokenCatalogProps = {
  entries: TokenCatalogEntry[];
};

export function TokenCatalog({ entries }: TokenCatalogProps) {
  return (
    <CatalogThemeProvider>
      <TokenCatalogView entries={entries} />
    </CatalogThemeProvider>
  );
}

function TokenCatalogView({ entries }: TokenCatalogProps) {
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['300'], width: '100%' }}>
      {entries.map((entry) => (
        <View
          key={entry.name}
          style={{
            borderColor: t.color.border.neutral.subtle,
            borderRadius: theme.radius.sm,
            borderWidth: theme.border.sm,
            gap: theme.space['200'],
            padding: theme.space['400'],
            width: '100%'
          }}
        >
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.space['300'] }}>
            {entry.preview ? <View>{entry.preview}</View> : null}
            <View style={{ flex: 1, gap: theme.space['050'] }}>
              <Text style={[storybookRnTypography.labelMStrong, { color: t.color.text.neutral.primary }]}>
                {entry.name}
              </Text>
              <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.secondary }]}>
                {entry.value}
              </Text>
            </View>
          </View>
          {entry.description ? (
            <Text style={[storybookRnTypography.paragraphS, { color: t.color.text.neutral.secondary }]}>
              {entry.description}
            </Text>
          ) : null}
          {entry.usage ? <InlineCode size="monoBodyM">{entry.usage}</InlineCode> : null}
        </View>
      ))}
    </View>
  );
}
