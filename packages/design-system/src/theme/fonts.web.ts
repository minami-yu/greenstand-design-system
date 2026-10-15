import { useFonts } from 'expo-font';

import Inter_400RegularUrl from '@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf?url';
import Inter_500MediumUrl from '@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf?url';
import Inter_600SemiBoldUrl from '@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf?url';
import Inter_700BoldUrl from '@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf?url';
import Montserrat_700BoldUrl from '@expo-google-fonts/montserrat/700Bold/Montserrat_700Bold.ttf?url';

/**
 * Web implementation — loads token fonts via Vite asset URLs instead of
 * @expo-google-fonts package entry points (those use require() and break
 * Storybook's static Vite production bundle in the browser).
 */
export function useAppFonts() {
  const [loaded] = useFonts({
    Inter_400Regular: { uri: Inter_400RegularUrl },
    Inter_500Medium: { uri: Inter_500MediumUrl },
    Inter_600SemiBold: { uri: Inter_600SemiBoldUrl },
    Inter_700Bold: { uri: Inter_700BoldUrl },
    Montserrat_700Bold: { uri: Montserrat_700BoldUrl }
  });

  return loaded;
}
