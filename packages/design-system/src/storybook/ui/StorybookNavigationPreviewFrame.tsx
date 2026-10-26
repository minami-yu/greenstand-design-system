import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export const storybookNavigationPreviewWidths = [320, 360, 393, 430] as const;

export type StorybookNavigationPreviewWidth =
  (typeof storybookNavigationPreviewWidths)[number];

type StorybookNavigationPreviewFrameProps = PropsWithChildren<{
  width?: StorybookNavigationPreviewWidth;
}>;

export function StorybookNavigationCanvas({ children }: PropsWithChildren) {
  const t = useTheme();

  return (
    <View
      style={{
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: t.color.fill.neutral.defaultActive,
        minHeight: theme.size['2400'] * 3,
        padding: theme.space['1200'],
        width: '100%'
      }}
    >
      {children}
    </View>
  );
}

export function StorybookNavigationPreviewFrame({
  children,
  width = 360
}: StorybookNavigationPreviewFrameProps) {
  const t = useTheme();

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: t.color.fill.neutral.surface,
        borderColor: t.color.border.neutral.subtle,
        borderRadius: theme.radius.md,
        borderWidth: theme.border.sm,
        padding: theme.space['0'],
        width
      }}
    >
      <View style={{ borderRadius: theme.radius.sm }}>{children}</View>
    </View>
  );
}
