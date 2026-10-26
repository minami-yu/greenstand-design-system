import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { theme, type themes, type ThemeMode } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';

type ThemeTokens = (typeof themes)[ThemeMode];

export type DsLinkColor = 'brand' | 'neutralPrimary' | 'neutralSecondary' | 'neutralTertiary';
export type DsLinkEmphasis = 'default' | 'low';
export type DsLinkIconPosition = 'leading' | 'none' | 'trailing';
export type DsLinkSize = 'md' | 'sm';

export type DsLinkProps = Omit<PressableProps, 'children' | 'style'> & {
  color?: DsLinkColor;
  emphasis?: DsLinkEmphasis;
  icon?: DsLinkIconPosition;
  inline?: boolean;
  label: string;
  leadingIcon?: IconName;
  size?: DsLinkSize;
  style?: StyleProp<ViewStyle>;
  trailingIcon?: IconName;
};

const colorLookup: Record<DsLinkColor, (t: ThemeTokens) => string> = {
  brand: (t) => t.color.text.brand.default,
  neutralPrimary: (t) => t.color.text.neutral.primary,
  neutralSecondary: (t) => t.color.text.neutral.secondary,
  neutralTertiary: (t) => t.color.text.neutral.tertiary
};

const typographyLookup = {
  inline: {
    default: {
      md: 'labelM',
      sm: 'labelS'
    },
    low: {
      md: 'paragraphM',
      sm: 'paragraphS'
    }
  },
  standalone: {
    default: {
      md: 'labelMStrong',
      sm: 'labelSStrong'
    },
    low: {
      md: 'labelM',
      sm: 'labelS'
    }
  }
} as const;

const iconSizeLookup: Record<DsLinkSize, 'sm' | 'xs'> = {
  md: 'sm',
  sm: 'xs'
};

export function DsLink({
  color = 'brand',
  emphasis = 'default',
  icon = 'trailing',
  inline = false,
  label,
  leadingIcon = 'refresh',
  size = 'md',
  style,
  trailingIcon = 'chevron-right',
  accessibilityRole = 'link',
  disabled,
  ...props
}: DsLinkProps) {
  const t = useTheme();
  const textColor = colorLookup[color](t);
  const typographyMode = inline ? 'inline' : 'standalone';
  const typographyKey = typographyLookup[typographyMode][emphasis][size];
  const resolvedIcon = inline ? 'none' : icon;
  const gap = inline || (size === 'sm' && emphasis === 'default') ? theme.space['050'] : theme.space['100'];

  const renderIcon = (name: IconName) => (
    <Icon color={textColor} name={name} size={iconSizeLookup[size]} />
  );

  return (
    <Pressable
      {...props}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      style={[styles.root, { gap }, style]}
    >
      {resolvedIcon === 'leading' ? renderIcon(leadingIcon) : null}
      <Text
        numberOfLines={1}
        style={[
          t.typography[typographyKey],
          {
            color: textColor,
            textAlign: 'center',
            textDecorationLine: inline ? 'underline' : 'none'
          }
        ]}
      >
        {label}
      </Text>
      {resolvedIcon === 'trailing' ? renderIcon(trailingIcon) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
