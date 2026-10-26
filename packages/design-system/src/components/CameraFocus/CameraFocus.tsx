import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type CameraFocusProps = {
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const focusSize = theme.size['1600'] + theme.space['400'];
const focusCornerLength = focusSize / 3;
const focusStrokeWidth = focusSize * (3.01587 / 80);

export function CameraFocus({
  accessibilityLabel,
  style
}: CameraFocusProps) {
  const t = useTheme();
  const lineColor = t.color.fill.neutral.inverse;

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      pointerEvents="none"
      style={[{ height: focusSize, width: focusSize }, style]}
    >
      <Svg height={focusSize} viewBox={`0 0 ${focusSize} ${focusSize}`} width={focusSize}>
        <Rect fill={lineColor} height={focusStrokeWidth} width={focusCornerLength} x={0} y={0} />
        <Rect fill={lineColor} height={focusCornerLength} width={focusStrokeWidth} x={0} y={0} />

        <Rect fill={lineColor} height={focusStrokeWidth} width={focusCornerLength} x={focusSize - focusCornerLength} y={0} />
        <Rect fill={lineColor} height={focusCornerLength} width={focusStrokeWidth} x={focusSize - focusStrokeWidth} y={0} />

        <Rect fill={lineColor} height={focusStrokeWidth} width={focusCornerLength} x={focusSize - focusCornerLength} y={focusSize - focusStrokeWidth} />
        <Rect fill={lineColor} height={focusCornerLength} width={focusStrokeWidth} x={focusSize - focusStrokeWidth} y={focusSize - focusCornerLength} />

        <Rect fill={lineColor} height={focusStrokeWidth} width={focusCornerLength} x={0} y={focusSize - focusStrokeWidth} />
        <Rect fill={lineColor} height={focusCornerLength} width={focusStrokeWidth} x={0} y={focusSize - focusCornerLength} />
      </Svg>
    </View>
  );
}
