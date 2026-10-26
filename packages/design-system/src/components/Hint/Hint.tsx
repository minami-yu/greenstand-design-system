import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { svgAssets } from './assets/svgAssets';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type HintAlignment = 'center' | 'left' | 'right';
export type HintDirection = 'down' | 'up';

export type HintProps = {
  alignment?: HintAlignment;
  content: string;
  direction?: HintDirection;
  pointer?: boolean;
  showIcon?: boolean;
  style?: StyleProp<ViewStyle>;
};

// Figma artwork dimensions: explicitly exempted from tokens by the user.
const pointerWidth = 17;
const pointerHeight = 25;
const pointerOverlap = 10;

function TapIcon({ color }: { color: string }) {
  return <View aria-hidden accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.icon}>
    <View style={styles.iconArtwork}>
      <SvgXml accessible={false} xml={svgAssets.tap.replaceAll('#232323', color)} />
    </View>
  </View>;
}

function Pointer({ direction, fill }: { direction: HintDirection; fill: string }) {
  return <View aria-hidden accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
    style={[styles.pointerArtwork, direction === 'down' && styles.pointDown]}>
    <SvgXml accessible={false} xml={svgAssets.pointer.replaceAll('#F2F2F2', fill)} />
  </View>;
}

export function Hint({
  alignment = 'center',
  content,
  direction = 'down',
  pointer = true,
  showIcon = true,
  style
}: HintProps) {
  const t = useTheme();
  const fill = t.color.fill.neutral.subtle;
  const textColor = t.color.text.neutral.primary;
  const iconColor = t.color.icon.neutral.primary;
  const pointerAlignment = alignment === 'left'
    ? styles.pointerLeft
    : alignment === 'right'
      ? styles.pointerRight
      : styles.pointerCenter;

  const bubble = (
    <View style={[styles.bubble, { backgroundColor: fill }]}>
      <Text numberOfLines={1} style={[t.typography.paragraphL, styles.text, { color: textColor }]}>
        {content}
      </Text>
      {showIcon ? <TapIcon color={iconColor} /> : null}
    </View>
  );

  const pointerNode = pointer ? (
    <View style={[styles.pointerSlot, pointerAlignment, direction === 'up' ? styles.overlapUp : styles.overlapDown]}>
      <Pointer direction={direction} fill={fill} />
    </View>
  ) : null;

  return (
    <View style={[styles.root, style]}>
      {direction === 'up' ? pointerNode : null}
      {bubble}
      {direction === 'down' ? pointerNode : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'flex-start'
  },
  bubble: {
    alignItems: 'center',
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    gap: theme.space['150'],
    justifyContent: 'center',
    paddingHorizontal: theme.space['300'],
    paddingVertical: theme.space['200']
  },
  text: {
    textAlign: 'center'
  },
  pointerSlot: {
    paddingHorizontal: theme.space['200'],
    width: '100%'
  },
  icon: { width: theme.icon.md, height: theme.icon.md },
  // Position the exported vector inside its original 20px icon viewport.
  iconArtwork: { position: 'absolute', left: '10.83%', top: '4.58%' },
  pointerArtwork: { width: pointerWidth, height: pointerHeight, alignItems: 'center' },
  pointDown: { transform: [{ rotate: '180deg' }] },
  overlapUp: { marginBottom: -pointerOverlap },
  overlapDown: { marginTop: -pointerOverlap },
  pointerLeft: {
    alignItems: 'flex-start'
  },
  pointerCenter: {
    alignItems: 'center'
  },
  pointerRight: {
    alignItems: 'flex-end'
  }
});
