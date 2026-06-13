import type { Preview } from '@storybook/react';
import { useColorScheme, View } from 'react-native';
import { useAppFonts } from '../src/theme/fonts';
import { ThemeProvider, type ThemeModePreference } from '../src/theme/ThemeProvider';
import { themes } from '../src/theme/tokens';

export const parameters = {
  backgrounds: { disable: true },
  controls: { expanded: true },
  docs: {
    autodocs: 'tag'
  },
  options: {
    storySort: {
      order: [
        'Getting started',
        ['Introduction'],
        'Foundation',
        [
          'Design token',
          ["What's a design token", 'How to sync design token'],
          'Colors',
          'Typography',
          'Spacing',
          'Icons',
          'Radius',
          'Border',
          'Elevation',
          'Logo',
          'Layout'
        ],
        'Components',
        [
          'Badge',
          ['*'],
          'Box',
          ['*'],
          'Button',
          ['*'],
          'Card',
          ['*'],
          'Icon',
          ['*']
        ],
        'Accessibility',
        ['Overview'],
        'Implementation',
        ['MCP'],
        '*'
      ]
    }
  }
} satisfies Preview['parameters'];

export const globalTypes = {
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
} satisfies Preview['globalTypes'];

function StorybookThemeDecorator({
  docsPage,
  mode,
  children
}: {
  docsPage?: boolean;
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
          alignItems: docsPage ? 'stretch' : 'center',
          alignSelf: docsPage ? 'stretch' : 'center',
          backgroundColor: t.color.background.neutral.default,
          flex: 1,
          justifyContent: docsPage ? 'flex-start' : 'center',
          minHeight: docsPage ? undefined : '100%',
          padding: t.space['400'],
          width: docsPage ? '100%' : undefined
        }}
      >
        {children}
      </View>
    </ThemeProvider>
  );
}

export const decorators: Preview['decorators'] = [
  (Story, { globals, parameters }) => (
    <StorybookThemeDecorator
      docsPage={parameters.docsPage === true}
      mode={globals.themeMode ?? 'light'}
    >
      <Story />
    </StorybookThemeDecorator>
  )
];

const preview: Preview = {
  decorators,
  globalTypes,
  parameters
};

export default preview;
