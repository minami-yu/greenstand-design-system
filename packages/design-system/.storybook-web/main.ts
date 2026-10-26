import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { fileURLToPath } from 'node:url';
import { storybookMdStyles } from './storybookMdStyles.ts';

const config: StorybookConfig = {
  stories: [
    '../src/storybook/**/*.mdx',
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.tsx'
  ],
  // Bottom panel tab order follows addon registration order (previewTabs does not apply).
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {}
  },
  managerHead: (head) => `
    ${head}
    <script>
      (function () {
        var migrationKey = 'greenstand-storybook-panel-bottom-v1';
        if (localStorage.getItem(migrationKey)) return;
        try {
          var storeKey = '@storybook/manager/store';
          var raw = localStorage.getItem(storeKey);
          if (raw) {
            var store = JSON.parse(raw);
            if (store.layout) {
              store.layout.panelPosition = 'bottom';
              if (!store.layout.bottomPanelHeight) {
                store.layout.bottomPanelHeight =
                  store.layout.recentVisibleSizes?.bottomPanelHeight ?? 300;
              }
              localStorage.setItem(storeKey, JSON.stringify(store));
            }
          }
        } catch (e) {}
        localStorage.setItem(migrationKey, '1');
      })();
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700&family=Roboto+Mono:wght@400&display=swap" rel="stylesheet">
  `,
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700&family=Roboto+Mono:wght@400&display=swap" rel="stylesheet">
    <!-- CSS for MDX markdown + Storybook HTML blocks — see storybookMdStyles.ts -->
    <style>
      ${storybookMdStyles}
    </style>
  `,
  async viteFinal(config, { configType }) {
    config.resolve ??= {};
    config.resolve.alias = [
      {
        find: /^react-native-svg$/,
        replacement: fileURLToPath(
          new URL('../../../node_modules/react-native-svg/lib/commonjs/index.js', import.meta.url)
        )
      },
      ...(
        Array.isArray(config.resolve.alias)
          ? config.resolve.alias
          : Object.entries(config.resolve.alias ?? {}).map(([find, replacement]) => ({ find, replacement }))
      )
    ];
    if (configType === 'PRODUCTION' && process.env.STORYBOOK_BASE_PATH) {
      config.base = process.env.STORYBOOK_BASE_PATH;
    }
    return config;
  }
};

export default config;
