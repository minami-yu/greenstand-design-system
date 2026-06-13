import type { PropsWithChildren } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

type DocPageProps = PropsWithChildren<{
  description?: string;
  title: string;
}>;

export function DocPage({ title, description, children }: DocPageProps) {
  const t = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        gap: theme.space['600'],
        paddingBottom: theme.space['800'],
        width: '100%'
      }}
      style={{ alignSelf: 'stretch', flex: 1, width: '100%' }}
    >
      <View style={{ gap: theme.space['200'] }}>
        <Text style={[t.typography['heading-m'], { color: t.color.text.neutral.primary }]}>
          {title}
        </Text>
        {description ? (
          <Text style={[t.typography['paragraph-m'], { color: t.color.text.neutral.secondary }]}>
            {description}
          </Text>
        ) : null}
      </View>
      {children}
    </ScrollView>
  );
}

type DocSectionProps = PropsWithChildren<{
  description?: string;
  title: string;
}>;

export function DocSection({ title, description, children }: DocSectionProps) {
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['300'], width: '100%' }}>
      <View style={{ gap: theme.space['100'] }}>
        <Text style={[t.typography['heading-s'], { color: t.color.text.neutral.primary }]}>
          {title}
        </Text>
        {description ? (
          <Text style={[t.typography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
            {description}
          </Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}

type DocCalloutProps = {
  text: string;
};

export function DocCallout({ text }: DocCalloutProps) {
  const t = useTheme();

  return (
    <View
      style={{
        backgroundColor: t.color.background.neutral.subtle,
        borderColor: t.color.border.neutral.subtle,
        borderRadius: theme.radius.sm,
        borderWidth: theme.stroke.sm,
        padding: theme.space['400']
      }}
    >
      <Text style={[t.typography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
        {text}
      </Text>
    </View>
  );
}

type DocCodeProps = {
  code: string;
};

export function DocCode({ code }: DocCodeProps) {
  const t = useTheme();

  return (
    <View
      style={{
        backgroundColor: t.color.background.neutral.inverse,
        borderRadius: theme.radius.sm,
        padding: theme.space['400']
      }}
    >
      <Text
        style={[
          t.typography['label-s'],
          { color: t.color.text.neutral.inverse, fontFamily: 'monospace' }
        ]}
      >
        {code}
      </Text>
    </View>
  );
}

type DocBulletListProps = {
  items: string[];
};

export function DocBulletList({ items }: DocBulletListProps) {
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['100'] }}>
      {items.map((item) => (
        <Text
          key={item}
          style={[t.typography['paragraph-m'], { color: t.color.text.neutral.secondary }]}
        >
          • {item}
        </Text>
      ))}
    </View>
  );
}
