import { Pressable, StyleSheet, Text, View, type ImageSourcePropType, type PressableProps } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';

export type ChipLeadingElements = 'icon' | 'avatar' | 'none';
export type ChipSize = 'md' | 'lg';
export type ChipTrailingElements = 'arrow' | 'close' | 'none';

export type ChipProps = Omit<PressableProps, 'children'> & {
  label: string;
  size?: ChipSize;
  selected?: boolean;
  leadingElements?: ChipLeadingElements;
  trailingElements?: ChipTrailingElements;
  icon?: IconName;
  source?: ImageSourcePropType;
  initial?: string;
};

/** Controlled chip: the caller handles selection, opening a picker, or removal through onPress. */
export function Chip({
  label, size = 'md', selected = false, leadingElements = 'icon', trailingElements = 'arrow',
  icon = 'heart-outline', source, initial, disabled = false, style,
  accessibilityLabel, accessibilityState, ...props
}: ChipProps) {
  const t = useTheme();
  const hasAvatar = leadingElements === 'avatar';
  const labelContent = <Text numberOfLines={1} style={[t.typography.labelS, { color: t.color.text.neutral.primary }]}>{label}</Text>;

  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? (trailingElements === 'close' ? `Remove ${label}` : label)}
      accessibilityState={{ ...accessibilityState, selected, disabled: Boolean(disabled) }}
      style={(state) => [styles.target, typeof style === 'function' ? style(state) : style]}
    >
      <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
        style={[styles.pill, {
          backgroundColor: selected ? t.color.fill.brand.subtle : t.color.fill.neutral.surface,
          minHeight: theme.size[size === 'lg' ? '1000' : '800'],
          paddingLeft: theme.space[hasAvatar ? size === 'lg' ? '150' : '100' : leadingElements === 'icon' && size === 'md' ? '300' : '400'],
          paddingRight: theme.space[trailingElements === 'none' ? '400' : '200'],
          gap: theme.space[hasAvatar
            ? trailingElements === 'arrow' ? '100' : '200'
            : size === 'lg' ? '150' : '100']
        }]}>
        {hasAvatar ? (
          <View style={styles.identity}>
            <Avatar size={size === 'lg' ? 'sm' : 'xs'} source={source} initial={initial ?? label} />
            {labelContent}
          </View>
        ) : (
          <>
            {leadingElements === 'icon' ? <Icon name={icon} size="sm" /> : null}
            {labelContent}
          </>
        )}
        {trailingElements !== 'none' ? (
          <Icon name={trailingElements === 'close' ? 'close-circle' : 'chevron-down'}
            size={trailingElements === 'close' ? 'md' : 'sm'}
            color={trailingElements === 'close' ? 'neutral.secondary' : 'neutral.primary'} />
        ) : null}
        <View style={[StyleSheet.absoluteFill, styles.outline, { borderColor: selected ? t.color.border.brand.default : t.color.border.neutral.default }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  target: { alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', minHeight: theme.size['1100'], minWidth: theme.size['1100'] },
  pill: { flexDirection: 'row', alignItems: 'center', borderRadius: theme.radius.full, paddingVertical: theme.space['100'] },
  identity: { flexDirection: 'row', alignItems: 'center', gap: theme.space['200'] },
  outline: { borderWidth: theme.border.sm, borderRadius: theme.radius.full }
});
