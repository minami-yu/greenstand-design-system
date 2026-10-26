import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type CameraCaptureButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  style?: StyleProp<ViewStyle>;
};

const captureButtonSize = theme.size['2000'];
const captureStrokeWidth = theme.size['100'];
const captureInnerRadius = theme.size['1600'] / 2;

export function CameraCaptureButton({
  accessibilityLabel = 'Capture photo',
  accessibilityRole = 'button',
  style,
  ...props
}: CameraCaptureButtonProps) {
  const t = useTheme();
  const center = captureButtonSize / 2;
  const outerRadius = (captureButtonSize - captureStrokeWidth) / 2;

  return (
    <Pressable
      {...props}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      style={[
        {
          alignItems: 'center',
          height: captureButtonSize,
          justifyContent: 'center',
          width: captureButtonSize
        },
        style
      ]}
    >
      <Svg height={captureButtonSize} viewBox={`0 0 ${captureButtonSize} ${captureButtonSize}`} width={captureButtonSize}>
        <Circle
          cx={center}
          cy={center}
          fill={t.color.background.neutral.default}
          r={outerRadius}
          stroke={t.color.fill.neutral.inverse}
          strokeWidth={captureStrokeWidth}
        />
        <Circle
          cx={center}
          cy={center}
          fill={t.color.fill.neutral.inverse}
          r={captureInnerRadius}
        />
      </Svg>
    </Pressable>
  );
}
