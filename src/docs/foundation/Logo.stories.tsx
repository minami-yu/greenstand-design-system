import type { Meta, StoryObj } from '@storybook/react';
import { DocCallout, DocPage, DocSection } from '../components/DocPage';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const meta = {
  title: 'Foundation/Logo',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Logo',
  render: () => (
    <DocPage
      description="Brand logo usage and asset guidelines."
      title="Logo"
    >
      <DocSection title="Status">
        <DocCallout text="Logo assets and usage rules are not yet exported to this repository. Add brand marks to the design system when Figma logo components and export specs are finalized." />
      </DocSection>
    </DocPage>
  )
};
