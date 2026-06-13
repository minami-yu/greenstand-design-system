import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import type { TokenCatalogEntry } from '../../ui';

type SpacingCatalogProps = {
  entries: TokenCatalogEntry[];
};

export function SpacingCatalog({ entries }: SpacingCatalogProps) {
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['300'], width: '100%' }}>
      {entries.map((entry) => {
        const width = Number.parseInt(entry.value, 10) || 0;

        return (
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
            <Text style={[t.typography['label-m-strong'], { color: t.color.text.neutral.primary }]}>
              {entry.name} · {entry.value}
            </Text>
            <View
              style={{
                backgroundColor: t.color.fill.brand.default,
                borderRadius: theme.radius.xs,
                height: theme.space['200'],
                width
              }}
            />
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
        );
      })}
    </View>
  );
}
