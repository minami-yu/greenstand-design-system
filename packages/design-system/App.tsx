import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import StorybookUI from './.storybook';
import { useAppFonts } from './src/theme/fonts';
import { theme } from './src/theme/tokens';
import { useTheme } from './src/theme/useTheme';

const IS_STORYBOOK = process.env.STORYBOOK_ENABLED === 'true';

function App() {
  const fontsLoaded = useAppFonts();
  const t = useTheme();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.color.background.neutral.base }]}>
      <StatusBar style="auto" />
      <View
        style={[
          styles.panel,
          {
            backgroundColor: t.color.background.neutral.default,
            borderColor: t.color.border.neutral.subtle
          }
        ]}
      >
        <Text style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>
          Greenstand Design System
        </Text>
        <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>
          Run Storybook to browse components, tokens, and documentation.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: theme.space['400']
  },
  panel: {
    borderRadius: theme.radius.md,
    borderWidth: theme.border.sm,
    gap: theme.space['200'],
    maxWidth: 360,
    padding: theme.space['400']
  }
});

export default IS_STORYBOOK ? StorybookUI : App;
