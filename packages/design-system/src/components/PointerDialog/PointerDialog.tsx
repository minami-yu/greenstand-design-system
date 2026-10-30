import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Dialog, type DialogProps } from '../Dialog/Dialog';
import { DialogEntrance } from '../Dialog/DialogEntrance';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { pointerSvg } from './pointerArtwork';

export type PointerDialogProps = Omit<DialogProps, 'modal' | 'style'> & {
  direction?: 'up' | 'down';
  align?: 'left' | 'center' | 'right';
  /** Offset from the left edge, for a measured target. Overrides align. */
  pointerOffset?: number;
  style?: StyleProp<ViewStyle>;
};

export function PointerDialog({ direction = 'down', align = 'center', pointerOffset, style, visible = true, ...props }: PointerDialogProps) {
  const t = useTheme();
  if (!visible) return null;
  const pointer = <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
    style={[styles.pointerRow, { alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center' }, pointerOffset !== undefined && { alignItems: 'flex-start', paddingHorizontal: theme.space['0'], paddingLeft: pointerOffset }]}>
    <View style={direction === 'down' ? styles.down : undefined}>
      <SvgXml xml={pointerSvg.replace(/fill="[^"]+"/g, `fill="${t.color.fill.neutral.surface}"`)} width={theme.size.dialogPointerWidth} height={theme.size.dialogPointerHeight} />
    </View>
  </View>;
  return <DialogEntrance style={[styles.root, style]}>
    {direction === 'up' ? pointer : null}
    <Dialog {...props} style={styles.card} />
    {direction === 'down' ? pointer : null}
  </DialogEntrance>;
}
const styles = StyleSheet.create({
  root: { width: theme.size.dialogWidth, maxWidth: '100%' },
  card: { width: '100%' },
  pointerRow: { paddingHorizontal: theme.space['1200'], width: '100%' },
  down: { transform: [{ rotate: '180deg' }] }
});
