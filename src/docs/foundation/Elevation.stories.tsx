import type { Meta, StoryObj } from '@storybook/react';
import { ElevationCatalog } from '../components/FoundationCatalogs';
import { DocPage } from '../components/DocPage';
import { buildElevationCatalogEntries } from '../utils/buildCatalogEntries';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const elevation = buildElevationCatalogEntries();

const meta = {
  title: 'Foundation/Elevation',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Elevation',
  render: () => (
    <DocPage
      description="Multi-layer shadow tokens from tokens/styles/value.json. Use getShadow() in components."
      title="Elevation"
    >
      <ElevationCatalog entries={elevation} />
    </DocPage>
  )
};
