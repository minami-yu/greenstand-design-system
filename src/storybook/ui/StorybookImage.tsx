import { useEffect, useState } from 'react';
import { Image, View, type ImageStyle, type StyleProp } from 'react-native';
import { storybookDocSurface } from '../../../.storybook-web/storybookMdStyles';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { StorybookCatalogThemeProvider } from './StorybookCatalogThemeProvider';

type ImageLayout = {
  aspectRatio: number;
};

export type StorybookImageProps = {
  alt: string;
  src: string;
  /** Subtle fill behind the image. Default: true. Ignored when `backgroundColor` is set. */
  background?: boolean;
  /** Token-resolved fill behind the image (e.g. `t.color.fill.error.subtle`). */
  backgroundColor?: string;
  /** When true, skips outer margin for nested layouts (e.g. Do/Don't cards). */
  embedded?: boolean;
  outline?: boolean;
  rounded?: boolean;
  resizeMode?: ImageStyle['resizeMode'];
  style?: StyleProp<ImageStyle>;
};

/**
 * Full-width docs image. Height follows the asset’s intrinsic aspect ratio.
 */
export function StorybookImage(props: StorybookImageProps) {
  return (
    <StorybookCatalogThemeProvider>
      <StorybookImageView {...props} />
    </StorybookCatalogThemeProvider>
  );
}

export function StorybookImageView({
  alt,
  src,
  background = true,
  backgroundColor,
  embedded = false,
  outline = true,
  rounded = true,
  resizeMode,
  style
}: StorybookImageProps) {
  const t = useTheme();
  const [layout, setLayout] = useState<ImageLayout | null>(null);
  const borderRadius = rounded ? storybookDocSurface.imageRadius : 0;
  const frameBackgroundColor =
    backgroundColor ?? (background ? storybookDocSurface.imageBackground : 'transparent');

  useEffect(() => {
    let cancelled = false;

    Image.getSize(
      src,
      (width, height) => {
        if (!cancelled && width > 0 && height > 0) {
          setLayout({ aspectRatio: width / height });
        }
      },
      () => {
        if (!cancelled) {
          setLayout(null);
        }
      }
    );

    return () => {
      cancelled = true;
    };
  }, [src]);

  const frameStyle = {
    alignSelf: 'stretch' as const,
    backgroundColor: frameBackgroundColor,
    borderColor: outline ? t.color.border.neutral.subtle : 'transparent',
    borderRadius,
    borderWidth: outline ? theme.border.sm : 0,
    marginVertical: embedded ? 0 : theme.space['400'],
    overflow: 'hidden' as const,
    width: '100%' as const
  };

  if (!layout) {
    return <View style={frameStyle} />;
  }

  return (
    <View style={frameStyle}>
      <Image
        accessibilityLabel={alt}
        accessibilityRole="image"
        source={{ uri: src }}
        style={[
          {
            alignSelf: 'center',
            aspectRatio: layout.aspectRatio,
            backgroundColor: 'transparent',
            maxWidth: '100%',
            width: '100%'
          },
          style
        ]}
        resizeMode={resizeMode}
      />
    </View>
  );
}
