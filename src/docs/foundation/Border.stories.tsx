import type { Meta, StoryObj } from '@storybook/react';
import { DocPage } from '../components/DocPage';
import { TokenCatalog } from '../components/TokenCatalog';
import { buildScaleCatalogEntries } from '../utils/buildCatalogEntries';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const borders = buildScaleCatalogEntries('stroke', 'stroke');

const meta = {
  title: 'Foundation/Border',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Border',
  render: () => (
    <DocPage
      description="Border width tokens (stroke) from tokens/variables/size/value.json."
      title="Border"
    >
      <TokenCatalog entries={borders} />
    </DocPage>
  )
};
