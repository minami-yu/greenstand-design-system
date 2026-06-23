import type { Preview } from '@storybook/react';
import { decorators, globalTypes, storybookPreviewParameters } from '../.storybook/preview';
import { storybookDocsParameters } from './storybookDocsParameters';

// Storybook extracts `options.storySort` via static analysis of this file only.
// Spreads are not followed, so keep the order inline here (mirror `.storybook/preview.tsx`).
const preview: Preview = {
  decorators,
  globalTypes,
  parameters: {
    ...storybookPreviewParameters,
    docs: storybookDocsParameters,
    options: {
      storySort: {
        order: [
          'Getting started',
          ['Introduction'],
          'Foundation',
          [
            'Colors',
            'Typography',
            'Spacing',
            'Sizing',
            'Radius',
            'Border',
            'Iconography',
            'Elevation',
            'Logo & Illustrations',
            'Layout',
            'UX writing'
          ],
          'Components',
          [
            'Badge',
            ['*'],
            'Button',
            ['*'],
            'Icon',
            ['*'],
            'Switch',
            ['*']
          ],
          'Accessibility',
          ['Overview'],
          'Implementation',
          ['Sync design system'],
          'Support & help',
          ['Resources', 'Contact'],
          '*'
        ]
      }
    }
  }
};

export default preview;
