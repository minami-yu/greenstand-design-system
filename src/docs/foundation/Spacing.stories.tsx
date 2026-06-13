import type { Meta, StoryObj } from '@storybook/react';
import { SpacingCatalog } from '../components/FoundationCatalogs';
import { DocPage } from '../components/DocPage';
import { buildScaleCatalogEntries } from '../utils/buildCatalogEntries';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const spacing = buildScaleCatalogEntries('space', 'space');

const meta = {
  title: 'Foundation/Spacing',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Spacing',
  render: () => (
    <DocPage
      description="Spacing scale from tokens/variables/size/value.json. Use Box props or theme.space in code."
      title="Spacing"
    >
      <SpacingCatalog entries={spacing} />
    </DocPage>
  )
};
