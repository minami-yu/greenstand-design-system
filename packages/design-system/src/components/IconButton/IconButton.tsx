import { Pressable, View, type PressableProps } from 'react-native';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type IconButtonVariant = 'primary' | 'secondary' | 'subtle' | 'surface';

export type IconButtonSize = 'xs' | 'sm' | 'md';

export type IconButtonProps = Omit<PressableProps, 'children'> & {
  accessibilityLabel: string;
  icon: IconName;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
};

export function IconButton({ disabled = false, icon, size, style, variant = 'surface', ...props }: IconButtonProps) {
  const t = useTheme();
  const primary = variant === 'primary';
  const compact = variant === 'subtle';
  const resolvedSize = size ?? (compact ? 'sm' : 'md');
  const surfaceSize = theme.size[resolvedSize === 'xs' ? '700' : resolvedSize === 'sm' ? '1000' : '1200'];
  // Preserve the repository minimum touch target even for Figma's 40 px xs frame.
  const targetSize = theme.size[resolvedSize === 'xs' ? '1100' : '1200'];
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
          height: targetSize,
          justifyContent: 'center',
          width: targetSize
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
            height: surfaceSize,
            justifyContent: 'center',
            width: surfaceSize
          }}
        >
          <Icon name={icon} size={resolvedSize === 'md' ? 'lg' : resolvedSize} color={disabled ? 'neutral.disabled' : primary ? t.color.text.brand.onBrand : 'neutral.primary'} />
        </View>
      )}
    </Pressable>
  );
}
