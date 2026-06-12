import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import StorybookUI from './.storybook';
import { Card } from './src/components/Card/Card';
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
      <Card />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: theme.space['400']
  }
});

export default IS_STORYBOOK ? StorybookUI : App;
