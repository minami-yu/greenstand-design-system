import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { getShadow } from '../../theme/getShadow';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Avatar, type AvatarProps, type AvatarSize } from '../Avatar/Avatar';

export type AvatarGroupProps = {
  avatars: Array<Pick<AvatarProps, 'accessibilityLabel' | 'initial' | 'source' | 'type'>>;
  number?: string;
  overflow?: boolean;
  showOverflow?: boolean;
  size?: Extract<AvatarSize, 'lg' | 'md'>;
  style?: StyleProp<ViewStyle>;
};

export function AvatarGroup({
  avatars,
  number = '+1',
  overflow = false,
  showOverflow = true,
  size = 'md',
  style
}: AvatarGroupProps) {
  const t = useTheme();
  const visibleAvatars = avatars.slice(0, 3);

  return (
    <View style={[styles.avatarGroup, style]}>
      <View style={[styles.avatarGroupList, overflow ? styles.avatarGroupListOverlap : styles.avatarGroupListSpread]}>
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            {...avatar}
            key={`${avatar.initial ?? 'avatar'}-${index}`}
            size={size}
            style={[
              overflow ? [styles.overlapAvatar, getShadow(t.elevation.sm), { zIndex: visibleAvatars.length - index }] : undefined,
              overflow && index > 0 ? styles.overlapOffset : undefined
            ]}
          />
        ))}
      </View>
      {showOverflow ? (
        <Text style={[t.typography.labelM, { color: t.color.text.neutral.secondary }]}>
          {number}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['300']
  },
  avatarGroupList: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  avatarGroupListSpread: {
    gap: theme.space['100']
  },
  avatarGroupListOverlap: {
    flexDirection: 'row'
  },
  overlapAvatar: {
    borderColor: theme.color.border.neutral.subtle
  },
  overlapOffset: {
    marginLeft: theme.space.n400
  }
});
