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
  }
};

export default preview;
