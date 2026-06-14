import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { InlineCode, sbTypography, type TokenCatalogEntry } from '../../ui';

type ColorCatalogProps = {
  entries: TokenCatalogEntry[];
};

export function ColorCatalog({ entries }: ColorCatalogProps) {
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['300'], width: '100%' }}>
      {entries.map((entry) => (
        <View
          key={entry.name}
          style={{
            borderColor: t.color.border.neutral.subtle,
            borderRadius: theme.radius.sm,
            borderWidth: theme.stroke.sm,
            flexDirection: 'row',
            gap: theme.space['300'],
            padding: theme.space['400'],
            width: '100%'
          }}
        >
          <View
            style={{
              backgroundColor: entry.value,
              borderColor: t.color.border.neutral.subtle,
              borderRadius: theme.radius.sm,
              borderWidth: theme.stroke.sm,
              height: theme.space['600'],
              width: theme.space['600']
            }}
          />
          <View style={{ flex: 1, gap: theme.space['100'] }}>
            <Text style={[sbTypography['label-m-strong'], { color: t.color.text.neutral.primary }]}>
              {entry.name}
            </Text>
            <Text style={[sbTypography['label-s'], { color: t.color.text.neutral.secondary }]}>
              {entry.value}
            </Text>
            {entry.description ? (
              <Text style={[sbTypography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
                {entry.description}
              </Text>
            ) : null}
            {entry.usage ? <InlineCode size="mono-body-m">{entry.usage}</InlineCode> : null}
          </View>
        </View>
      ))}
    </View>
  );
}
