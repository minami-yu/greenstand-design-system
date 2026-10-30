import { Text, View, type ViewProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { getShadow } from '../../theme/getShadow';
import { svgAssets } from './assets/svgAssets';

export type SimpleTreeTagType = 'default' | 'small' | 'focus' | 'number';
export type SimpleTreeTagProps = Omit<ViewProps, 'children'> & {
  type?: SimpleTreeTagType;
  /** Displayed cluster count; only used by the number variant. */
  value?: string;
};

/** Compact map markers with transparent surroundings. Figma's empty large variant is excluded. */
export function SimpleTreeTag({ type = 'default', value = '120', style, accessibilityLabel, ...props }: SimpleTreeTagProps) {
  const t = useTheme();
  const label = accessibilityLabel ?? (type === 'number' ? `${value} trees` : undefined);
  if (type === 'number') {
    return (
      <View {...props} accessible={Boolean(label)} accessibilityLabel={label} accessibilityRole="image"
        style={[{
          alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center',
          paddingHorizontal: theme.space['150'], paddingVertical: theme.space['050'],
          borderWidth: theme.border.md, borderColor: t.color.border.neutral.inverse,
          borderRadius: theme.radius.lg, backgroundColor: t.color.fill.brand.default
        }, getShadow(t.elevation.lg), style]}>
        <Text accessible={false} style={[t.typography.labelS, { color: t.color.text.neutral.inverse }]}>{value}</Text>
      </View>
    );
  }
  const dimension = type === 'small' ? theme.size['400'] : type === 'focus' ? theme.size['1000'] : theme.size['500'];
  if (type === 'default' || type === 'small') {
    return (
      <View {...props} accessible={Boolean(label)} accessibilityLabel={label} accessibilityRole="image"
        style={[{
          alignItems: 'center', justifyContent: 'center', width: dimension, height: dimension,
          borderWidth: theme.border.md, borderColor: t.color.border.neutral.inverse,
          borderRadius: theme.radius.full, backgroundColor: t.color.fill.brand.default
        }, getShadow(type === 'small' ? t.elevation.md : t.elevation.lg), style]}>
        {type === 'default' && <SvgXml accessible={false} xml={svgAssets.treeIcon} />}
      </View>
    );
  }
  // The focus pin retains its original SVG geometry.
  return (
    <View {...props} accessible={Boolean(label)} accessibilityLabel={label} accessibilityRole="image"
      style={[{ width: dimension, height: dimension }, style]}>
      <View pointerEvents="none" style={{ position: 'absolute', left: theme.space['0'], top: theme.space['0'] }}>
        <SvgXml accessible={false} xml={svgAssets[type]} />
      </View>
    </View>
  );
}
