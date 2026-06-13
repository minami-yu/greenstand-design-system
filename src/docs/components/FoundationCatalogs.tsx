import { Text, View } from 'react-native';
import { getShadow } from '../../theme/getShadow';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import type { TokenCatalogEntry } from './TokenCatalog';
import { TokenCatalog } from './TokenCatalog';

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
            <Text style={[t.typography['label-m-strong'], { color: t.color.text.neutral.primary }]}>
              {entry.name}
            </Text>
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
        </View>
      ))}
    </View>
  );
}

type TypographyCatalogProps = {
  entries: TokenCatalogEntry[];
};

export function TypographyCatalog({ entries }: TypographyCatalogProps) {
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['400'], width: '100%' }}>
      {entries.map((entry) => {
        const style = t.typography[entry.name as keyof typeof t.typography];

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
                t.typography['label-s-strong'],
                { color: t.color.text.neutral.primary, textAlign: 'center' }
              ]}
            >
              {entry.name}
            </Text>
            <Text
              style={[
                t.typography['label-s'],
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

type ElevationCatalogProps = {
  entries: TokenCatalogEntry[];
};

export function ElevationCatalog({ entries }: ElevationCatalogProps) {
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
            <Text style={[t.typography['label-s-strong'], { color: t.color.text.neutral.primary }]}>
              {entry.name}
            </Text>
            {entry.usage ? (
              <Text
                style={[
                  t.typography['label-s'],
                  { color: t.color.text.brand.default, fontFamily: 'monospace', textAlign: 'center' }
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
