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
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon/Icon';
import { icons, type IconName } from '../Icon/icons';

export type BottomNavigationItem = {
  id: string;
  icon: IconName;
  label: string;
  accessibilityLabel?: string;
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

export const BOTTOM_NAVIGATION_HEIGHT = theme.size['1600'] + theme.space['200'];
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
    : BOTTOM_NAVIGATION_HEIGHT - defaultBottomPadding;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: t.color.fill.neutral.surface,
          height: baseHeight + resolvedBottomPadding,
          paddingBottom: resolvedBottomPadding
        },
        getShadow(t.elevation.sm),
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
  const progress = useRef(new Animated.Value(selected ? 1 : 0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);
  const isPrimary = item.variant === 'primary';
  const selectedIcon = item.selectedIcon ?? resolveSelectedIcon(item.icon);
  const iconColor = isPrimary ? 'neutral.inverse' : 'neutral.secondary';
  const selectedIconColor = isPrimary ? 'neutral.inverse' : 'neutral.primary';
  const labelColor = selected ? t.color.text.neutral.primary : t.color.text.neutral.secondary;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      progress.setValue(selected ? 1 : 0);
      return;
    }

    Animated.timing(progress, {
      duration: 180,
      toValue: selected ? 1 : 0,
      useNativeDriver: true
    }).start();
  }, [progress, reduceMotion, selected]);

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
      accessibilityState={{ selected }}
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
          isPrimary ? { backgroundColor: t.color.fill.brand.default } : undefined
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
    minHeight: theme.size['1100']
  },
  selectedIndicator: {
    height: theme.space['050'],
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%'
  },
  iconArea: {
    alignItems: 'center',
    borderRadius: theme.radius.full,
    height: theme.size['1200'],
    justifyContent: 'center',
    marginTop: theme.space['200'],
    width: theme.size['1200']
  },
  primaryIconArea: {
    height: theme.size['1600'],
    marginTop: theme.space['0'],
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
  label: {
    marginTop: theme.space['100'],
    maxWidth: '100%',
    paddingHorizontal: theme.space['100'],
    textAlign: 'center'
  }
});
