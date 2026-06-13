import type { PropsWithChildren } from 'react';
import { Text, View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import {
  getBadgeLayout,
  getBadgeStyles,
  type BadgeSize,
  type BadgeType
} from './getBadgeLayout';

export type BadgeProps = ViewProps &
  PropsWithChildren<{
    /** Figma `badge` property — numeric label or dot indicator. */
    badge?: BadgeType;
    size?: BadgeSize;
    /** Label text when `badge="label"`. Figma default: `"1"`. */
    value?: string;
  }>;

export function Badge({
  badge = 'label',
  size = 'medium',
  value = '1',
  style,
  accessibilityRole,
  accessibilityLabel,
  ...props
}: BadgeProps) {
  const t = useTheme();
  const colors = getBadgeStyles(t);
  const layout = getBadgeLayout(badge, size);

  const containerStyle: ViewStyle = {
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    borderRadius: layout.borderRadius,
    height: layout.height,
    justifyContent: 'center',
    minWidth: layout.minWidth,
    overflow: 'hidden',
    paddingHorizontal: layout.paddingHorizontal,
    ...(layout.width ? { width: layout.width } : {})
  };

  const resolvedAccessibilityRole = accessibilityRole ?? (badge === 'dot' ? 'none' : 'text');
  const resolvedAccessibilityLabel =
    accessibilityLabel ?? (badge === 'label' ? value : undefined);

  return (
    <View
      {...props}
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityRole={resolvedAccessibilityRole}
      style={[containerStyle, style]}
    >
      {badge === 'label' && layout.typography ? (
        <Text
          style={[
            t.typography[layout.typography],
            { color: colors.textColor, textAlign: 'center' }
          ]}
        >
          {value}
        </Text>
      ) : null}
    </View>
  );
}
