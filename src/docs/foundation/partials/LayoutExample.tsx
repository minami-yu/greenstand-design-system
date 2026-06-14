import { Text, View } from 'react-native';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { sbTypography } from '../../ui';

export function LayoutExample() {
  const t = useTheme();

  return (
    <View
      style={{
        alignSelf: 'stretch',
        backgroundColor: t.color.background.neutral.subtle,
        borderRadius: theme.radius.md,
        gap: theme.space['200'],
        padding: theme.space['400']
      }}
    >
      <Text style={[sbTypography['paragraph-m'], { color: t.color.text.neutral.primary }]}>
        Use theme spacing and radius tokens for structural layout.
      </Text>
      <Text style={[sbTypography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
        Keep layout values tokenized so screens stay aligned with the design system.
      </Text>
    </View>
  );
}
