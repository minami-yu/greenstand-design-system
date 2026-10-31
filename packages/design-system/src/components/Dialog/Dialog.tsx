import { useContext, type ReactNode } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { IconButton } from '../IconButton/IconButton';
import { DialogEntrance } from './DialogEntrance';

export type DialogProps = {
  title?: string;
  body?: string;
  children?: ReactNode;
  showClose?: boolean;
  onClose?: () => void;
  modal?: boolean;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Presentation surface; use modal for a centered, focus-contained overlay. */
export function Dialog({ title, body, children, showClose = false, onClose, modal = false, visible = true, style }: DialogProps) {
  const t = useTheme();
  if (!visible) return null;
  const card = <DialogEntrance style={[styles.card, { backgroundColor: t.color.fill.neutral.surface }, showClose && styles.withClose, style]}>
    {showClose && onClose ? <View style={styles.closeRow}>
      <IconButton icon="close" size="xs" variant="secondary" accessibilityLabel="Close dialog" onPress={onClose} />
    </View> : null}
    <View style={styles.content}>
      {title ? <Text accessibilityRole="header" style={[t.typography.headingS, styles.center, { color: t.color.text.neutral.primary }]}>{title}</Text> : null}
      {body ? <Text style={[t.typography.paragraphM, styles.center, { color: t.color.text.neutral.secondary }]}>{body}</Text> : null}
      {children}
    </View>
  </DialogEntrance>;
  return modal ? <DialogOverlay visible={visible} onClose={onClose} label={title}><ScrollView contentContainerStyle={styles.centered} bounces={false}>{card}</ScrollView></DialogOverlay> : card;
}

export type DialogOverlayProps = {
  visible: boolean;
  onClose?: () => void;
  label?: string;
  children: ReactNode;
};

/** Shared modal host. Back/Escape dismiss; backdrop presses deliberately do not. */
export function DialogOverlay({ visible, onClose, label, children }: DialogOverlayProps) {
  const t = useTheme();
  const insets = useContext(SafeAreaInsetsContext);
  return <Modal transparent visible={visible} animationType="none" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
    <View role="dialog" aria-modal accessibilityViewIsModal accessibilityLabel={label} onAccessibilityEscape={onClose}
      style={[styles.overlay, { backgroundColor: t.color.background.neutral.overlay, paddingTop: insets?.top ?? theme.space['0'], paddingBottom: insets?.bottom ?? theme.space['0'] }]}>
      {children}
    </View>
  </Modal>;
}

const styles = StyleSheet.create({
  card: { width: '80%', maxWidth: '100%', flexGrow: 0, flexShrink: 0, borderRadius: theme.radius.lg, paddingHorizontal: theme.space['400'], paddingVertical: theme.space['600'] },
  withClose: { paddingTop: theme.space['400'] },
  content: { gap: theme.space['400'], width: '100%' },
  center: { textAlign: 'center', width: '100%' },
  closeRow: { alignItems: 'flex-end', marginTop: theme.space.n200, marginRight: theme.space.n200, marginBottom: theme.space['100'] },
  overlay: { flex: 1 },
  centered: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: theme.space['400'] }
});
