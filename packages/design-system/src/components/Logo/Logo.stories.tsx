import type { Meta, StoryObj } from '@storybook/react';
import {
  StorybookStoryShell,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import {
  Logo,
  type GreenstandLogoVariant,
  type LogoName,
  type LogoSize,
  type TreetrackerLogoVariant
} from './Logo';

const logoNames: LogoName[] = ['greenstand', 'treetracker'];
const logoSizes: LogoSize[] = ['sm', 'md', 'lg'];
const greenstandVariants: GreenstandLogoVariant[] = ['default', 'neutral', 'original', 'white'];
const treetrackerVariants: TreetrackerLogoVariant[] = ['default', 'white'];
const allVariants = ['default', 'neutral', 'original', 'white'] as const;

const meta = {
  title: 'Components/Logo',
  component: Logo,
  args: {
    name: 'greenstand',
    size: 'lg',
    variant: 'default'
  },
  argTypes: {
    name: {
      control: 'radio',
      description: 'Logo family.',
      options: logoNames,
      table: { type: { summary: storybookQuotedUnion(logoNames) } }
    },
    size: {
      control: 'radio',
      description: 'Preset logo size.',
      options: logoSizes,
      table: { type: { summary: storybookQuotedUnion(logoSizes) } }
    },
    variant: {
      control: 'select',
      description: 'Figma logo variant. Treetracker supports default and white.',
      options: allVariants,
      table: { type: { summary: storybookQuotedUnion(allVariants) } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['name', 'size', 'variant'])
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <StorybookStoryShell align="center">
      <Logo {...args} />
    </StorybookStoryShell>
  )
};

export const GreenstandVariants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell>
      <StorybookVariantRow gap="md">
        {greenstandVariants.map((variant) => (
          <StorybookVariantCell key={variant} label={variant} labelPosition="below">
            <Logo name="greenstand" size="lg" variant={variant} />
          </StorybookVariantCell>
        ))}
      </StorybookVariantRow>
    </StorybookStoryShell>
  )
};

export const TreetrackerVariants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell>
      <StorybookVariantRow gap="md">
        {treetrackerVariants.map((variant) => (
          <StorybookVariantCell key={variant} label={variant} labelPosition="below">
            <Logo name="treetracker" size="lg" variant={variant} />
          </StorybookVariantCell>
        ))}
      </StorybookVariantRow>
    </StorybookStoryShell>
  )
};
