import type { Meta, StoryObj } from '@storybook/react';
import {
  StorybookStoryShell,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import {
  storybookDocsArgTypesInclude,
  storybookQuotedUnion
} from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { type AvatarProps } from '../Avatar/Avatar';
import { AvatarGroup } from './AvatarGroup';

const groupSizes = ['md', 'lg'] as const;

const sampleAvatars: AvatarProps[] = [
  { initial: 'A' },
  { initial: 'B' },
  { initial: 'C' }
];

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  args: {
    avatars: sampleAvatars,
    number: '+1',
    overflow: false,
    showOverflow: true,
    size: 'md'
  },
  argTypes: {
    avatars: {
      control: false,
      description: 'Avatar data rendered inside the group. The component currently displays the first three avatars.',
      table: { type: { summary: 'AvatarProps[]' } }
    },
    number: {
      control: 'text',
      description: 'Overflow label shown after the avatars.',
      table: { type: { summary: 'string' } }
    },
    overflow: {
      control: 'boolean',
      description: 'Switches from the spread layout to the overlapping layout.',
      table: { type: { summary: 'boolean' } }
    },
    showOverflow: {
      control: 'boolean',
      description: 'Controls whether the overflow number is visible.',
      table: { type: { summary: 'boolean' } }
    },
    size: {
      control: 'select',
      description: 'Avatar size used by the group.',
      options: groupSizes,
      table: { type: { summary: storybookQuotedUnion(groupSizes) } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['avatars', 'number', 'overflow', 'showOverflow', 'size'])
} satisfies Meta<typeof AvatarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <StorybookStoryShell align="center">
      <AvatarGroup {...args} />
    </StorybookStoryShell>
  )
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantRow gap="lg">
        <StorybookVariantCell label="Spread" labelPosition="below">
          <AvatarGroup avatars={sampleAvatars} number="+1" />
        </StorybookVariantCell>
        <StorybookVariantCell label="Overlap" labelPosition="below">
          <AvatarGroup avatars={sampleAvatars} number="+1" overflow />
        </StorybookVariantCell>
      </StorybookVariantRow>
    </StorybookStoryShell>
  )
};
