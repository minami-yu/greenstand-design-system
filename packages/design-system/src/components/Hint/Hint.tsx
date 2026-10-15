import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
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

const pointerWidth = theme.size['400'] + theme.space['100'];
const pointerHeight = theme.size['600'] + theme.space['100'];

function TapIcon({ color }: { color: string }) {
  return (
    <Svg height={theme.icon.lg} viewBox="0 0 24 24" width={theme.icon.lg}>
      <Path
        d="M9.5 11.4V5.8a2 2 0 0 1 4 0v5.1l.8-.5a2 2 0 0 1 2.8.7l2.2 3.8c.6 1 .5 2.2-.1 3.1l-1.5 2.2a2.8 2.8 0 0 1-2.3 1.2h-4.1c-.9 0-1.8-.4-2.3-1.2l-3.6-5a1.9 1.9 0 0 1 2.8-2.5l1.3 1.1Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
      />
      <Path
        d="M6.6 4.2 5.1 2.7M17.4 4.2l1.5-1.5M12 2.7V1"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.8}
      />
    </Svg>
  );
}

function Pointer({ direction, fill }: { direction: HintDirection; fill: string }) {
  const points = direction === 'down'
    ? `0 0 ${pointerWidth} 0 ${pointerWidth / 2} ${pointerHeight}`
    : `0 ${pointerHeight} ${pointerWidth} ${pointerHeight} ${pointerWidth / 2} 0`;

  return (
    <Svg height={pointerHeight} viewBox={`0 0 ${pointerWidth} ${pointerHeight}`} width={pointerWidth}>
      <Polygon fill={fill} points={points} />
    </Svg>
  );
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
      <Text numberOfLines={1} style={[t.typography.numericS, styles.text, { color: textColor }]}>
        {content}
      </Text>
      {showIcon ? <TapIcon color={iconColor} /> : null}
    </View>
  );

  const pointerNode = pointer ? (
    <View style={[styles.pointerSlot, pointerAlignment]}>
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
    borderRadius: theme.space['200'],
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
    marginVertical: theme.space.n300,
    paddingHorizontal: theme.space['200'],
    width: '100%'
  },
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
