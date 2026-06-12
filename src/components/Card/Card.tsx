import { Text } from 'react-native';
import { Box } from '../Box/Box';
import { getShadow } from '../../theme/getShadow';
import { useTheme } from '../../theme/useTheme';

export function Card() {
  const t = useTheme();

  return (
    <Box
      p="400"
      gap="200"
      radius="md"
      style={[
        {
          backgroundColor: t.color.background.neutral.surface,
          borderColor: t.color.border.neutral.subtle,
          borderWidth: t.stroke.sm,
          maxWidth: 340
        },
        getShadow(t.elevation.sm)
      ]}
    >
      <Text
        style={[
          t.typography['label-s-strong'],
          { color: t.color.text.brand.default, textTransform: 'uppercase' }
        ]}
      >
        Design System Sandbox
      </Text>
      <Text style={[t.typography['heading-s'], { color: t.color.text.neutral.primary }]}>
        Expo, Storybook, and tokens are wired together.
      </Text>
      <Text style={[t.typography['paragraph-m'], { color: t.color.text.neutral.secondary }]}>
        Update the W3C token JSON files, rebuild with Style Dictionary, and consume typed theme
        values across React Native components.
      </Text>
    </Box>
  );
}
