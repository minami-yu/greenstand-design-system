import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { type ThemeMode } from '../../theme/tokens';
import { StorybookSegmentedToggle } from './StorybookSegmentedToggle';

type StorybookColorDocsContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const colorDocsModeOptions = [
  { accessibilityLabel: 'Light color set', label: 'Light', value: 'light' },
  { accessibilityLabel: 'Dark color set', label: 'Dark', value: 'dark' }
] as const satisfies readonly { accessibilityLabel: string; label: string; value: ThemeMode }[];

const StorybookColorDocsModeContext = createContext<StorybookColorDocsContextValue>({
  mode: 'light',
  setMode: () => { }
});

/** Active color-set mode for semantic swatch / hex values only. */
export function useStorybookColorDocsMode(): ThemeMode {
  return useContext(StorybookColorDocsModeContext).mode;
}

/** Segmented light/dark control for semantic color-set data (swatch + hex only). */
export function StorybookColorDocsModeToggle() {
  const { mode, setMode } = useContext(StorybookColorDocsModeContext);

  return (
    <StorybookSegmentedToggle
      onChange={setMode}
      options={colorDocsModeOptions}
      value={mode}
    />
  );
}

/** Provides color-set mode context for semantic list swatches and hex values. */
export function StorybookColorDocsShell({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('light');

  return (
    <StorybookColorDocsModeContext.Provider
      value={{
        mode,
        setMode
      }}
    >
      {children}
    </StorybookColorDocsModeContext.Provider>
  );
}
