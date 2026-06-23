import { ActivityIndicator, View, type ViewProps } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getSpinnerLayout, getSpinnerStyles, type SpinnerSize } from './getSpinnerStyles';

export type SpinnerProps = ViewProps & {
  /** Figma `size` — sm (20px), md (36px). */
  size?: SpinnerSize;
};

export function Spinner({
  accessibilityLabel = 'Loading',
  accessibilityRole = 'progressbar',
  accessibilityState,
  size = 'md',
  style,
  ...props
}: SpinnerProps) {
  const t = useTheme();
  const layout = getSpinnerLayout(size);
  const colors = getSpinnerStyles(t.color);

  return (
    <View
      {...props}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ busy: true, ...accessibilityState }}
      style={[
        {
          alignItems: 'center',
          height: layout.diameter,
          justifyContent: 'center',
          width: layout.diameter
        },
        style
      ]}
    >
      <ActivityIndicator
        color={colors.indicatorColor}
        {...layout.indicatorProps}
      />
    </View>
  );
}
