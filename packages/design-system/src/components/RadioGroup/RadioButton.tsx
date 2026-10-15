import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle
} from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import {
  getRadioIndicatorStyles,
  getRadioLabelColor,
  getRadioLayout,
  getRadioTouchSize
} from './getRadioStyles';

const RADIO_ANIMATION_MS = 200;
const RADIO_TRANSITION_EASING = 'cubic-bezier(0, 0, 0.2, 1)';

type WebTransitionStyle = ViewStyle & {
  transitionDuration?: string;
  transitionProperty?: string;
  transitionTimingFunction?: string;
};

export type RadioButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Figma `hideLabel` — render indicator only. */
  hideLabel?: boolean;
  label?: string;
  /** Figma `selected` property. */
  selected?: boolean;
  /** Figma `error` — red outline when unselected. */
  error?: boolean;
  style?: StyleProp<ViewStyle>;
};

type RadioIndicatorProps = {
  error: boolean;
  isDisabled: boolean;
  selected: boolean;
};

function RadioIndicatorWeb({ error, isDisabled, selected }: RadioIndicatorProps) {
  const t = useTheme();
  const layout = getRadioLayout();
  const unselectedIndicator = getRadioIndicatorStyles(t.color, false, isDisabled, error);
  const selectedIndicator = getRadioIndicatorStyles(t.color, true, isDisabled, error);
  const innerSize = selected ? layout.dotSize : layout.ringInnerSize;

  const outerStyle: WebTransitionStyle = {
    alignItems: 'center',
    backgroundColor: selected
      ? selectedIndicator.outerBackgroundColor
      : unselectedIndicator.outerBackgroundColor,
    borderRadius: theme.radius.full,
    height: layout.size,
    justifyContent: 'center',
    transitionDuration: `${RADIO_ANIMATION_MS}ms`,
    transitionProperty: 'background-color',
    transitionTimingFunction: RADIO_TRANSITION_EASING,
    width: layout.size
  };

  const innerStyle: WebTransitionStyle = {
    backgroundColor: selected
      ? selectedIndicator.innerBackgroundColor
      : unselectedIndicator.innerBackgroundColor,
    borderRadius: theme.radius.full,
    height: innerSize,
    transitionDuration: `${RADIO_ANIMATION_MS}ms`,
    transitionProperty: 'width, height, background-color',
    transitionTimingFunction: RADIO_TRANSITION_EASING,
    width: innerSize
  };

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        alignItems: 'center',
        borderRadius: theme.radius.full,
        justifyContent: 'center',
        padding: layout.touchTargetPadding
      }}
    >
      <View style={outerStyle}>
        <View style={innerStyle} />
      </View>
    </View>
  );
}

function RadioIndicatorNative({ error, isDisabled, selected }: RadioIndicatorProps) {
  const t = useTheme();
  const layout = getRadioLayout();
  const unselectedIndicator = getRadioIndicatorStyles(t.color, false, isDisabled, error);
  const selectedIndicator = getRadioIndicatorStyles(t.color, true, isDisabled, error);
  const selectionProgress = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(selectionProgress, {
      duration: RADIO_ANIMATION_MS,
      easing: Easing.out(Easing.cubic),
      toValue: selected ? 1 : 0,
      useNativeDriver: false
    }).start();
  }, [selected, selectionProgress]);

  const animatedOuterBackgroundColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      unselectedIndicator.outerBackgroundColor,
      selectedIndicator.outerBackgroundColor
    ]
  });

  const animatedInnerBackgroundColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      unselectedIndicator.innerBackgroundColor,
      selectedIndicator.innerBackgroundColor
    ]
  });

  const animatedInnerSize = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [layout.ringInnerSize, layout.dotSize]
  });

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        alignItems: 'center',
        borderRadius: theme.radius.full,
        justifyContent: 'center',
        padding: layout.touchTargetPadding
      }}
    >
      <Animated.View
        style={{
          alignItems: 'center',
          backgroundColor: animatedOuterBackgroundColor,
          borderRadius: theme.radius.full,
          height: layout.size,
          justifyContent: 'center',
          width: layout.size
        }}
      >
        <Animated.View
          style={{
            backgroundColor: animatedInnerBackgroundColor,
            borderRadius: theme.radius.full,
            height: animatedInnerSize,
            width: animatedInnerSize
          }}
        />
      </Animated.View>
    </View>
  );
}

function RadioIndicator(props: RadioIndicatorProps) {
  if (Platform.OS === 'web') {
    return <RadioIndicatorWeb {...props} />;
  }

  return <RadioIndicatorNative {...props} />;
}

export function RadioButton({
  hideLabel = false,
  label = 'Label',
  selected = false,
  error = false,
  disabled,
  style,
  accessibilityRole = 'radio',
  accessibilityState,
  ...props
}: RadioButtonProps) {
  const t = useTheme();
  const layout = getRadioLayout();
  const touchSize = getRadioTouchSize();
  const isDisabled = Boolean(disabled);
  const labelColor = getRadioLabelColor(t.color, isDisabled);

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
      style={({ pressed }) => [
        {
          alignItems: 'center',
          alignSelf: 'stretch',
          flexDirection: 'row',
          gap: layout.gap,
          minHeight: touchSize,
          opacity: pressed && !isDisabled ? 0.92 : 1,
          width: '100%'
        },
        style
      ]}
    >
      <RadioIndicator error={error} isDisabled={isDisabled} selected={selected} />
      {!hideLabel ? (
        <Text style={[t.typography.paragraphM, { color: labelColor }]}>{label}</Text>
      ) : null}
    </Pressable>
  );
}
