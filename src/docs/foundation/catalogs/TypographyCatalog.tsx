import { Text, View } from 'react-native';
import { theme, typographies } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import type { TokenCatalogEntry } from '../../ui';

type TypographyCatalogProps = {
  entries: TokenCatalogEntry[];
};

export function TypographyCatalog({ entries }: TypographyCatalogProps) {
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['400'], width: '100%' }}>
      {entries.map((entry) => {
        const style = typographies.mobile[entry.name as keyof typeof typographies.mobile];

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
              {entry.name}
            </Text>
            {typeof style === 'object' ? (
              <Text style={[style, { color: t.color.text.neutral.primary }]}>
                The quick brown fox jumps over the lazy dog
              </Text>
            ) : null}
            <Text style={[t.typography['label-s'], { color: t.color.text.neutral.secondary }]}>
              {entry.value}
            </Text>
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
