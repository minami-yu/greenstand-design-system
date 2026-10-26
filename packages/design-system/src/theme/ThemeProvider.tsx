import { createContext, useContext, type PropsWithChildren } from 'react';
import type { ThemeMode, TypographyMode } from './tokens';

export type ThemeModePreference = ThemeMode | 'system';

const ThemeModeContext = createContext<ThemeModePreference>('system');
const TypographyModeContext = createContext<TypographyMode>('mobile');

export function ThemeProvider({
  mode = 'system',
  typographyMode = 'mobile',
  children
}: PropsWithChildren<{ mode?: ThemeModePreference; typographyMode?: TypographyMode }>) {
  return (
    <ThemeModeContext.Provider value={mode}>
      <TypographyModeContext.Provider value={typographyMode}>
        {children}
      </TypographyModeContext.Provider>
    </ThemeModeContext.Provider>
  );
}

/** Optional Storybook / app override; defaults to following the OS color scheme. */
export function useThemeModePreference(): ThemeModePreference {
  return useContext(ThemeModeContext);
}

/** Optional Storybook / app override; defaults to the mobile product scale. */
export function useTypographyMode(): TypographyMode {
  return useContext(TypographyModeContext);
}
