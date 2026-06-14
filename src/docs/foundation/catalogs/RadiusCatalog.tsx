import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { sbTypography, type TokenCatalogEntry } from '../../ui';

type RadiusCatalogProps = {
  entries: TokenCatalogEntry[];
};

export function RadiusCatalog({ entries }: RadiusCatalogProps) {
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
        const radius = theme.radius[entry.name as keyof typeof theme.radius] ?? 0;

        return (
          <View
            key={entry.name}
            style={{
              alignItems: 'center',
              gap: theme.space['200'],
              width: 120
            }}
          >
            <View
              style={{
                backgroundColor: t.color.fill.brand.subtle,
                borderColor: t.color.border.brand.default,
                borderRadius: radius,
                borderWidth: theme.stroke.sm,
                height: 72,
                width: 72
              }}
            />
            <Text
              style={[
                sbTypography['label-s-strong'],
                { color: t.color.text.neutral.primary, textAlign: 'center' }
              ]}
            >
              {entry.name}
            </Text>
            <Text
              style={[
                sbTypography['label-s'],
                { color: t.color.text.neutral.secondary, textAlign: 'center' }
              ]}
            >
              {entry.value}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
