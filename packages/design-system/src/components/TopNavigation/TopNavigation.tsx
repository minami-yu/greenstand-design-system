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
import { Avatar } from '../Avatar/Avatar';
import { Badge, type BadgeProps } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import {
  Logo,
  type GreenstandLogoVariant,
  type TreetrackerLogoVariant
} from '../Logo/Logo';

type TopNavigationActionProps = {
  accessibilityLabel?: string;
  onPress?: PressableProps['onPress'];
};

export type TopNavigationLeftVariant =
  | ({ type: 'back' } & TopNavigationActionProps)
  | ({ type: 'close' } & TopNavigationActionProps)
  | {
    type: 'logo';
    accessibilityLabel?: string;
    logoVariant?: GreenstandLogoVariant;
  }
  | {
    type: 'label';
    label: string;
  }
  | {
    type: 'treetrackerLogo';
    accessibilityLabel?: string;
    logoVariant?: TreetrackerLogoVariant;
  };

export type TopNavigationCenterVariant =
  | {
    type: 'label';
    label: string;
  }
  | {
    type: 'labelAvatar';
    accessibilityLabel?: string;
    avatarSource?: ImageSourcePropType;
    label: string;
  };

export type TopNavigationRightVariant =
  | ({ type: 'menu' } & TopNavigationActionProps)
  | ({ type: 'info' } & TopNavigationActionProps)
  | ({ type: 'language' } & TopNavigationActionProps)
  | {
    type: 'infoMenu';
    infoAccessibilityLabel?: string;
    menuAccessibilityLabel?: string;
    onInfoPress?: PressableProps['onPress'];
    onMenuPress?: PressableProps['onPress'];
  }
  | {
    type: 'languageMenu';
    languageAccessibilityLabel?: string;
    menuAccessibilityLabel?: string;
    onLanguagePress?: PressableProps['onPress'];
    onMenuPress?: PressableProps['onPress'];
  }
  | {
    type: 'menuInfo';
    infoAccessibilityLabel?: string;
    menuAccessibilityLabel?: string;
    onInfoPress?: PressableProps['onPress'];
    onMenuPress?: PressableProps['onPress'];
  }
  | {
    type: 'menuLanguage';
    languageAccessibilityLabel?: string;
    menuAccessibilityLabel?: string;
    onLanguagePress?: PressableProps['onPress'];
    onMenuPress?: PressableProps['onPress'];
  }
  | ({
    type: 'notification';
    badgeType?: BadgeProps['type'];
    badgeValue?: string;
  } & TopNavigationActionProps);

export type TopNavigationProps = {
  centerVariant?: TopNavigationCenterVariant;
  leftVariant?: TopNavigationLeftVariant;
  rightVariant?: TopNavigationRightVariant;
  style?: StyleProp<ViewStyle>;
};

export const TOP_NAVIGATION_HEIGHT = theme.size['1200'] + theme.space['200'];

export function TopNavigation({
  centerVariant,
  leftVariant,
  rightVariant,
  style
}: TopNavigationProps) {
  const t = useTheme();

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: t.color.fill.neutral.surface },
        style
      ]}
    >
      <View style={[styles.sideSlot, styles.leftSlot]}>
        {leftVariant ? renderLeftVariant(leftVariant) : null}
      </View>
      <View pointerEvents={centerVariant ? 'auto' : 'none'} style={styles.centerSlot}>
        {centerVariant ? renderCenterVariant(centerVariant) : null}
      </View>
      <View style={[styles.sideSlot, styles.rightSlot]}>
        {rightVariant ? renderRightVariant(rightVariant) : null}
      </View>
    </View>
  );
}

function renderLeftVariant(variant: TopNavigationLeftVariant) {
  switch (variant.type) {
    case 'back':
      return (
        <NavigationIconButton
          accessibilityLabel={variant.accessibilityLabel ?? 'Back'}
          icon="arrow-left"
          onPress={variant.onPress}
        />
      );
    case 'close':
      return (
        <NavigationIconButton
          accessibilityLabel={variant.accessibilityLabel ?? 'Close'}
          icon="close"
          onPress={variant.onPress}
        />
      );
    case 'logo':
      return (
        <View style={styles.leftIconFrame}>
          <Logo
            accessibilityLabel={variant.accessibilityLabel}
            name="greenstand"
            size="md"
            variant={variant.logoVariant}
          />
        </View>
      );
    case 'label':
      return (
        <View style={styles.leftLabelFrame}>
          <NavigationLabel label={variant.label} position="left" />
        </View>
      );
    case 'treetrackerLogo':
      return (
        <View style={styles.leftTreetrackerFrame}>
          <Logo
            accessibilityLabel={variant.accessibilityLabel}
            name="treetracker"
            size="md"
            variant={variant.logoVariant}
          />
        </View>
      );
    default:
      return null;
  }
}

function renderCenterVariant(variant: TopNavigationCenterVariant) {
  switch (variant.type) {
    case 'label':
      return <NavigationLabel label={variant.label} position="center" />;
    case 'labelAvatar':
      return <LabelAvatar variant={variant} />;
    default:
      return null;
  }
}

function renderRightVariant(variant: TopNavigationRightVariant) {
  switch (variant.type) {
    case 'menu':
      return (
        <NavigationIconButton
          accessibilityLabel={variant.accessibilityLabel ?? 'Menu'}
          icon="cog-outline"
          onPress={variant.onPress}
        />
      );
    case 'info':
      return (
        <NavigationIconButton
          accessibilityLabel={variant.accessibilityLabel ?? 'Info'}
          icon="help-circle-outline"
          onPress={variant.onPress}
        />
      );
    case 'language':
      return (
        <NavigationIconButton
          accessibilityLabel={variant.accessibilityLabel ?? 'Language'}
          icon="web"
          onPress={variant.onPress}
        />
      );
    case 'infoMenu':
    case 'menuInfo':
      return (
        <View style={styles.actionGroup}>
          <NavigationIconButton
            accessibilityLabel={variant.infoAccessibilityLabel ?? 'Info'}
            icon="help-circle-outline"
            onPress={variant.onInfoPress}
          />
          <NavigationIconButton
            accessibilityLabel={variant.menuAccessibilityLabel ?? 'Menu'}
            icon="cog-outline"
            onPress={variant.onMenuPress}
          />
        </View>
      );
    case 'languageMenu':
    case 'menuLanguage':
      return (
        <View style={styles.actionGroup}>
          <NavigationIconButton
            accessibilityLabel={variant.languageAccessibilityLabel ?? 'Language'}
            icon="web"
            onPress={variant.onLanguagePress}
          />
          <NavigationIconButton
            accessibilityLabel={variant.menuAccessibilityLabel ?? 'Menu'}
            icon="cog-outline"
            onPress={variant.onMenuPress}
          />
        </View>
      );
    case 'notification':
      return (
        <NavigationIconButton
          accessibilityLabel={variant.accessibilityLabel ?? 'Notifications'}
          badgeType={variant.badgeType ?? 'label'}
          badgeValue={variant.badgeValue ?? '1'}
          icon="notifications-none"
          onPress={variant.onPress}
        />
      );
    default:
      return null;
  }
}

function NavigationIconButton({
  accessibilityLabel,
  badgeType,
  badgeValue,
  icon,
  onPress
}: {
  accessibilityLabel?: string;
  badgeType?: BadgeProps['type'];
  badgeValue?: string;
  icon: 'arrow-left' | 'close' | 'cog-outline' | 'help-circle-outline' | 'notifications-none' | 'web';
  onPress?: PressableProps['onPress'];
}) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={styles.iconButton}
    >
      <Icon color="neutral.primary" name={icon} size="lg" />
      {badgeValue || badgeType === 'dot' ? (
        <Badge
          accessibilityLabel={badgeType === 'dot' ? undefined : badgeValue}
          size="md"
          style={styles.badge}
          type={badgeType ?? 'label'}
          value={badgeValue ?? '1'}
        />
      ) : null}
    </Pressable>
  );
}

function NavigationLabel({
  label,
  position
}: {
  label: string;
  position: 'center' | 'left';
}) {
  const t = useTheme();

  return (
    <Text
      numberOfLines={1}
      style={[
        position === 'center' ? t.typography.labelM : t.typography.headingM,
        styles.label,
        { color: t.color.text.neutral.primary }
      ]}
    >
      {label}
    </Text>
  );
}

function LabelAvatar({ variant }: { variant: Extract<TopNavigationCenterVariant, { type: 'labelAvatar' }> }) {
  const t = useTheme();

  return (
    <View style={styles.labelAvatar}>
      {variant.avatarSource ? (
        <Avatar
          accessibilityLabel={variant.accessibilityLabel}
          size="sm"
          source={variant.avatarSource}
        />
      ) : (
        <Avatar
          accessibilityLabel={variant.accessibilityLabel}
          initial={variant.label}
          size="sm"
          type="initial"
        />
      )}
      <Text
        numberOfLines={1}
        style={[t.typography.labelM, styles.label, { color: t.color.text.neutral.primary }]}
      >
        {variant.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    height: TOP_NAVIGATION_HEIGHT,
    justifyContent: 'space-between',
    paddingHorizontal: theme.space['200'],
    width: '100%'
  },
  sideSlot: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  leftSlot: {
    justifyContent: 'flex-start'
  },
  centerSlot: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: theme.size['1200'] + theme.space['400'],
    position: 'absolute',
    right: theme.size['1200'] + theme.space['400'],
    top: 0
  },
  rightSlot: {
    justifyContent: 'flex-end'
  },
  actionGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['100']
  },
  leftIconFrame: {
    alignItems: 'center',
    height: theme.size['1100'],
    justifyContent: 'center',
    width: theme.size['1100']
  },
  leftLabelFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.space['200']
  },
  leftTreetrackerFrame: {
    height: theme.size['1100'],
    justifyContent: 'center',
    paddingHorizontal: theme.space['200']
  },
  iconButton: {
    alignItems: 'center',
    height: theme.size['1100'],
    justifyContent: 'center',
    width: theme.size['1100']
  },
  badge: {
    position: 'absolute',
    right: theme.space['100'],
    top: theme.space['050']
  },
  label: {
    flexShrink: 1,
    textAlign: 'center'
  },
  labelAvatar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['200'],
    minWidth: 0
  },
});
