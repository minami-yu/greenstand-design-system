import {
  AccessibilityInfo,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { getShadow } from '../../theme/getShadow';
import { getMotionEasing } from '../../theme/getMotion';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon/Icon';
import { icons, type IconName } from '../Icon/icons';

export type BottomNavigationItem = {
  id: string;
  icon: IconName;
  label: string;
  accessibilityLabel?: string;
  showBadge?: boolean;
  selectedIcon?: IconName;
  variant?: 'default' | 'primary';
};

export type BottomNavigationProps = Omit<PressableProps, 'children' | 'onPress' | 'style'> & {
  activeItem?: string;
  bottomPadding?: number;
  items: BottomNavigationItem[];
  onItemPress?: (item: BottomNavigationItem) => void;
  showLabels?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const BOTTOM_NAVIGATION_HEIGHT = theme.size['1600'];
const BOTTOM_NAVIGATION_ICON_SIZE = theme.icon.lg;

export function BottomNavigation({
  activeItem,
  bottomPadding,
  items,
  onItemPress,
  showLabels = false,
  style,
  ...props
}: BottomNavigationProps) {
  const t = useTheme();
  const defaultBottomPadding = showLabels ? theme.space['200'] : theme.space['400'];
  const resolvedBottomPadding = bottomPadding ?? defaultBottomPadding;
  const baseHeight = showLabels
    ? BOTTOM_NAVIGATION_HEIGHT + theme.space['400'] - defaultBottomPadding
    : theme.size['1200'];

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: t.color.fill.neutral.surface,
          height: baseHeight + resolvedBottomPadding,
          paddingBottom: resolvedBottomPadding
        },
        getShadow(t.elevation.md),
        showLabels ? styles.rootWithLabels : undefined,
        style
      ]}
    >
      {items.map((item) => {
        const selected = item.id === activeItem;

        return (
          <BottomNavigationAction
            key={item.id}
            item={item}
            onItemPress={onItemPress}
            pressableProps={props}
            selected={selected}
            showLabels={showLabels}
          />
        );
      })}
    </View>
  );
}

function BottomNavigationAction({
  item,
  onItemPress,
  pressableProps,
  selected,
  showLabels
}: {
  item: BottomNavigationItem;
  onItemPress?: (item: BottomNavigationItem) => void;
  pressableProps: Omit<PressableProps, 'children' | 'onPress' | 'style'>;
  selected: boolean;
  showLabels: boolean;
}) {
  const t = useTheme();
  const isPrimary = item.variant === 'primary';
  const isSelected = selected && !isPrimary;
  const progress = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);
  const selectedIcon = item.selectedIcon ?? resolveSelectedIcon(item.icon);
  const iconColor = isPrimary ? 'neutral.inverse' : 'neutral.secondary';
  const selectedIconColor = isPrimary ? 'neutral.inverse' : 'neutral.primary';
  const labelColor = isSelected ? t.color.text.neutral.primary : t.color.text.neutral.secondary;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      progress.setValue(isSelected ? 1 : 0);
      return;
    }

    Animated.timing(progress, {
      duration: theme.motion.duration.moderate,
      easing: getMotionEasing(theme.motion.easing.decelerate),
      toValue: isSelected ? 1 : 0,
      useNativeDriver: true
    }).start();
  }, [isSelected, progress, reduceMotion]);

  const selectedOpacity = progress;
  const unselectedOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  const selectedScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1]
  });

  return (
    <Pressable
      {...pressableProps}
      accessibilityLabel={item.accessibilityLabel ?? item.label}
      accessibilityRole="button"
      accessibilityState={isPrimary ? undefined : { selected: isSelected }}
      onPress={() => onItemPress?.(item)}
      style={styles.item}
    >
      <Animated.View
        style={[
          styles.selectedIndicator,
          { backgroundColor: t.color.border.neutral.strong, opacity: selectedOpacity }
        ]}
      />
      <View
        style={[
          styles.iconArea,
          isPrimary ? styles.primaryIconArea : undefined,
          isPrimary ? { backgroundColor: t.color.fill.brand.default } : undefined,
          isPrimary ? getShadow(t.elevation.sm) : undefined
        ]}
      >
        <Animated.View style={[styles.iconLayer, { opacity: unselectedOpacity }]}>
          <Icon color={iconColor} name={item.icon} size="lg" />
        </Animated.View>
        <Animated.View
          style={[
            styles.iconLayer,
            styles.selectedIconLayer,
            { opacity: selectedOpacity, transform: [{ scale: selectedScale }] }
          ]}
        >
          <Icon color={selectedIconColor} name={selectedIcon} size="lg" />
        </Animated.View>
        {item.showBadge && !isPrimary ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[
              styles.badge,
              {
                backgroundColor: t.color.fill.error.emphasis,
                borderColor: t.color.fill.neutral.surface,
                right: isSelected ? theme.icon.xs : theme.space['300']
              }
            ]}
          />
        ) : null}
      </View>
      {showLabels ? (
        <Text numberOfLines={1} style={[t.typography.labelS, styles.label, { color: labelColor }]}>
          {item.label}
        </Text>
      ) : null}
    </Pressable>
  );
}

function resolveSelectedIcon(icon: IconName): IconName {
  if (icon.endsWith('-outline')) {
    const filledIcon = icon.replace(/-outline$/, '') as IconName;

    if (filledIcon in icons) {
      return filledIcon;
    }
  }

  return icon;
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rootWithLabels: {},
  item: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-start',
    height: theme.size['1200']
  },
  selectedIndicator: {
    height: theme.space['050'],
    left: theme.space['300'],
    position: 'absolute',
    right: theme.space['300'],
    top: 0,
  },
  iconArea: {
    alignItems: 'center',
    borderRadius: theme.radius.full,
    height: theme.size['1200'] - theme.space['050'],
    justifyContent: 'center',
    marginTop: theme.space['050'],
    width: theme.size['1200']
  },
  primaryIconArea: {
    height: theme.size['1600'],
    marginTop: theme.space.n800,
    width: theme.size['1600']
  },
  iconLayer: {
    alignItems: 'center',
    height: BOTTOM_NAVIGATION_ICON_SIZE,
    justifyContent: 'center',
    width: BOTTOM_NAVIGATION_ICON_SIZE
  },
  selectedIconLayer: {
    position: 'absolute'
  },
  badge: {
    borderRadius: theme.radius.full,
    borderWidth: theme.border.sm,
    height: theme.size['200'],
    position: 'absolute',
    top: theme.space['300'],
    width: theme.size['200']
  },
  label: {
    marginTop: theme.space['100'],
    maxWidth: '100%',
    paddingHorizontal: theme.space['100'],
    textAlign: 'center'
  }
});
