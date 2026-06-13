import type { Meta, StoryObj } from '@storybook/react';
import { DocBulletList, DocCallout, DocCode, DocPage, DocSection } from '../components/DocPage';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const meta = {
  title: 'Foundation/Design token/How to sync design token',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'How to sync design token',
  render: () => (
    <DocPage
      description="Keep Figma variables, token JSON, and compiled TypeScript in sync."
      title="How to sync design tokens"
    >
      <DocSection title="Variables from Figma (Token Studio)">
        <DocBulletList
          items={[
            'Open Tokens Studio in Figma and remove stale token sets',
            'Import variables (leave “Convert numbers to dimensions” unchecked)',
            'Export to multiple files and replace tokens/variables/',
            'Run npm run build-tokens and review src/theme/tokens.ts'
          ]}
        />
      </DocSection>

      <DocSection title="Styles (typography & elevation)">
        <DocBulletList
          items={[
            'Figma styles are not part of the variable export',
            'Update tokens/styles/value.json manually when text or shadow styles change',
            'Run npm run build-tokens after editing styles JSON'
          ]}
        />
      </DocSection>

      <DocSection title="Build command">
        <DocCode code="npm run build-tokens" />
      </DocSection>

      <DocCallout text="Never hand-edit tokens/variables/ or src/theme/tokens.ts — always regenerate through the pipeline." />
    </DocPage>
  )
};
