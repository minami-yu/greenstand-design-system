import { Pressable, View, type PressableProps } from 'react-native';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type IconButtonVariant = 'primary' | 'secondary' | 'subtle' | 'surface';

export type IconButtonProps = Omit<PressableProps, 'children'> & {
  accessibilityLabel: string;
  icon: IconName;
  variant?: IconButtonVariant;
};

export function IconButton({ disabled = false, icon, style, variant = 'surface', ...props }: IconButtonProps) {
  const t = useTheme();
  const primary = variant === 'primary';
  const compact = variant === 'subtle';
  const secondary = variant === 'secondary' || compact;

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      style={state => [
        {
          alignItems: 'center',
          height: theme.size['1200'],
          justifyContent: 'center',
          width: theme.size['1200']
        },
        typeof style === 'function' ? style(state) : style
      ]}
    >
      {({ pressed }) => (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: disabled
              ? 'transparent'
              : primary
                ? pressed ? t.color.fill.brand.defaultActive : t.color.fill.brand.default
                : pressed
                ? secondary
                  ? t.color.fill.neutral.defaultActive
                  : t.color.fill.neutral.subtleActive
                : secondary
                  ? t.color.fill.neutral.default
                  : t.color.fill.neutral.surface,
            borderRadius: theme.radius.full,
            height: theme.size[compact ? '900' : '1200'],
            justifyContent: 'center',
            width: theme.size[compact ? '900' : '1200']
          }}
        >
          <Icon name={icon} size={compact ? 'sm' : 'lg'} color={disabled ? 'neutral.disabled' : primary ? t.color.text.brand.onBrand : 'neutral.primary'} />
        </View>
      )}
    </Pressable>
  );
}
