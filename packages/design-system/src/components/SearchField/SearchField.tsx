import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Icon } from '../Icon/Icon';
import { microphoneSvg } from './assets/microphone';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type SearchFieldVariant = 'default' | 'outlined' | 'surface';

export type SearchFieldProps = TextInputProps & {
  onVoicePress?: () => void;
  showAudio?: boolean;
  variant?: SearchFieldVariant;
};

export function SearchField({
  defaultValue,
  onBlur,
  onChangeText,
  onFocus,
  onVoicePress,
  showAudio = true,
  style,
  value,
  variant = 'outlined',
  ...props
}: SearchFieldProps) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  const inputValue = value ?? uncontrolledValue;
  const showClear = focused || inputValue.length > 0;

  const updateValue = (nextValue: string) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onChangeText?.(nextValue);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variant === 'default' ? t.color.fill.neutral.subtle : t.color.fill.neutral.surface,
          borderColor: t.color.border.neutral.default,
          borderWidth: variant === 'outlined' ? theme.border.sm : theme.size['0']
        }
      ]}
    >
      <Icon name="magnify" size="lg" color="neutral.tertiary" />
      <TextInput
        accessibilityLabel="Search"
        placeholder="Search"
        returnKeyType="search"
        {...props}
        onBlur={event => {
          setFocused(false);
          onBlur?.(event);
        }}
        onChangeText={updateValue}
        onFocus={event => {
          setFocused(true);
          onFocus?.(event);
        }}
        placeholderTextColor={t.color.text.neutral.placeholder}
        style={[t.typography.paragraphM, styles.input, { color: t.color.text.neutral.primary }, style]}
        value={inputValue}
      />
      {showClear ? (
        <Pressable accessibilityLabel="Clear search" accessibilityRole="button" onPress={() => updateValue('')} style={styles.action}>
          <Icon name="close-circle" size="lg" color="neutral.tertiary" />
        </Pressable>
      ) : showAudio ? (
        <Pressable accessibilityLabel="Voice search" accessibilityRole="button" accessibilityState={{ disabled: !onVoicePress }} disabled={!onVoicePress} onPress={onVoicePress} style={styles.action}>
          <SvgXml xml={microphoneSvg} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    height: theme.size['1100'],
    justifyContent: 'center',
    marginHorizontal: theme.space.n200,
    width: theme.size['1100']
  },
  container: {
    alignItems: 'center',
    borderRadius: theme.radius.full,
    flex: 1,
    flexDirection: 'row',
    gap: theme.space['200'],
    height: theme.size['1200'],
    paddingHorizontal: theme.space['400']
  },
  input: {
    flex: 1,
    minWidth: theme.size['0'],
    padding: theme.space['0']
  }
});
