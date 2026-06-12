import type { Preview } from '@storybook/react';
import { useColorScheme, View } from 'react-native';
import { useAppFonts } from '../src/theme/fonts';
import { ThemeProvider, type ThemeModePreference } from '../src/theme/ThemeProvider';
import { themes } from '../src/theme/tokens';

function StorybookThemeDecorator({
  mode,
  children
}: {
  mode: ThemeModePreference;
  children: React.ReactNode;
}) {
  const fontsLoaded = useAppFonts();
  const scheme = useColorScheme();
  const resolvedMode =
    mode === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : mode;
  const t = themes[resolvedMode];

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <ThemeProvider mode={mode}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: t.color.background.neutral.default,
          flex: 1,
          justifyContent: 'center',
          minHeight: '100%',
          padding: t.space['400']
        }}
      >
        {children}
      </View>
    </ThemeProvider>
  );
}

const preview: Preview = {
  parameters: {
    // Use token background from the decorator; avoid Storybook's default gray canvas.
    backgrounds: { disable: true }
  },
  globalTypes: {
    themeMode: {
      description: 'Design token color mode (overrides OS appearance in stories)',
      defaultValue: 'light',
      toolbar: {
        dynamicTitle: true,
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' }
        ]
      }
    }
  },
  decorators: [
    (Story, { globals }) => (
      <StorybookThemeDecorator mode={globals.themeMode ?? 'light'}>
        <Story />
      </StorybookThemeDecorator>
    )
  ]
};

export default preview;
