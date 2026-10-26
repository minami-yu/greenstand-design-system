import type { Meta, StoryObj } from '@storybook/react';
import {
  StorybookStoryShell,
  StorybookVariantCatalog,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import {
  storybookDocsArgTypesInclude,
  storybookQuotedUnion
} from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { Hint, type HintAlignment, type HintDirection } from './Hint';

const alignments: HintAlignment[] = ['left', 'center', 'right'];
const directions: HintDirection[] = ['down', 'up'];

const meta = {
  title: 'Components/Hint',
  component: Hint,
  args: {
    alignment: 'center',
    content: 'Hint content',
    direction: 'down',
    pointer: true,
    showIcon: true
  },
  argTypes: {
    alignment: {
      control: 'select',
      description: 'Pointer alignment inside the hint width.',
      options: alignments,
      table: { type: { summary: storybookQuotedUnion(alignments) } }
    },
    content: {
      control: 'text',
      description: 'Visible hint copy.',
      table: { type: { summary: 'string' } }
    },
    direction: {
      control: 'select',
      description: 'Whether the pointer faces up or down.',
      options: directions,
      table: { type: { summary: storybookQuotedUnion(directions) } }
    },
    pointer: {
      control: 'boolean',
      description: 'Shows or hides the pointer.',
      table: { type: { summary: 'boolean' } }
    },
    showIcon: {
      control: 'boolean',
      description: 'Shows or hides the tap icon.',
      table: { type: { summary: 'boolean' } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['alignment', 'content', 'direction', 'pointer', 'showIcon'])
} satisfies Meta<typeof Hint>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <StorybookStoryShell align="center">
      <Hint {...args} />
    </StorybookStoryShell>
  )
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog gap="lg">
        {directions.map((direction) => (
          <StorybookVariantRow key={direction} gap="lg">
            {alignments.map((alignment) => (
              <StorybookVariantCell key={`${direction}-${alignment}`} label={`${direction} ${alignment}`} labelPosition="below">
                  <Hint alignment={alignment} content="Hint content" direction={direction} />
              </StorybookVariantCell>
            ))}
          </StorybookVariantRow>
        ))}
        <StorybookVariantRow gap="lg">
          <StorybookVariantCell label="No pointer" labelPosition="below">
            <Hint content="Hint content" pointer={false} />
          </StorybookVariantCell>
          <StorybookVariantCell label="No icon" labelPosition="below">
            <Hint content="Hint content" showIcon={false} />
          </StorybookVariantCell>
        </StorybookVariantRow>
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  )
};

export const WithoutPointer: Story = {
  ...Playground,
  args: { pointer: false }
};

export const WithoutIcon: Story = {
  ...Playground,
  args: { showIcon: false }
};
