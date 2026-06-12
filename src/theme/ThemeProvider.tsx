import { createContext, useContext, type PropsWithChildren } from 'react';
import type { ThemeMode } from './tokens';

export type ThemeModePreference = ThemeMode | 'system';

const ThemeModeContext = createContext<ThemeModePreference>('system');

export function ThemeProvider({
  mode = 'system',
  children
}: PropsWithChildren<{ mode?: ThemeModePreference }>) {
  return <ThemeModeContext.Provider value={mode}>{children}</ThemeModeContext.Provider>;
}

/** Optional Storybook / app override; defaults to following the OS color scheme. */
export function useThemeModePreference(): ThemeModePreference {
  return useContext(ThemeModeContext);
}
