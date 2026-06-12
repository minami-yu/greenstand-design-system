import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { customIconViewBoxes } from './custom';
import { icons, type IconName } from './icons';
import { resolveIconColor, type IconColorPath } from './resolveIconColor';

type IconSize = keyof typeof theme.icon;

export type IconProps = ViewProps & {
  name: IconName;
  size?: IconSize;
  color?: IconColorPath;
  /** Override token color with an explicit value (e.g. inherited context). */
  colorValue?: string;
};

export function Icon({
  name,
  size = 'md',
  color = 'neutral.primary',
  colorValue,
  style,
  accessibilityRole = 'image',
  ...props
}: IconProps) {
  const t = useTheme();
  const dimension = theme.icon[size];
  const fill = colorValue ?? resolveIconColor(t, color);
  const path = icons[name];
  const viewBox = customIconViewBoxes[name as keyof typeof customIconViewBoxes] ?? '0 0 24 24';

  return (
    <View
      {...props}
      accessibilityRole={accessibilityRole}
      style={[{ height: dimension, width: dimension }, style]}
    >
      <Svg height={dimension} viewBox={viewBox} width={dimension}>
        <Path d={path} fill={fill} />
      </Svg>
    </View>
  );
}
