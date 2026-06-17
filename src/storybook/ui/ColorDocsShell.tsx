import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { type ThemeMode } from '../../theme/tokens';
import { StorybookSegmentedToggle } from './StorybookSegmentedToggle';

type ColorDocsContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const colorDocsModeOptions = [
  { accessibilityLabel: 'Light color set', label: 'Light', value: 'light' },
  { accessibilityLabel: 'Dark color set', label: 'Dark', value: 'dark' }
] as const satisfies readonly { accessibilityLabel: string; label: string; value: ThemeMode }[];

const ColorDocsModeContext = createContext<ColorDocsContextValue>({
  mode: 'light',
  setMode: () => { }
});

/** Active color-set mode for semantic swatch / hex values only. */
export function useColorDocsMode(): ThemeMode {
  return useContext(ColorDocsModeContext).mode;
}

/** Segmented light/dark control for semantic color-set data (swatch + hex only). */
export function ColorDocsModeToggle() {
  const { mode, setMode } = useContext(ColorDocsModeContext);

  return (
    <StorybookSegmentedToggle
      onChange={setMode}
      options={colorDocsModeOptions}
      value={mode}
    />
  );
}

/** Provides color-set mode context for semantic list swatches and hex values. */
export function ColorDocsShell({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('light');

  return (
    <ColorDocsModeContext.Provider
      value={{
        mode,
        setMode
      }}
    >
      {children}
    </ColorDocsModeContext.Provider>
  );
}
