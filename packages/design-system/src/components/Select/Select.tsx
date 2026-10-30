import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';

export type SelectProps = {
  label: string;
  hideLabel?: boolean;
  leadingContent?: ReactNode;
  value?: string;
  placeholder?: string;
  avatarSource?: ImageSourcePropType;
  disabled?: boolean;
  expanded?: boolean;
  onPress: () => void;
};

/** Selection field trigger; the caller owns the option picker. */
export function Select({ label, hideLabel = false, leadingContent, value, placeholder = 'Select an option', avatarSource, disabled = false, expanded = false, onPress }: SelectProps) {
  const t = useTheme();
  return <View style={styles.root}>
    {!hideLabel ? <Text style={[t.typography.labelMStrong, { color: t.color.text.neutral.primary }]}>{label}</Text> : null}
    <Pressable accessibilityRole="button" accessibilityLabel={`${label}, ${value ?? placeholder}`} accessibilityState={{ disabled, expanded }} disabled={disabled} onPress={onPress}
      style={[styles.field, { borderColor: t.color.border.neutral.default }]}>
      {leadingContent ? <View accessible={false} aria-hidden>{leadingContent}</View> : null}
      {avatarSource && <Avatar size="sm" source={avatarSource} />}
      <Text style={[t.typography.paragraphM, styles.value, { color: disabled ? t.color.text.neutral.disabled : value ? t.color.text.neutral.primary : t.color.text.neutral.placeholder }]}>{value ?? placeholder}</Text>
      <Icon name="chevron-down" size="lg" color={disabled ? 'neutral.disabled' : 'neutral.secondary'} />
    </Pressable>
  </View>;
}
const styles = StyleSheet.create({
  root: { gap: theme.space['200'], width: '100%' },
  field: { minHeight: theme.size['1400'], borderWidth: theme.border.sm, borderRadius: theme.radius.md, paddingHorizontal: theme.space['400'], paddingVertical: theme.space['200'], flexDirection: 'row', alignItems: 'center', gap: theme.space['200'] },
  value: { flex: 1 }
});
