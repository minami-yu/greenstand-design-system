import { useColorScheme } from 'react-native';
import { theme, themes, typographies, type ThemeMode } from './tokens';
import { useThemeModePreference, useTypographyMode } from './ThemeProvider';

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
  const typographyMode = useTypographyMode();
  const scheme = useColorScheme();
  const mode = resolveThemeMode(preference, scheme);
  const activeTheme = themes[mode] as typeof theme;

  return {
    ...activeTheme,
    typography: typographies[typographyMode]
  } as typeof theme;
}
