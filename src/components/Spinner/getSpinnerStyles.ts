import { Platform, type ActivityIndicatorProps } from 'react-native';
import { themes, type ThemeMode } from '../../theme/tokens';

export type SpinnerSize = 'sm' | 'md';

export type ThemeTokens = (typeof themes)[ThemeMode];

export type SpinnerStyleTokens = {
  indicatorColor: string;
};

export type SpinnerLayout = {
  diameter: number;
  indicatorProps: Pick<ActivityIndicatorProps, 'size' | 'style'>;
};

/** Figma Spinner (13184:6727) — sm 20px, md 36px; matches ActivityIndicator presets. */
const SPINNER_DIAMETER: Record<SpinnerSize, number> = {
  sm: 20,
  md: 36
};

export function getSpinnerDiameter(size: SpinnerSize): number {
  return SPINNER_DIAMETER[size];
}

export function getSpinnerLayout(size: SpinnerSize): SpinnerLayout {
  const diameter = getSpinnerDiameter(size);
  const nativeSize: ActivityIndicatorProps['size'] = size === 'sm' ? 'small' : 'large';

  if (Platform.OS === 'android') {
    return {
      diameter,
      indicatorProps: {
        size: diameter
      }
    };
  }

  return {
    diameter,
    indicatorProps: {
      size: nativeSize
    }
  };
}

export function getSpinnerStyles(color: ThemeTokens['color']): SpinnerStyleTokens {
  return {
    indicatorColor: color.fill.brand.default
  };
}
