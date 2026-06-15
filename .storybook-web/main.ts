import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { storybookMdStyles } from './storybookMdStyles';

const config: StorybookConfig = {
  stories: [
    '../src/storybook/**/*.mdx',
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.tsx'
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {}
  },
  managerHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap" rel="stylesheet">
  `,
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap" rel="stylesheet">
    <!-- CSS for MDX markdown + Storybook HTML blocks — see storybookMdStyles.ts -->
    <style>
      ${storybookMdStyles}
    </style>
  `,
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION' && process.env.STORYBOOK_BASE_PATH) {
      config.base = process.env.STORYBOOK_BASE_PATH;
    }
    return config;
  }
};

export default config;
