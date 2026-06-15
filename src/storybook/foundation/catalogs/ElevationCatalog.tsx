import { Text, View } from 'react-native';
import { getShadow } from '../../../theme/getShadow';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { InlineCode, storybookRnTypography, type TokenCatalogEntry } from '../../ui';
import { CatalogThemeProvider } from '../../ui/CatalogThemeProvider';

type ElevationCatalogProps = {
  entries: TokenCatalogEntry[];
};

export function ElevationCatalog({ entries }: ElevationCatalogProps) {
  return (
    <CatalogThemeProvider>
      <ElevationCatalogView entries={entries} />
    </CatalogThemeProvider>
  );
}

function ElevationCatalogView({ entries }: ElevationCatalogProps) {
  const t = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.space['400'],
        width: '100%'
      }}
    >
      {entries.map((entry) => {
        const elevation = t.elevation[entry.name as keyof typeof t.elevation];

        return (
          <View
            key={entry.name}
            style={{
              alignItems: 'center',
              gap: theme.space['200'],
              width: 140
            }}
          >
            <View
              style={[
                {
                  backgroundColor: t.color.background.neutral.surface,
                  borderRadius: theme.radius.sm,
                  height: 72,
                  width: 112
                },
                getShadow(elevation)
              ]}
            />
            <Text style={[storybookRnTypography['label-s-strong'], { color: t.color.text.neutral.primary }]}>
              {entry.name}
            </Text>
            {entry.usage ? (
              <InlineCode
                containerStyle={{ alignSelf: 'center' }}
                size="mono-body-m"
                style={{ textAlign: 'center' }}
              >
                {entry.usage}
              </InlineCode>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
