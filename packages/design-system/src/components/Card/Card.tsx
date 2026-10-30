import { StyleSheet, View, type ViewProps } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type CardProps = ViewProps;

/** Figma Card: a content slot on a rounded, mode-aware surface. */
export function Card({ children, style, ...props }: CardProps) {
  const t = useTheme();
  return <View {...props} style={[styles.card, { backgroundColor: t.color.fill.neutral.surface }, style]}>
    {children}
  </View>;
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    gap: theme.space['400'],
    paddingHorizontal: theme.layout.marginX,
    paddingVertical: theme.space['500'],
    borderRadius: theme.radius.lg
  }
});
