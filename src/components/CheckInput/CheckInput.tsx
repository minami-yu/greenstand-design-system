import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../Icon/Icon';
import {
  getCheckInputIndicatorStyles,
  getCheckInputLayout,
  getCheckInputTouchSize
} from './getCheckInputStyles';

const CHECK_INPUT_ANIMATION_MS = 150;
const CHECK_INPUT_TRANSITION_EASING = 'cubic-bezier(0, 0, 0.2, 1)';

type WebTransitionStyle = ViewStyle & {
  transitionDuration?: string;
  transitionProperty?: string;
  transitionTimingFunction?: string;
};

export type CheckInputProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Figma `selected` property. */
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

type CheckInputIndicatorProps = {
  isDisabled: boolean;
  selected: boolean;
};

function CheckInputIndicatorWeb({ isDisabled, selected }: CheckInputIndicatorProps) {
  const t = useTheme();
  const layout = getCheckInputLayout();
  const unselectedIndicator = getCheckInputIndicatorStyles(t.color, false, isDisabled);
  const selectedIndicator = getCheckInputIndicatorStyles(t.color, true, isDisabled);
  const colors = selected ? selectedIndicator : unselectedIndicator;

  const outerStyle: WebTransitionStyle = {
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    borderRadius: theme.radius.full,
    height: layout.size,
    justifyContent: 'center',
    transitionDuration: `${CHECK_INPUT_ANIMATION_MS}ms`,
    transitionProperty: 'background-color',
    transitionTimingFunction: CHECK_INPUT_TRANSITION_EASING,
    width: layout.size
  };

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={outerStyle}
    >
      {selected ? (
        <Icon
          color={colors.checkColor}
          name="check"
          size="sm"
          style={{ height: layout.checkIconSize, width: layout.checkIconSize }}
        />
      ) : (
        <View
          style={{
            backgroundColor: colors.innerBackgroundColor,
            borderRadius: theme.radius.full,
            height: colors.innerSize,
            width: colors.innerSize
          }}
        />
      )}
    </View>
  );
}

function CheckInputIndicatorNative({ isDisabled, selected }: CheckInputIndicatorProps) {
  const t = useTheme();
  const layout = getCheckInputLayout();
  const unselectedIndicator = getCheckInputIndicatorStyles(t.color, false, isDisabled);
  const selectedIndicator = getCheckInputIndicatorStyles(t.color, true, isDisabled);
  const selectionProgress = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(selectionProgress, {
      duration: CHECK_INPUT_ANIMATION_MS,
      easing: Easing.out(Easing.cubic),
      toValue: selected ? 1 : 0,
      useNativeDriver: false
    }).start();
  }, [selected, selectionProgress]);

  const animatedBackgroundColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      unselectedIndicator.backgroundColor,
      selectedIndicator.backgroundColor
    ]
  });

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        alignItems: 'center',
        backgroundColor: animatedBackgroundColor,
        borderRadius: theme.radius.full,
        height: layout.size,
        justifyContent: 'center',
        width: layout.size
      }}
    >
      {selected ? (
        <Icon color={selectedIndicator.checkColor} name="check" size="sm" />
      ) : (
        <View
          style={{
            backgroundColor: unselectedIndicator.innerBackgroundColor,
            borderRadius: theme.radius.full,
            height: unselectedIndicator.innerSize,
            width: unselectedIndicator.innerSize
          }}
        />
      )}
    </Animated.View>
  );
}

function CheckInputIndicator(props: CheckInputIndicatorProps) {
  if (Platform.OS === 'web') {
    return <CheckInputIndicatorWeb {...props} />;
  }

  return <CheckInputIndicatorNative {...props} />;
}

export function CheckInput({
  selected = false,
  onSelectedChange,
  disabled,
  style,
  accessibilityRole = 'checkbox',
  accessibilityState,
  ...props
}: CheckInputProps) {
  const layout = getCheckInputLayout();
  const touchSize = getCheckInputTouchSize();
  const isDisabled = Boolean(disabled);

  return (
    <Pressable
      {...props}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        ...accessibilityState,
        checked: selected,
        disabled: isDisabled
      }}
      disabled={disabled}
      onPress={() => {
        if (!isDisabled) {
          onSelectedChange?.(!selected);
        }
      }}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          height: touchSize,
          justifyContent: 'center',
          opacity: pressed && !isDisabled ? 0.92 : 1,
          padding: layout.padding,
          width: touchSize
        },
        style
      ]}
    >
      <CheckInputIndicator isDisabled={isDisabled} selected={selected} />
    </Pressable>
  );
}
