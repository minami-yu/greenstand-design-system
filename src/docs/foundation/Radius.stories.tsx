import type { Meta, StoryObj } from '@storybook/react';
import { RadiusCatalog } from '../components/FoundationCatalogs';
import { DocPage } from '../components/DocPage';
import { buildScaleCatalogEntries } from '../utils/buildCatalogEntries';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const radius = buildScaleCatalogEntries('radius', 'radius');

const meta = {
  title: 'Foundation/Radius',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Radius',
  render: () => (
    <DocPage
      description="Corner radius tokens from tokens/variables/size/value.json."
      title="Radius"
    >
      <RadiusCatalog entries={radius} />
    </DocPage>
  )
};
