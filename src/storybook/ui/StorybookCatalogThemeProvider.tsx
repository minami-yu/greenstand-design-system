import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { useAppFonts } from '../../theme/fonts';

/** Internal wrapper — catalog components include this so MDX does not need a custom preview shell. */
export function StorybookCatalogThemeProvider({ children }: PropsWithChildren) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <ThemeProvider mode="light" typographyMode="desktop">
      <View style={{ width: '100%' }}>{children}</View>
    </ThemeProvider>
  );
}
