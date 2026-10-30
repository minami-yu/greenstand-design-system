import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import { Avatar } from '../Avatar/Avatar';

const AVATAR_CARD_SIZE = 160;

export type AvatarCardProps = Omit<PressableProps, 'children' | 'style'> & {
  accessibilityLabel?: string;
  label: string;
  visualElements?: 'avatar' | 'button';
  icon?: IconName;
  outline?: boolean;
  selected?: boolean;
  source?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
};

export function AvatarCard({
  accessibilityLabel,
  label,
  visualElements = 'avatar',
  icon = 'add',
  disabled,
  accessibilityState,
  outline = true,
  selected = false,
  source,
  style,
  ...props
}: AvatarCardProps) {
  const t = useTheme();
  const outlinedStyle = outline
    ? {
      backgroundColor: selected ? t.color.fill.brand.subtle : undefined,
      borderColor: selected ? t.color.border.brand.default : t.color.border.neutral.default,
      borderWidth: theme.border.sm
    }
    : undefined;

  return (
    <Pressable
      {...props}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      disabled={disabled}
      accessibilityState={{ ...accessibilityState, selected, disabled: !!disabled }}
      style={[styles.avatarCard, { borderRadius: outline ? theme.radius.md : theme.radius.sm }, outlinedStyle, style]}
    >
      {visualElements === 'button' ? (
        <View style={[styles.buttonVisual, { backgroundColor: t.color.fill.neutral.default }]}>
          <Icon name={icon} size="xl" color="neutral.primary" />
        </View>
      ) : <Avatar selected={!outline && selected} size="xl" source={source} />}
      <Text
        numberOfLines={2}
        style={[styles.label, t.typography.labelS, { color: t.color.text.neutral.primary }]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatarCard: {
    alignItems: 'center',
    borderRadius: theme.radius.md,
    gap: theme.space['200'],
    height: AVATAR_CARD_SIZE,
    justifyContent: 'center',
    paddingHorizontal: theme.space['200'],
    paddingVertical: theme.space['0'],
    width: AVATAR_CARD_SIZE
  },
  buttonVisual: {
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.size['2200'],
    height: theme.size['2200'],
    borderRadius: theme.radius.full
  },
  label: {
    maxWidth: '100%',
    textAlign: 'center'
  }
});
