import type { Meta, StoryObj } from '@storybook/react';
import { ColorCatalog } from '../components/FoundationCatalogs';
import { DocPage } from '../components/DocPage';
import { buildColorCatalogEntries } from '../utils/buildCatalogEntries';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const colors = buildColorCatalogEntries();

const meta = {
  title: 'Foundation/Colors',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Colors',
  render: () => (
    <DocPage
      description="Semantic color tokens from tokens/variables/color/light.json with compiled light-mode values."
      title="Colors"
    >
      <ColorCatalog entries={colors} />
    </DocPage>
  )
};
