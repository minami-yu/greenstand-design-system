import type { Meta, StoryObj } from '@storybook/react';
import {
  StorybookStoryShell,
  StorybookVariantCatalog,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { AvatarCard } from './AvatarCard';

const meta = {
  title: 'Components/AvatarCard',
  component: AvatarCard,
  args: {
    label: 'Label',
    outline: true,
    selected: false,
    visualElements: 'avatar',
    icon: 'add'
  },
  argTypes: {
    visualElements: {
      control: 'select', options: ['avatar', 'button'],
      description: 'Photo avatar or circular icon action, matching Figma visualElements.',
      table: { type: { summary: storybookQuotedUnion(['avatar', 'button']) } }
    },
    icon: {
      control: 'text', description: 'Icon shown in the button visual. Defaults to add.',
      table: { type: { summary: 'IconName' } }
    },
    label: {
      control: 'text',
      description: 'Visible card label.',
      table: { type: { summary: 'string' } }
    },
    outline: {
      control: 'boolean',
      description: 'Shows the card border treatment. When false, selected state moves to the composed Avatar.',
      table: { type: { summary: 'boolean' } }
    },
    selected: {
      control: 'boolean',
      description: 'Applies the selected treatment from the Figma variants.',
      table: { type: { summary: 'boolean' } }
    },
    source: {
      control: false,
      description: 'React Native image source passed to the composed Avatar.',
      table: { type: { summary: 'ImageSourcePropType' } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['label', 'visualElements', 'icon', 'outline', 'selected', 'source'])
} satisfies Meta<typeof AvatarCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <StorybookStoryShell align="center">
      <AvatarCard {...args} />
    </StorybookStoryShell>
  )
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog align="center" gap="md">
        <StorybookVariantRow gap="lg">
          <StorybookVariantCell label="Outline" labelPosition="below">
            <AvatarCard label="Label" outline />
          </StorybookVariantCell>
          <StorybookVariantCell label="No outline" labelPosition="below">
            <AvatarCard label="Label" outline={false} />
          </StorybookVariantCell>
        </StorybookVariantRow>
        <StorybookVariantRow gap="lg">
          <StorybookVariantCell label="Outline selected" labelPosition="below">
            <AvatarCard label="Label" outline selected />
          </StorybookVariantCell>
          <StorybookVariantCell label="No outline selected" labelPosition="below">
            <AvatarCard label="Label" outline={false} selected />
          </StorybookVariantCell>
        </StorybookVariantRow>
        <StorybookVariantRow gap="lg">
          <StorybookVariantCell label="Button outline" labelPosition="below">
            <AvatarCard label="Add new user" visualElements="button" />
          </StorybookVariantCell>
          <StorybookVariantCell label="Button no outline" labelPosition="below">
            <AvatarCard label="Add new user" visualElements="button" outline={false} />
          </StorybookVariantCell>
        </StorybookVariantRow>
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  )
};

export const AddUser: Story = { args: { label: 'Add new user', visualElements: 'button' } };
export const WrappedLabel: Story = { args: { label: 'Oluwatobiloba Adeyemi' } };
