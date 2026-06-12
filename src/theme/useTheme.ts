import { useColorScheme } from 'react-native';
import { themes, type ThemeMode } from './tokens';
import { useThemeModePreference } from './ThemeProvider';

function resolveThemeMode(
  preference: ReturnType<typeof useThemeModePreference>,
  scheme: ReturnType<typeof useColorScheme>
): ThemeMode {
  if (preference === 'light' || preference === 'dark') {
    return preference;
  }

  return scheme === 'dark' ? 'dark' : 'light';
}

/**
 * Returns the design token theme matching the active color mode.
 * Follows OS color scheme unless a ThemeProvider override is set.
 */
export function useTheme() {
  const preference = useThemeModePreference();
  const scheme = useColorScheme();
  const mode = resolveThemeMode(preference, scheme);

  return themes[mode];
}
