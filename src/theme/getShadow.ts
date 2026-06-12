import type { ViewStyle } from 'react-native';
import type { theme } from './tokens';

type ElevationToken = (typeof theme.elevation)[keyof typeof theme.elevation];

/**
 * Adapts a multi-layer design token shadow (DTCG format) to React Native
 * shadow styles. RN supports a single shadow layer (iOS) plus an elevation
 * number (Android), so this is an approximation:
 *  - the first (dominant) layer drives the iOS shadow props,
 *  - Android elevation is derived from the layer's offset and blur.
 * Layer alpha is baked into the hex color, so shadowOpacity stays 1.
 */
export function getShadow(elevation: ElevationToken): ViewStyle {
  const [primary] = elevation;

  return {
    shadowColor: primary.color,
    shadowOffset: { width: primary.offsetX, height: primary.offsetY },
    shadowOpacity: 1,
    shadowRadius: primary.blur / 2,
    elevation: Math.round(primary.offsetY + primary.blur / 2)
  };
}
