import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';

/**
 * Loads every font variant referenced by the compiled design tokens
 * (see FONT_VARIANTS in build.js — the two lists must stay in sync).
 *
 * Returns true once fonts are ready; gate rendering on it:
 *
 *   const fontsLoaded = useAppFonts();
 *   if (!fontsLoaded) return null;
 */
export function useAppFonts() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Montserrat_700Bold
  });

  return loaded;
}
