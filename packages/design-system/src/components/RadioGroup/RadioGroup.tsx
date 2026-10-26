import { Text, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { Icon } from '../Icon/Icon';
import { useTheme } from '../../theme/useTheme';
import { getRadioLayout } from './getRadioStyles';
import { RadioButton } from './RadioButton';

export type RadioGroupOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type RadioGroupProps = ViewProps & {
  label?: string;
  /** Figma `hideLabel` — omit the group label above the options. */
  hideLabel?: boolean;
  options: RadioGroupOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  /** Figma `error` — red indicator styling and error message below the options. */
  error?: boolean;
  /** Figma `errorText` — message shown below options when `error` is true. */
  errorText?: string;
  /** Figma `hint` — show helper text below the options. */
  hint?: boolean;
  /** Figma `hintText` — helper copy below the options. */
  hintText?: string;
  style?: StyleProp<ViewStyle>;
};

export function RadioGroup({
  label = 'Label',
  hideLabel = false,
  options,
  value,
  onValueChange,
  style,
  error = false,
  errorText = 'Error message',
  hint = true,
  hintText = 'Hint message',
  ...props
}: RadioGroupProps) {
  const t = useTheme();
  const layout = getRadioLayout();

  return (
    <View
      {...props}
      accessibilityRole="radiogroup"
      style={[{ gap: layout.groupLabelGap, overflow: 'visible' }, style]}
    >
      {!hideLabel ? (
        <Text style={[t.typography.labelMStrong, { color: t.color.text.neutral.primary }]}>
          {label}
        </Text>
      ) : null}

      <View
        style={{
          alignSelf: 'stretch',
          gap: layout.optionGap,
          marginLeft: layout.groupSlotMarginLeft,
          overflow: 'visible',
          paddingRight: layout.groupSlotPaddingRight,
          paddingVertical: layout.groupSlotPaddingVertical,
          width: '100%'
        }}
      >
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <RadioButton
              key={option.value}
              disabled={option.disabled}
              error={error}
              label={option.label}
              onPress={() => onValueChange?.(option.value)}
              selected={selected}
            />
          );
        })}
      </View>

      {error ? (
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
            gap: layout.groupHintGap
          }}
        >
          <Icon
            accessibilityElementsHidden
            color="error.default"
            importantForAccessibility="no-hide-descendants"
            name="information"
            size="md"
          />
          <Text
            style={[t.typography.paragraphM, { color: t.color.text.error.default, flex: 1 }]}
          >
            {errorText}
          </Text>
        </View>
      ) : hint ? (
        <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>
          {hintText}
        </Text>
      ) : null}
    </View>
  );
}
