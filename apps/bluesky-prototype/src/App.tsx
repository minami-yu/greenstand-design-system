import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useAppFonts } from '@greenstand/design-system';
import { AppNavigator } from './navigation/AppNavigator';
import { TouchIndicator } from './dev/TouchIndicator';

export default function App() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        {__DEV__ ? (
          <TouchIndicator>
            <AppNavigator />
          </TouchIndicator>
        ) : (
          <AppNavigator />
        )}
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
