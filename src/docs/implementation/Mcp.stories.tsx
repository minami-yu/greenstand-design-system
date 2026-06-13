import type { Meta, StoryObj } from '@storybook/react';
import { DocBulletList, DocCallout, DocCode, DocPage, DocSection } from '../components/DocPage';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const meta = {
  title: 'Implementation/MCP',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'MCP',
  render: () => (
    <DocPage
      description="Using Figma MCP to inspect designs and keep Figma components aligned with code."
      title="MCP"
    >
      <DocSection title="Workflow">
        <DocBulletList
          items={[
            'Inspect component structure and variants in Figma via MCP',
            'Map Figma variables to tokens in src/theme/tokens.ts — never paste raw Figma values',
            'Implement or update React Native components and Storybook stories',
            'Report missing tokens before adding guessed values'
          ]}
        />
      </DocSection>

      <DocSection title="Figma file">
        <DocCode code="Yuri New Roots Design System 1.0" />
      </DocSection>

      <DocCallout text="Use get_design_context for design-to-code. Use use_figma for updating Figma from code or token audits." />
    </DocPage>
  )
};
