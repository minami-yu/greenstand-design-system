import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewProps } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Divider } from '../Divider/Divider';

export type DetailRowProps = Omit<ViewProps, 'children'> & {
  label: string;
  /** Plain text value, or custom content such as an avatar and name. */
  children: ReactNode;
  showDivider?: boolean;
};

export function DetailRow({ label, children, showDivider = true, style, ...props }: DetailRowProps) {
  const t = useTheme();
  return <View {...props} style={[styles.root, style]}>
    <View style={styles.row}>
      <Text style={[t.typography.labelM, styles.label, { color: t.color.text.neutral.primary }]}>{label}</Text>
      <View style={styles.value}>
        {typeof children === 'string' || typeof children === 'number'
          ? <Text style={[t.typography.paragraphM, styles.text, { color: t.color.text.neutral.secondary }]}>{children}</Text>
          : children}
      </View>
    </View>
    {showDivider ? <Divider /> : null}
  </View>;
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space['200'], minHeight: theme.size['1000'], paddingVertical: theme.space['300'] },
  label: { flexShrink: 1 },
  value: { flex: 1, minWidth: theme.size['0'], alignItems: 'flex-end', gap: theme.space['200'] },
  text: { textAlign: 'right' }
});
