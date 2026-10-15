import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
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
import { useTheme } from '../../theme/useTheme';
import { Avatar, type AvatarSize, type AvatarType } from './Avatar';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const types: AvatarType[] = ['image', 'initial'];

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    initial: 'A',
    size: 'lg',
    type: 'initial'
  },
  argTypes: {
    initial: {
      control: 'text',
      description: 'Initial shown when the avatar does not receive an image source.',
      table: { type: { summary: 'string' } }
    },
    selected: {
      control: 'boolean',
      description: 'Applies the selected avatar border treatment.',
      table: { type: { summary: 'boolean' } }
    },
    size: {
      control: 'select',
      description: 'Avatar size variant.',
      options: sizes,
      table: { type: { summary: storybookQuotedUnion(sizes) } }
    },
    source: {
      control: false,
      description: 'React Native image source for image avatars.',
      table: { type: { summary: 'ImageSourcePropType' } }
    },
    type: {
      control: 'select',
      description: 'Avatar visual type.',
      options: types,
      table: { type: { summary: storybookQuotedUnion(types) } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['initial', 'selected', 'size', 'source', 'type'])
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <StorybookStoryShell align="center">
      <Avatar {...args} />
    </StorybookStoryShell>
  )
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => {
    const t = useTheme();

    return (
      <StorybookStoryShell align="center">
        <StorybookVariantCatalog align="center" gap="md">
          <StorybookVariantRow gap="md">
            {sizes.map((size) => (
              <StorybookVariantCell align="center" key={size} label={size} labelPosition="below">
                <Avatar initial="A" size={size} type="initial" />
              </StorybookVariantCell>
            ))}
          </StorybookVariantRow>
          <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>
            Image avatars use the same size map when a source is provided.
          </Text>
        </StorybookVariantCatalog>
      </StorybookStoryShell>
    );
  }
};
