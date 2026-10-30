import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';

export type ToggleButtonProps = Omit<PressableProps, 'children'> & {
  accessibilityLabel: string;
  icon?: IconName;
  selectedIcon?: IconName;
  selected?: boolean;
  size?: 'sm';
  badge?: boolean;
  badgeValue?: string;
};

/** Controlled icon toggle; the caller owns selection and any picker it opens. */
export function ToggleButton({
  icon = 'heart-outline', selectedIcon, selected = false, size = 'sm',
  badge = true, badgeValue = '1', disabled = false, style,
  accessibilityState, ...props
}: ToggleButtonProps) {
  const t = useTheme();

  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, selected, disabled: Boolean(disabled) }}
      aria-pressed={selected}
      style={state => [styles[size], typeof style === 'function' ? style(state) : style]}
    >
      <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.content}>
        <View style={[styles.circle, {
          backgroundColor: selected ? t.color.fill.brand.subtle : t.color.fill.neutral.surface,
          borderColor: selected ? t.color.border.brand.default : t.color.border.neutral.default
        }]}>
          <Icon name={selected ? selectedIcon ?? icon : icon} size="sm" />
        </View>
        {selected && badge ? <Badge size="md" value={badgeValue} style={[styles.badge, { backgroundColor: t.color.fill.brand.default }]} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sm: { alignSelf: 'flex-start', flexShrink: 0, height: theme.size['1200'], width: theme.size['1200'] },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: {
    alignItems: 'center', justifyContent: 'center',
    height: theme.size['1000'], width: theme.size['1000'],
    borderRadius: theme.radius.full, borderWidth: theme.border.sm
  },
  badge: { position: 'absolute', left: theme.size['700'], top: theme.border.sm }
});
