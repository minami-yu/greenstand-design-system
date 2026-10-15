import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type AvatarSize = 'lg' | 'md' | 'sm' | 'xl' | 'xs';
export type AvatarType = 'image' | 'initial';

export type AvatarProps = {
  accessibilityLabel?: string;
  initial?: string;
  selected?: boolean;
  size?: AvatarSize;
  source?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  type?: AvatarType;
};

const avatarDimensions: Record<AvatarSize, number> = {
  xs: theme.size['600'],
  sm: theme.size['800'],
  md: theme.size['1200'],
  lg: theme.size['1600'],
  xl: 88
};

const initialTypography: Record<AvatarSize, { fontSize: number; lineHeight: number }> = {
  xs: { fontSize: theme.typography.labelS.fontSize, lineHeight: theme.typography.labelS.lineHeight },
  sm: { fontSize: theme.icon.md, lineHeight: theme.icon.md * 1.4 },
  md: { fontSize: theme.icon.md, lineHeight: theme.icon.md * 1.4 },
  lg: { fontSize: theme.icon.xl, lineHeight: theme.icon.xl * 1.4 },
  xl: { fontSize: theme.icon['2xl'], lineHeight: theme.icon['2xl'] * 1.4 }
};

export function Avatar({
  accessibilityLabel,
  initial = 'A',
  selected = false,
  size = 'xl',
  source,
  style,
  type = source ? 'image' : 'initial'
}: AvatarProps) {
  const t = useTheme();
  const dimension = avatarDimensions[size];
  const showImage = type === 'image' && source;
  const initialText = initial.trim().slice(0, 1).toUpperCase() || 'A';
  const initialStyle = initialTypography[size];

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityLabel ? 'image' : undefined}
      style={[
        styles.avatar,
        {
          backgroundColor: t.color.fill.accent.OLDdefault,
          borderColor: selected ? t.color.border.brand.default : t.color.border.neutral.subtle,
          borderWidth: selected ? theme.border.md : theme.border.sm,
          height: dimension,
          width: dimension
        },
        style
      ]}
    >
      {showImage ? (
        <Image source={source} style={styles.avatarImage} />
      ) : (
        <Text
          numberOfLines={1}
          style={[
            {
              color: t.color.text.neutral.inverse,
              fontFamily: t.typography.paragraphM.fontFamily,
              fontSize: initialStyle.fontSize,
              lineHeight: initialStyle.lineHeight,
              textAlign: 'center'
            }
          ]}
        >
          {initialText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  avatarImage: {
    height: '100%',
    width: '100%'
  }
});
