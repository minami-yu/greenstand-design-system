import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../../components/Icon/Icon';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { CatalogThemeProvider } from './CatalogThemeProvider';
import { StorybookImageView } from './StorybookImage';
import { storybookRnTypography } from './storybookRnTypography';

export type StorybookDoDontType = 'do' | 'dont';

export type StorybookDoDontCardProps = {
  alt: string;
  background?: boolean;
  description: string;
  outline?: boolean;
  src: string;
  title: string;
  type: StorybookDoDontType;
};

const doDontMeta = {
  do: {
    imageBackground: (t: ReturnType<typeof useTheme>) => t.color.fill.success.subtle,
    pillColor: (t: ReturnType<typeof useTheme>) => t.color.fill.success.emphasis,
    icon: 'check' as const,
    label: 'Do',
    textColor: (t: ReturnType<typeof useTheme>) => t.color.text.success['on-emphasis']
  },
  dont: {
    imageBackground: (t: ReturnType<typeof useTheme>) => t.color.fill.error.subtle,
    pillColor: (t: ReturnType<typeof useTheme>) => t.color.fill.error.emphasis,
    icon: 'close' as const,
    label: "Don't",
    textColor: (t: ReturnType<typeof useTheme>) => t.color.text.error['on-emphasis']
  }
};

export function StorybookDoDont({ children }: PropsWithChildren) {
  return (
    <CatalogThemeProvider>
      <View
        style={{
          flexDirection: 'row',
          gap: theme.space['400'],
          marginVertical: theme.space['800'],
          width: '100%'
        }}
      >
        {children}
      </View>
    </CatalogThemeProvider>
  );
}

function StorybookDoDontCardView({
  alt,
  background = true,
  description,
  outline = false,
  src,
  title,
  type
}: StorybookDoDontCardProps) {
  const t = useTheme();
  const meta = doDontMeta[type];

  return (
    <View style={{ flex: 1, gap: theme.space['300'], minWidth: 0 }}>
      <View
        style={{
          borderColor: outline ? t.color.border.neutral.subtle : 'transparent',
          borderRadius: theme.radius.sm,
          borderWidth: outline ? theme.stroke.sm : 0,
          overflow: 'hidden',
          width: '100%'
        }}
      >
        <StorybookImageView
          alt={alt}
          background={background}
          backgroundColor={background ? meta.imageBackground(t) : undefined}
          embedded
          outline={false}
          rounded={false}
          src={src}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: meta.pillColor(t),
          borderRadius: theme.radius.full,
          flexDirection: 'row',
          gap: theme.space['100'],
          paddingLeft: theme.space['200'],
          paddingRight: theme.space['300'],
          paddingVertical: theme.space['100'],
          marginTop: theme.space['100'],
        }}
      >
        <Icon colorValue={meta.textColor(t)} name={meta.icon} size="sm" />
        <Text
          style={[
            storybookRnTypography['label-s-strong'],
            { color: meta.textColor(t) }
          ]}
        >
          {meta.label}
        </Text>
      </View>
      <View style={{ flex: 1, gap: theme.space['100'], minWidth: 0 }}>
        <Text
          style={[
            storybookRnTypography['paragraph-m-strong'],
            { color: t.color.text.neutral.primary }
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            storybookRnTypography['paragraph-s'],
            { color: t.color.text.neutral.secondary }
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

export function StorybookDoDontCard(props: StorybookDoDontCardProps) {
  return <StorybookDoDontCardView {...props} />;
}
