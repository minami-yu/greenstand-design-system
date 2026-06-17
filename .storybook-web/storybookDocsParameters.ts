import type { Preview } from '@storybook/react';
import { storybookTheme } from './storybookTheme';

/** Shared Storybook docs configuration for web preview. */
export const storybookDocsParameters = {
  autodocs: 'tag',
  theme: storybookTheme,
  source: {
    type: 'code',
    state: 'none'
  },
  canvas: {
    sourceState: 'none'
  },
  controls: {
    sort: 'requiredFirst'
  }
} satisfies Preview['parameters']['docs'];
