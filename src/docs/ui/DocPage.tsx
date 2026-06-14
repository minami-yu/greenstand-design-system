import type { PropsWithChildren } from 'react';
import { ScrollView, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { useAppFonts } from '../../theme/fonts';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import {
  storybookCodeStyles,
  sbTypography,
  type StorybookMonoTypography
} from './sbTypography';

type DocPageProps = PropsWithChildren<{
  title: string;
}>;

export function DocPage({ title, children }: DocPageProps) {
  const t = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        alignSelf: 'center',
        gap: theme.space['1200'],
        maxWidth: theme.responsive.xl,
        paddingBottom: theme.space['1600'],
        paddingHorizontal: theme.space['400'],
        width: '100%'
      }}
      style={{ alignSelf: 'center', flex: 1, width: '100%' }}
    >
      <View>
        <Text style={[sbTypography['heading-m'], { color: t.color.text.neutral.primary }]}>
          {title}
        </Text>
      </View>
      {children}
    </ScrollView>
  );
}

export function MdxDocPage(props: DocPageProps) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <ThemeProvider mode="light" typographyMode="desktop">
      <DocPage {...props} />
    </ThemeProvider>
  );
}

type DocSectionProps = PropsWithChildren<{
  title: string;
}>;

export function DocSection({ title, children }: DocSectionProps) {
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['300'], width: '100%' }}>
      <Text style={[sbTypography['heading-s'], { color: t.color.text.neutral.primary }]}>
        {title}
      </Text>
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
        backgroundColor: t.color.fill.neutral.subtle,
        borderColor: t.color.border.neutral.subtle,
        borderRadius: theme.radius.sm,
        borderWidth: theme.stroke.sm,
        padding: theme.space['600']
      }}
    >
      <Text style={[sbTypography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
        {text}
      </Text>
    </View>
  );
}

type DocCodeProps = {
  code: string;
  size?: StorybookMonoTypography;
};

export function DocCode({ code, size = 'mono-body-m' }: DocCodeProps) {
  const t = useTheme();

  return (
    <View
      style={{
        ...storybookCodeStyles.blockContainer,
        backgroundColor: t.color.fill.neutral.subtle,
      }}
    >
      <Text
        style={[
          sbTypography[size],
          { color: t.color.text.neutral.inverse }
        ]}
      >
        {code}
      </Text>
    </View>
  );
}

type InlineCodeProps = PropsWithChildren<{
  containerStyle?: ViewStyle;
  size?: StorybookMonoTypography;
  style?: TextStyle;
}>;

export function InlineCode({
  children,
  containerStyle,
  size = 'mono-body-l',
  style
}: InlineCodeProps) {
  const t = useTheme();

  return (
    <View
      style={[
        storybookCodeStyles.inlineContainer,
        { backgroundColor: t.color.fill.neutral.subtle },
        containerStyle
      ]}
    >
      <Text
        style={[
          sbTypography[size],
          { color: t.color.text.neutral.primary },
          style
        ]}
      >
        {children}
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
    <View style={{ gap: theme.space['200'] }}>
      {items.map((item) => (
        <Text
          key={item}
          style={[sbTypography['paragraph-m'], { color: t.color.text.neutral.secondary }]}
        >
          • {item}
        </Text>
      ))}
    </View>
  );
}
