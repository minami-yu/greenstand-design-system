import type { Preview } from '@storybook/react';
import { storybookTheme } from './storybookTheme';

/** Shared Storybook docs configuration for web preview. */
export const storybookDocsParameters = {
  autodocs: 'tag',
  theme: storybookTheme,
  canvas: {
    sourceState: 'shown',
    withToolbar: true
  },
  controls: {
    sort: 'requiredFirst'
  }
} satisfies Preview['parameters']['docs'];
