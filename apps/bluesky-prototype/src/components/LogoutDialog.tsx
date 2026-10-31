import { StyleSheet, View } from 'react-native';
import { Button, Dialog, theme } from '@greenstand/design-system';

type LogoutDialogProps = {
  visible: boolean;
  offline: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function LogoutDialog({ visible, offline, onCancel, onConfirm }: LogoutDialogProps) {
  return <Dialog
    modal
    visible={visible}
    showClose
    onClose={onCancel}
    title="Are you sure you want to log out?"
    body={offline
      ? 'You’re offline. If you log out, you won’t be able to log back in until you’re online.'
      : 'If you log out, you’ll need internet to sign back in.'}
  >
    <View style={styles.actions}>
      <Button label="Keep logged in" leadingIcon="arrow-left" variant="secondary" onPress={onCancel} />
      <Button label="Log out" leadingIcon="logout" variant="error-secondary" onPress={onConfirm} />
    </View>
  </Dialog>;
}

const styles = StyleSheet.create({
  actions: { width: '100%', alignItems: 'stretch', gap: theme.space['200'], marginTop: theme.space['200'] }
});
