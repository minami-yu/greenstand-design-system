import type { Preview } from '@storybook/react';
import { useColorScheme, View } from 'react-native';
import { useAppFonts } from '../src/theme/fonts';
import {
  ThemeProvider,
  type ThemeModePreference
} from '../src/theme/ThemeProvider';
import { themes } from '../src/theme/tokens';

/** Shared preview parameters — web merges `storybookDocsParameters` over `docs`. */
export const storybookPreviewParameters = {
  backgrounds: { disable: true },
  controls: { expanded: true },
  docs: {
    autodocs: 'tag',
    source: { type: 'code', state: 'none' },
    canvas: { sourceState: 'none' }
  },
  // Keep in sync with the inline `options.storySort` in `.storybook-web/preview.tsx`.
  options: {
    storySort: {
      order: [
        'Getting started',
        ['Introduction', 'Set up'],
        'Foundation',
        [
          'Design tokens',
          'Colors',
          'Typography',
          'Spacing',
          'Radius',
          'Border',
          'Iconography',
          'Elevation',
          'Logo & Illustrations',
          'Layout',
          'UX Writing'
        ],
        'Components',
        [
          'Badge',
          ['*'],
          'Button',
          ['*'],
          'Icon',
          ['*']
        ],
        'Accessibility',
        ['Overview'],
        'Implementation',
        ['MCP'],
        'Support & Help',
        ['Resources', 'Contact'],
        '*'
      ]
    }
  }
} satisfies Preview['parameters'];

export const globalTypes = {
  themeMode: {
    description: 'Design token color mode for story previews',
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
  const effectiveMode: ThemeModePreference = docsPage ? 'light' : mode;
  const resolvedMode =
    effectiveMode === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : effectiveMode;
  const t = themes[resolvedMode];

  if (!fontsLoaded && !docsPage) {
    return <View />;
  }

  return (
    <ThemeProvider mode={effectiveMode} typographyMode={docsPage ? 'desktop' : 'mobile'}>
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
  parameters: storybookPreviewParameters
};

export default preview;
