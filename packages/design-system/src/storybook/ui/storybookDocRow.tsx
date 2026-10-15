import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export function StorybookDivider() {
  const t = useTheme();

  return (
    <View
      style={{
        backgroundColor: t.color.border.neutral.subtle,
        height: theme.border.sm,
        width: '100%'
      }}
    />
  );
}

type ColorSwatchProps = {
  value: string;
};

export function ColorSwatch({ value }: ColorSwatchProps) {
  const t = useTheme();

  return (
    <View
      style={{
        backgroundColor: value,
        borderColor: t.color.border.neutral.subtle,
        borderRadius: theme.radius.sm,
        borderWidth: theme.border.sm,
        height: theme.space['1200'],
        width: theme.space['1200']
      }}
    />
  );
}

type StorybookDocRowProps = PropsWithChildren<{
  showDivider?: boolean;
}>;

export function StorybookDocRow({ children, showDivider = true }: StorybookDocRowProps) {
  return (
    <View style={{ alignSelf: 'flex-start', width: '100%' }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: theme.space['400'],
          paddingHorizontal: theme.space['0'],
          paddingVertical: theme.space['400'],
          width: '100%'
        }}
      >
        {children}
      </View>
      {showDivider ? <StorybookDivider /> : null}
    </View>
  );
}
