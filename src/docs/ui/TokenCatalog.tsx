import { Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

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
            gap: theme.space['200'],
            padding: theme.space['400'],
            width: '100%'
          }}
        >
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.space['300'] }}>
            {entry.preview ? <View>{entry.preview}</View> : null}
            <View style={{ flex: 1, gap: theme.space['050'] }}>
              <Text style={[t.typography['label-m-strong'], { color: t.color.text.neutral.primary }]}>
                {entry.name}
              </Text>
              <Text style={[t.typography['label-s'], { color: t.color.text.neutral.secondary }]}>
                {entry.value}
              </Text>
            </View>
          </View>
          {entry.description ? (
            <Text style={[t.typography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
              {entry.description}
            </Text>
          ) : null}
          {entry.usage ? (
            <Text
              style={[
                t.typography['label-s'],
                { color: t.color.text.brand.default, fontFamily: 'monospace' }
              ]}
            >
              {entry.usage}
            </Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}
