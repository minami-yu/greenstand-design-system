import { useEffect, useState } from 'react';

import Inter_400RegularUrl from '@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf?url';
import Inter_500MediumUrl from '@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf?url';
import Inter_600SemiBoldUrl from '@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf?url';
import Inter_700BoldUrl from '@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf?url';
import Montserrat_700BoldUrl from '@expo-google-fonts/montserrat/700Bold/Montserrat_700Bold.ttf?url';

const webFonts = [
  ['Inter_400Regular', Inter_400RegularUrl, '400'],
  ['Inter_500Medium', Inter_500MediumUrl, '500'],
  ['Inter_600SemiBold', Inter_600SemiBoldUrl, '600'],
  ['Inter_700Bold', Inter_700BoldUrl, '700'],
  ['Montserrat_700Bold', Montserrat_700BoldUrl, '700']
] as const;

let fontsPromise: Promise<void> | undefined;

function loadWebFonts() {
  fontsPromise ??= Promise.all(
    webFonts.map(async ([family, source, weight]) => {
      const font = new FontFace(family, `url(${source})`, { weight });
      document.fonts.add(await font.load());
    })
  ).then(() => undefined);

  return fontsPromise;
}

/**
 * Registers the same bundled font files and family names that Expo Font uses
 * on native, without loading Expo's native module runtime in the browser.
 */
export function useAppFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    loadWebFonts().then(() => {
      if (active) setLoaded(true);
    });

    return () => {
      active = false;
    };
  }, []);

  return loaded;
}
