import { useColorScheme } from 'react-native';
import { themes, type ThemeMode } from './tokens';

/**
 * Returns the design token theme matching the device color scheme.
 * Falls back to light when the scheme is unknown.
 */
export function useTheme() {
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === 'dark' ? 'dark' : 'light';

  return themes[mode];
}
