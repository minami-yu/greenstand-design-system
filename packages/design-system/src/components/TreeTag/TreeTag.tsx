import { Image, View, type ViewProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { svgAssets } from './assets/svgAssets';

export type TreeTagSize = 'md' | 'lg' | 'xl';
export type TreeTagProps = Omit<ViewProps, 'children'> & (
  | { size?: TreeTagSize; background?: false }
  | { size?: 'md' | 'lg'; background: true }
);
const sizes = { md: theme.size['600'], lg: theme.size['1200'], xl: theme.size['2400'] };

/** Figma tree illustration; transparent unless a background is explicitly requested. */
export function TreeTag({ size = 'md', background = false, style, accessibilityLabel, ...props }: TreeTagProps) {
  const t = useTheme();
  const hasBackground = background && size !== 'xl';
  const dimension = hasBackground ? (size === 'lg' ? theme.size['1600'] : theme.size['1200']) : sizes[size];
  return (
    <View {...props} accessible={Boolean(accessibilityLabel)} accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      style={[{ width: dimension, height: dimension, alignItems: 'center', justifyContent: 'center',
        ...(hasBackground ? { backgroundColor: t.color.fill.brand.subtle } : {}) },
        hasBackground && { borderRadius: theme.radius.md }, style]}>
      {hasBackground && size === 'lg' ? (
        <Image accessible={false} source={require('./assets/background-lg.png')}
          style={{ width: theme.size['800'], height: theme.size['800'] }} />
      ) : <SvgXml accessible={false} xml={svgAssets[hasBackground ? 'md' : size]} />}
    </View>
  );
}
