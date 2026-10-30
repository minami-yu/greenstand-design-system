import type { Meta, StoryObj } from '@storybook/react';
import { ImageGroup } from './ImageGroup';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
const tree = require('../ListItem/assets/tree-example.png');
const meta = {
  title: 'Components/ImageGroup', component: ImageGroup,
  args: { images: [tree] },
  argTypes: { images: { description: 'Photos in display order; show up to three and a count of additional photos.', control: false, table: { type: { summary: 'readonly ImageSourcePropType[]' } } } },
  parameters: storybookDocsArgTypesInclude(['images'])
} satisfies Meta<typeof ImageGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Single: Story = {};
export const Stack: Story = { args: { images: [tree, tree, tree] } };
export const Overflow: Story = { args: { images: Array.from({ length: 11 }, () => tree) } };
export const Empty: Story = { args: { images: [] } };
