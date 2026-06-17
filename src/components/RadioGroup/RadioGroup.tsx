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
  /** Figma `error` — red outlines on unselected options and error message styling. */
  error?: boolean;
  /** Figma `errorText` — message shown below options when `error` is true. */
  errorText?: string;
  /** Figma `hint` — show helper text below the options. */
  hint?: boolean;
  /** Figma `hintText` — helper copy below the options. */
  hintText?: string;
  /** Figma `hideLabel` — omit the group label above the options. */
  hideLabel?: boolean;
  label?: string;
  onValueChange?: (value: string) => void;
  options: RadioGroupOption[];
  style?: StyleProp<ViewStyle>;
  value?: string;
};

export function RadioGroup({
  error = false,
  errorText = 'Error message',
  hint = true,
  hintText = 'Hint message',
  hideLabel = false,
  label = 'Label',
  onValueChange,
  options,
  style,
  value,
  ...props
}: RadioGroupProps) {
  const t = useTheme();
  const layout = getRadioLayout();

  return (
    <View
      {...props}
      accessibilityRole="radiogroup"
      style={[{ gap: layout.groupLabelGap }, style]}
    >
      {!hideLabel ? (
        <Text style={[t.typography.labelMStrong, { color: t.color.text.neutral.primary }]}>
          {label}
        </Text>
      ) : null}

      <View
        style={{
          gap: layout.optionGap,
          paddingVertical: layout.groupSlotPaddingVertical
        }}
      >
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <RadioButton
              key={option.value}
              disabled={option.disabled}
              error={error && !selected}
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
          <Icon color="error.default" name="information" size="md" />
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
