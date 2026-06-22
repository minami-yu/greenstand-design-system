/**
 * Spinner stories — Figma Spinner (13184:6727), wraps ActivityIndicator with token sizing.
 */
import type { Meta, StoryObj } from '@storybook/react';
import {
  StorybookStoryShell,
  StorybookVariantCatalog,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {
    size: 'md'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Figma size — sm (20px), md (36px).'
    }
  }
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive sandbox — pick a size. */
export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    return (
      <StorybookStoryShell align="center">
        <Spinner {...args} />
      </StorybookStoryShell>
    );
  }
};

/** Snapshot-friendly size variants. */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookVariantCatalog align="center">
      <StorybookVariantRow gap="lg">
        <StorybookVariantCell align="center" label="sm" labelPosition="below">
          <Spinner size="sm" />
        </StorybookVariantCell>
        <StorybookVariantCell align="center" label="md" labelPosition="below">
          <Spinner size="md" />
        </StorybookVariantCell>
      </StorybookVariantRow>
    </StorybookVariantCatalog>
  )
};
