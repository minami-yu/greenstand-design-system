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
    /** Figma `type` property — numeric label or dot indicator. */
    type?: BadgeType;
    size?: BadgeSize;
    /** Label text when `type="label"`. Figma default: `"1"`. */
    value?: string;
  }>;

export function Badge({
  type = 'label',
  size = 'md',
  value = '1',
  style,
  accessibilityRole,
  accessibilityLabel,
  ...props
}: BadgeProps) {
  const t = useTheme();
  const colors = getBadgeStyles(t);
  const layout = getBadgeLayout(type, size);

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

  const resolvedAccessibilityRole = accessibilityRole ?? (type === 'dot' ? 'none' : 'text');
  const resolvedAccessibilityLabel =
    accessibilityLabel ?? (type === 'label' ? value : undefined);

  return (
    <View
      {...props}
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityRole={resolvedAccessibilityRole}
      style={[containerStyle, style]}
    >
      {type === 'label' && layout.typography ? (
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
