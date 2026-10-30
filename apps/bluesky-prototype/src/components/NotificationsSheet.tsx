import { useWindowDimensions, View } from 'react-native';
import { BottomSheetModal, ListItem, theme } from '@greenstand/design-system';

// Prototype content from the notification design; no live notification service.
const notifications = [
  { id: 'greenstand-150', label: '150 trees reviewed by Greenstand', time: '10:10 AM, Yesterday' },
  { id: 'kilimanjaro-23', label: '23 trees reviewed by Kilimanjaro...', time: '10:10 AM, 1/10/2025' },
  { id: 'greenstand-98', label: '98 trees reviewed by Greenstand', time: '10:10 AM, 12/05/2025' }
];

export function NotificationsSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { height } = useWindowDimensions();

  return <BottomSheetModal
    visible={visible}
    onClose={onClose}
    title="Notifications"
    closeAccessibilityLabel="Close notifications"
    style={{ height }}
  >
    <View style={{ paddingBottom: theme.space['800'] }}>
      {notifications.map(notification => <ListItem
        key={notification.id}
        label={notification.label}
        labelNumberOfLines={1}
        paragraph={notification.time}
        leadingElement="icon"
        leadingIcon="check-circle-outline"
        trailingElement="badge"
        badgeType="dot"
        showDivider={false}
        accessible
        accessibilityLabel={`${notification.label}, ${notification.time}, unread`}
      />)}
    </View>
  </BottomSheetModal>;
}
