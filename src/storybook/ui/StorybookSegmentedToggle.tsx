import { Pressable, Text, View } from 'react-native';
import { themes, theme } from '../../theme/tokens';
import { storybookRnTypography } from './storybookRnTypography';

export type StorybookSegmentedToggleOption<T extends string> = {
  accessibilityLabel?: string;
  label: string;
  value: T;
};

export type StorybookSegmentedToggleProps<T extends string> = {
  align?: 'left' | 'right';
  marginBottom?: keyof typeof theme.space;
  marginTop?: keyof typeof theme.space;
  onChange: (value: T) => void;
  options: readonly StorybookSegmentedToggleOption<T>[];
  value: T;
};

/** Right-aligned pill segmented control for foundation docs (light chrome). */
export function StorybookSegmentedToggle<T extends string>({
  align = 'right',
  marginBottom = '300',
  marginTop = '200',
  onChange,
  options,
  value
}: StorybookSegmentedToggleProps<T>) {
  const colors = themes.light;

  return (
    <View
      style={{
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
        alignSelf: 'stretch',
        marginBottom: theme.space[marginBottom],
        marginTop: theme.space[marginTop],
        width: '100%'
      }}
    >
      <View
        accessibilityRole="tablist"
        style={{
          backgroundColor: colors.color.fill.neutral.subtle,
          borderRadius: theme.radius.full,
          flexDirection: 'row',
          padding: theme.space['100']
        }}
      >
        {options.map((option, index) => {
          const selected = value === option.value;

          return (
            <View key={option.value} style={{ alignItems: 'center', flexDirection: 'row' }}>
              {index > 0 ? (
                <View
                  style={{
                    backgroundColor: colors.color.border.neutral.subtle,
                    height: theme.space['400'],
                    width: theme.stroke.sm
                  }}
                />
              ) : null}
              <Pressable
                accessibilityLabel={option.accessibilityLabel ?? option.label}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => onChange(option.value)}
                style={({ pressed }) => ({
                  backgroundColor: selected
                    ? colors.color.background.neutral.surface
                    : 'transparent',
                  borderRadius: theme.radius.full,
                  opacity: pressed ? 0.85 : 1,
                  paddingHorizontal: theme.space['400'],
                  paddingVertical: theme.space['200']
                })}
              >
                <Text
                  style={[
                    selected
                      ? storybookRnTypography['label-s-strong']
                      : storybookRnTypography['label-s'],
                    {
                      color: selected
                        ? colors.color.text.neutral.primary
                        : colors.color.text.neutral.secondary
                    }
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}
