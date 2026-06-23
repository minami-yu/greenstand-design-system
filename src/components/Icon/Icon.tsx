import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { customIconViewBoxes } from './custom';
import { icons, type IconName } from './icons';
import { resolveIconColor, type IconColor } from './resolveIconColor';

type IconSize = keyof typeof theme.icon;

export type IconProps = ViewProps & {
  name: IconName;
  size?: IconSize;
  /** Semantic token path (e.g. `neutral.primary`) or an explicit color value. */
  color?: IconColor;
};

export function Icon({
  name,
  size = 'md',
  color = 'neutral.primary',
  style,
  accessibilityLabel,
  accessibilityRole = 'image',
  ...props
}: IconProps) {
  const t = useTheme();
  const dimension = theme.icon[size];
  const fill = resolveIconColor(t, color);
  const path = icons[name];
  const viewBox = customIconViewBoxes[name as keyof typeof customIconViewBoxes] ?? '0 0 24 24';

  return (
    <View
      {...props}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? accessibilityRole : undefined}
      style={[{ height: dimension, width: dimension }, style]}
    >
      <Svg height={dimension} viewBox={viewBox} width={dimension}>
        <Path d={path} fill={fill} />
      </Svg>
    </View>
  );
}
