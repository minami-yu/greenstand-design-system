import type { Meta, StoryObj } from '@storybook/react';
import { DocBulletList, DocCallout, DocPage, DocSection } from '../components/DocPage';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const meta = {
  title: "Foundation/Design token/What's a design token",
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: "What's a design token",
  render: () => (
    <DocPage
      description="Single sources of truth for color, type, spacing, radius, and more — shared between Figma and code."
      title="What's a design token?"
    >
      <DocSection title="Definition">
        <DocBulletList
          items={[
            'A named design decision (e.g. color.text.neutral.primary, space.400, radius.md)',
            'Stored as W3C Design Tokens in tokens/ and compiled to src/theme/tokens.ts',
            'Never hardcode raw hex, px, or font sizes in components when a token exists'
          ]}
        />
      </DocSection>

      <DocSection title="Source layout">
        <DocBulletList
          items={[
            'tokens/variables/ — Figma variable export (Token Studio). Do not hand-edit.',
            'tokens/styles/value.json — hand-maintained typography and elevation styles',
            'src/theme/tokens.ts — generated output. Never edit manually.'
          ]}
        />
      </DocSection>

      <DocCallout text="If a required value is missing from tokens.ts, stop and request a token export or styles update — do not guess from Figma pixels." />
    </DocPage>
  )
};
