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
import { getShadow } from '../../theme/getShadow';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';

export type AvatarTagProps = {
  accessibilityLabel?: string;
  initial?: string;
  name: string;
  onRemove?: PressableProps['onPress'];
  source?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
};

export function AvatarTag({
  accessibilityLabel,
  initial,
  name,
  onRemove,
  source,
  style
}: AvatarTagProps) {
  const t = useTheme();

  return (
    <View style={[styles.avatarTag, style]}>
      <Avatar accessibilityLabel={accessibilityLabel} initial={initial ?? name} size="lg" source={source} />
      <Text
        numberOfLines={1}
        style={[t.typography.labelS, styles.avatarTagLabel, { color: t.color.text.neutral.secondary }]}
      >
        {name}
      </Text>
      <Pressable
        accessibilityLabel={`Remove ${name}`}
        accessibilityRole="button"
        onPress={onRemove}
        style={[
          styles.removeButton,
          { backgroundColor: t.color.fill.neutral.default },
          getShadow(t.elevation.sm)
        ]}
      >
        <Icon color="neutral.primary" name="close" size="sm" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarTag: {
    alignItems: 'center',
    gap: theme.space['100'],
    position: 'relative',
    width: theme.size['1600'] + theme.space['200']
  },
  avatarTagLabel: {
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  removeButton: {
    alignItems: 'center',
    borderRadius: theme.radius.full,
    height: theme.size['700'],
    justifyContent: 'center',
    position: 'absolute',
    right: theme.space['0'],
    top: theme.space.n050,
    width: theme.size['700']
  }
});
