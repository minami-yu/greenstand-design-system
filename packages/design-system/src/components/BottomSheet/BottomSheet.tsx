import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
  type ViewProps
} from 'react-native';
import { useContext, type ReactNode } from 'react';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { getShadow } from '../../theme/getShadow';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon/Icon';

export type BottomSheetTitleAlign = 'center' | 'left';

export type BottomSheetProps = {
  /** Bottom inset from the hosting screen's safe-area context. */
  bottomPadding?: number;
  children?: ReactNode;
  closeAccessibilityLabel?: string;
  contentStyle?: StyleProp<ViewStyle>;
  /** Presentation wrapper supplies drag handlers for the header only. */
  headerGestureHandlers?: ViewProps;
  modal?: boolean;
  onClose?: PressableProps['onPress'];
  showCloseButton?: boolean;
  showHandle?: boolean;
  showTitle?: boolean;
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleAlign?: BottomSheetTitleAlign;
};

export function BottomSheet({
  bottomPadding,
  children,
  closeAccessibilityLabel = 'Close bottom sheet',
  contentStyle,
  headerGestureHandlers,
  modal = false,
  onClose,
  showCloseButton = true,
  showHandle = true,
  showTitle = true,
  style,
  title = 'Title',
  titleAlign = 'left'
}: BottomSheetProps) {
  const t = useTheme();
  const insets = useContext(SafeAreaInsetsContext);
  const safeBottom = Math.max(theme.space['400'], insets?.bottom ?? 0, bottomPadding ?? 0);
  const titleCentered = titleAlign === 'center';

  const sheet = (
    <View
      style={[
        styles.sheet,
        {
          backgroundColor: t.color.fill.neutral.surface
        },
        !modal ? getShadow(theme.elevation.lg) : undefined,
        style,
        { paddingBottom: safeBottom }
      ]}
    >
      <View {...headerGestureHandlers} style={[styles.header, showHandle && !showCloseButton ? styles.handleHeader : undefined]}>
        {showCloseButton ? (
          <Pressable
            accessibilityLabel={closeAccessibilityLabel}
            accessibilityRole="button"
            onPress={onClose}
            style={styles.closeButton}
          >
            {({ pressed }) => (
              <View style={[styles.closeButtonSurface, { backgroundColor: pressed ? t.color.fill.neutral.defaultActive : t.color.fill.neutral.default }]}>
                <Icon color="neutral.primary" name="close" size="xs" />
              </View>
            )}
          </Pressable>
        ) : null}
        {showHandle ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={[
              styles.handle,
              {
                backgroundColor: t.color.border.neutral.default
              }
            ]}
          />
        ) : null}
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={[styles.contentArea, titleCentered ? styles.contentAreaCenter : styles.contentAreaLeft, contentStyle]} bounces={false}>
        {showTitle ? (
          <Text
            numberOfLines={2}
            style={[
              t.typography.headingM,
              styles.title,
              titleCentered ? styles.titleCenter : styles.titleLeft,
              { color: t.color.text.neutral.primary }
            ]}
          >
            {title}
          </Text>
        ) : null}
        {children ? <View style={styles.contentSlot}>{children}</View> : null}
      </ScrollView>
    </View>
  );

  if (!modal) {
    return sheet;
  }

  return (
    <View
      style={[
        styles.overlay,
        {
          backgroundColor: t.color.background.neutral.overlay
        }
      ]}
    >
      {sheet}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollArea: { flexGrow: 0, flexShrink: 1 },
  handleHeader: { height: theme.size['1200'] },
  overlay: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    minHeight: theme.size['2400']
  },
  sheet: {
    alignSelf: 'stretch',
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    maxHeight: '100%',
    overflow: 'hidden'
  },
  header: {
    flexShrink: 0,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: theme.space['0'],
    paddingLeft: theme.space['200'],
    paddingRight: theme.space['200'],
    paddingTop: theme.space['200'],
    position: 'relative',
    width: '100%'
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: theme.radius.full,
    height: theme.size['1200'],
    justifyContent: 'center',
    width: theme.size['1200']
  },
  closeButtonSurface: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    height: theme.size['900'],
    width: theme.size['900']
  },
  handle: {
    borderRadius: theme.radius.full,
    height: theme.size['100'],
    left: '50%',
    marginLeft: -theme.size['400'],
    position: 'absolute',
    top: theme.space['300'],
    width: theme.size['800']
  },
  contentArea: {
    overflow: 'hidden',
    paddingHorizontal: theme.space['400'],
    paddingVertical: theme.space['0'],
    width: '100%'
  },
  contentAreaLeft: {
    gap: theme.space['300']
  },
  contentAreaCenter: {
    gap: theme.space['400']
  },
  title: {
    width: '100%'
  },
  titleLeft: {
    textAlign: 'left'
  },
  titleCenter: {
    textAlign: 'center'
  },
  contentSlot: {
    width: '100%'
  }
});
