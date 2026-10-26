import {
  Pressable,
  StyleSheet,
  Text,
  type ImageSourcePropType,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Avatar } from '../Avatar/Avatar';

const AVATAR_CARD_SIZE = 160;

export type AvatarCardProps = Omit<PressableProps, 'children' | 'style'> & {
  accessibilityLabel?: string;
  label: string;
  outline?: boolean;
  selected?: boolean;
  source?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
};

export function AvatarCard({
  accessibilityLabel,
  label,
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
      accessibilityState={{ selected }}
      style={[styles.avatarCard, outlinedStyle, style]}
    >
      <Avatar selected={!outline && selected} size="xl" source={source} />
      <Text
        numberOfLines={1}
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
    borderRadius: theme.radius.sm,
    gap: theme.space['200'],
    height: AVATAR_CARD_SIZE,
    justifyContent: 'center',
    paddingHorizontal: theme.space['200'],
    paddingVertical: theme.space['0'],
    width: AVATAR_CARD_SIZE
  },
  label: {
    maxWidth: '100%',
    textAlign: 'center'
  }
});
