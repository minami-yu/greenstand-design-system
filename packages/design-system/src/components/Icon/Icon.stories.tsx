import type { Meta, StoryObj } from '@storybook/react';
import {
  StorybookStoryShell,
  StorybookVariantGrid,
  StorybookVariantGridItem
} from '../../storybook/ui';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import {
  storybookDocsArgTypesInclude,
  storybookArgTypeAccessibilityLabel,
  storybookQuotedUnion
} from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';
import { Icon } from './Icon';
import { icons, type IconName } from './icons';
import { iconColorPaths } from './resolveIconColor';

const iconNames = Object.keys(icons).sort() as IconName[];
const iconSizes = Object.keys(theme.icon) as (keyof typeof theme.icon)[];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    name: 'close',
    size: 'md',
    color: 'neutral.primary'
  },
  argTypes: {
    name: {
      control: 'select',
      description: 'Icon glyph key from icons.ts.',
      options: iconNames,
      table: { type: { summary: 'IconName' } }
    },
    size: {
      control: 'select',
      description: 'Icon dimension from theme.icon scale.',
      options: iconSizes,
      table: { type: { summary: storybookQuotedUnion(iconSizes) } }
    },
    color: {
      control: 'select',
      description:
        'Semantic icon token path (e.g. `neutral.primary`) or an explicit color value.',
      options: [...iconColorPaths],
      table: { type: { summary: storybookQuotedUnion(iconColorPaths) } }
    },
    accessibilityLabel: {
      ...storybookArgTypeAccessibilityLabel,
      description:
        'Required when the icon conveys meaning (close, delete, status). Omit for decorative icons inside labeled controls.'
    }
  },
  parameters: storybookDocsArgTypesInclude(['name', 'size', 'color', 'accessibilityLabel'])
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    return (
      <StorybookStoryShell align="center">
        <Icon {...args} />
      </StorybookStoryShell>
    );
  }
};

/** All icons from Figma frame "Icons" (12663:7261), keyed by title suffix. */
export const Gallery: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantGrid align="center" columnWidth={100} columns={5} gap="md">
        {iconNames.map((name) => (
          <StorybookVariantGridItem key={name} align="center" label={name} labelPosition="below">
            <Icon color="neutral.primary" name={name} size="lg" />
          </StorybookVariantGridItem>
        ))}
      </StorybookVariantGrid>
    </StorybookStoryShell>
  )
};
