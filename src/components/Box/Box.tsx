import type { PropsWithChildren } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { theme } from '../../theme/tokens.ts';

type SpaceKey = keyof typeof theme.space;
type RadiusKey = keyof typeof theme.radius;

export type BoxProps = PropsWithChildren<
  ViewProps & {
    p?: SpaceKey;
    px?: SpaceKey;
    py?: SpaceKey;
    gap?: SpaceKey;
    radius?: RadiusKey;
  }
>;

export function Box({ children, p, px, py, gap, radius, style, ...props }: BoxProps) {
  const tokenStyle: ViewStyle = {
    ...(p ? { padding: theme.space[p] } : null),
    ...(px ? { paddingHorizontal: theme.space[px] } : null),
    ...(py ? { paddingVertical: theme.space[py] } : null),
    ...(gap ? { gap: theme.space[gap] } : null),
    ...(radius ? { borderRadius: theme.radius[radius] } : null)
  };

  return (
    <View {...props} style={[tokenStyle, style]}>
      {children}
    </View>
  );
}
