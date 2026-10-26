import { View, type ViewProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { getShadow } from '../../theme/getShadow';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { svgAssets } from './assets/svgAssets';
/** Figma direction cone with a token-driven native location dot and shadow. */
export function CurrentLocationTag({ style, accessibilityLabel, ...props }: ViewProps) {
  const t = useTheme();

  return (
    <View
      {...props}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          alignSelf: 'flex-start',
          width: theme.size['600'],
          height: theme.size['1200'] + theme.border.md
        },
        style
      ]}
    >
      <View style={{ alignSelf: 'flex-start' }}>
        <SvgXml accessible={false} xml={svgAssets.cone} />
      </View>
      <View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: theme.size['800'] - theme.space['050'],
            left: theme.size['050'],
            width: theme.size['500'],
            height: theme.size['500'],
            backgroundColor: t.color.palette.blue['600'],
            borderColor: t.color.palette.white['1000'],
            borderRadius: theme.radius.full,
            borderWidth: theme.border.md
          },
          getShadow(t.elevation.md)
        ]}
      />
    </View>
  );
}
