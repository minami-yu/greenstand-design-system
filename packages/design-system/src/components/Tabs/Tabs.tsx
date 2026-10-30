import { useRef, type ComponentRef } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type TabsProps = { items: readonly { id: string; label: string; disabled?: boolean }[]; value: string; onValueChange: (value: string) => void };

/** Equal-width controlled tabs; the host renders the selected panel. */
export function Tabs({ items, value, onValueChange }: TabsProps) {
  const t = useTheme();
  const refs = useRef<Record<string, ComponentRef<typeof View> | null>>({});
  return <View accessibilityRole="tablist" style={styles.root}>
    {items.map(item => {
      const selected = item.id === value;
      return <Pressable key={item.id} ref={node => { refs.current[item.id] = node; }} tabIndex={selected ? 0 : -1}
        onKeyDown={Platform.OS === 'web' ? event => {
          const key = event.nativeEvent.key;
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;
          event.preventDefault();
          const enabled = items.filter(tab => !tab.disabled);
          if (!enabled.length) return;
          const index = enabled.findIndex(tab => tab.id === item.id);
          const next = key === 'Home' ? enabled[0] : key === 'End' ? enabled[enabled.length - 1] : enabled[(index + (key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
          onValueChange(next.id);
          refs.current[next.id]?.focus();
        } : undefined} accessibilityRole="tab" accessibilityState={{ selected, disabled: Boolean(item.disabled) }} disabled={item.disabled} onPress={() => onValueChange(item.id)} style={[styles.tab, { borderBottomColor: selected ? t.color.border.brand.default : 'transparent' }]}>
        <Text style={[selected ? t.typography.labelMStrong : t.typography.labelM, { color: item.disabled ? t.color.text.neutral.disabled : selected ? t.color.text.brand.default : t.color.text.neutral.secondary }]}>{item.label}</Text>
      </Pressable>;
    })}
  </View>;
}
const styles = StyleSheet.create({
  root: { flexDirection: 'row', gap: theme.space['200'] },
  tab: { flex: 1, minHeight: theme.size['1100'], alignItems: 'center', justifyContent: 'center', borderBottomWidth: theme.border.md, paddingHorizontal: theme.space['100'] }
});
