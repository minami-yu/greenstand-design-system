import type { Meta, StoryObj } from '@storybook/react';
import { TypographyCatalog } from '../components/FoundationCatalogs';
import { DocPage } from '../components/DocPage';
import { buildTypographyCatalogEntries } from '../utils/buildCatalogEntries';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const typography = buildTypographyCatalogEntries();

const meta = {
  title: 'Foundation/Typography',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Typography',
  render: () => (
    <DocPage
      description="Composite text styles from tokens/styles/value.json — spread into React Native Text styles."
      title="Typography"
    >
      <TypographyCatalog entries={typography} />
    </DocPage>
  )
};
