import { Platform, type ViewStyle } from 'react-native';
import type { theme } from './tokens';

export type ElevationToken = (typeof theme.elevation)[keyof typeof theme.elevation];
export type ElevationPlatform = 'ios' | 'android';

/**
 * Applies compiled elevation tokens for React Native.
 * Each level ships explicit iOS shadow props and an Android elevation value.
 */
export function getShadow(elevation: ElevationToken): ViewStyle {
  return {
    ...elevation.ios,
    ...elevation.android
  };
}

/** Storybook / previews — render one platform at a time. */
export function getElevationPlatformStyle(
  elevation: ElevationToken,
  platform: ElevationPlatform
): ViewStyle {
  return platform === 'android' ? elevation.android : elevation.ios;
}

function figmaLayersToBoxShadow(layers: ElevationToken['figma']): string | undefined {
  if (!layers.length) return undefined;

  return layers
    .map((layer) => {
      const hex = layer.color?.replace('#', '') ?? '000000';
      if (hex.length !== 6) return undefined;

      const red = Number.parseInt(hex.slice(0, 2), 16);
      const green = Number.parseInt(hex.slice(2, 4), 16);
      const blue = Number.parseInt(hex.slice(4, 6), 16);
      const alpha = layer.opacity ?? 1;

      return `${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px rgba(${red}, ${green}, ${blue}, ${alpha})`;
    })
    .filter(Boolean)
    .join(', ');
}

/**
 * Storybook previews. Android `elevation` is ignored on web — approximate with
 * the token's Figma shadow so the catalog remains visible in web Storybook.
 */
export function getElevationPreviewStyle(
  elevation: ElevationToken,
  platform: ElevationPlatform
): ViewStyle {
  if (platform === 'ios') {
    return elevation.ios;
  }

  if (Platform.OS !== 'web') {
    return elevation.android;
  }

  const boxShadow = figmaLayersToBoxShadow(elevation.figma);

  return boxShadow ? ({ boxShadow } as ViewStyle) : elevation.android;
}
