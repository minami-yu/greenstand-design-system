import type { Meta, StoryObj } from '@storybook/react';
import { StorybookStoryShell } from '../../storybook/ui';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { AvatarTag } from './AvatarTag';

const meta = {
  title: 'Components/AvatarTag',
  component: AvatarTag,
  args: {
    initial: 'N',
    name: 'Name'
  },
  argTypes: {
    initial: {
      control: 'text',
      description: 'Initial passed to the composed Avatar.',
      table: { type: { summary: 'string' } }
    },
    name: {
      control: 'text',
      description: 'Visible label below the avatar and remove button accessible label.',
      table: { type: { summary: 'string' } }
    },
    onRemove: {
      action: 'remove',
      description: 'Called when the remove icon button is pressed.',
      table: { type: { summary: 'PressableProps["onPress"]' } }
    },
    source: {
      control: false,
      description: 'React Native image source passed to the composed Avatar.',
      table: { type: { summary: 'ImageSourcePropType' } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['initial', 'name', 'onRemove', 'source'])
} satisfies Meta<typeof AvatarTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <StorybookStoryShell align="center">
      <AvatarTag {...args} />
    </StorybookStoryShell>
  )
};
