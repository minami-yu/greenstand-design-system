import { useRef, useState, type ComponentRef } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon/Icon';

export type TextFieldProps = TextInputProps & { label?: string; clearable?: boolean };

/** Single-line input with a visible label and optional clear action. */
export function TextField({ label, clearable = true, value, defaultValue, onChangeText, onFocus, onBlur, style, editable = true, accessibilityLabel, ...props }: TextFieldProps) {
  const t = useTheme();
  const input = useRef<ComponentRef<typeof TextInput>>(null);
  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? '');
  const current = value ?? internal;
  const update = (next: string) => { if (value === undefined) setInternal(next); onChangeText?.(next); };
  return <View style={styles.root}>
    {label ? <Text style={[t.typography.labelMStrong, { color: t.color.text.neutral.primary }]}>{label}</Text> : null}
    <View style={[styles.field, { borderWidth: focused ? theme.border.md : theme.border.sm, borderColor: focused ? t.color.border.neutral.strong : t.color.border.neutral.default, backgroundColor: t.color.background.neutral.default }]}>
      <TextInput {...props} ref={input} value={current} editable={editable} accessibilityLabel={accessibilityLabel ?? label}
        onChangeText={update} onFocus={event => { setFocused(true); onFocus?.(event); }} onBlur={event => { setFocused(false); onBlur?.(event); }}
        placeholderTextColor={t.color.text.neutral.placeholder}
        style={[t.typography.paragraphM, styles.input, Platform.OS === 'web' && { outlineWidth: theme.size['0'] }, { color: editable ? t.color.text.neutral.primary : t.color.text.neutral.disabled }, style]} />
      {clearable && focused && editable && current.length > 0 ? <Pressable accessibilityRole="button" accessibilityLabel={`Clear ${accessibilityLabel ?? label ?? 'text'}`} onPress={() => { update(''); input.current?.focus(); }} style={styles.clear}>
        <Icon name="close-circle" size="lg" color="neutral.tertiary" />
      </Pressable> : null}
    </View>
  </View>;
}
const styles = StyleSheet.create({
  root: { gap: theme.space['200'], width: '100%' },
  field: { flexDirection: 'row', alignItems: 'center', minHeight: theme.size['1400'], borderRadius: theme.radius.md, paddingHorizontal: theme.space['400'] },
  input: { flex: 1, minWidth: theme.size['0'], paddingVertical: theme.space['300'], paddingHorizontal: theme.space['0'] },
  clear: { alignItems: 'center', justifyContent: 'center', width: theme.size['1100'], height: theme.size['1100'], marginRight: theme.space.n200 }
});
