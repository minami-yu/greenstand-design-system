import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { icons } from '../Icon/icons';
import { StorybookStoryShell, StorybookVariantCatalog, StorybookVariantCell } from '../../storybook/ui';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { ToggleButton, type ToggleButtonProps } from './ToggleButton';

const sizes = ['sm'] as const;
const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  args: { accessibilityLabel: 'Favorites', icon: 'heart-outline', selected: false, size: 'sm', badge: true, badgeValue: '1' },
  argTypes: {
    icon: { control: 'select', options: Object.keys(icons), description: 'Icon for the unselected state and fallback for selection.', table: { type: { summary: 'IconName' } } },
    selectedIcon: { control: 'select', options: Object.keys(icons), description: 'Optional alternate icon when selected.', table: { type: { summary: 'IconName' } } },
    selected: { control: 'boolean', description: 'Controlled selection; applies brand fill and outline.', table: { type: { summary: 'boolean' } } },
    size: { control: 'select', options: sizes, description: 'Small circle inside a 48 px touch target.', table: { type: { summary: storybookQuotedUnion(sizes) } } },
    badge: { control: 'boolean', description: 'Show the count badge when selected.', table: { type: { summary: 'boolean' } } },
    badgeValue: { control: 'text', description: 'Count displayed in the selected-state badge.', table: { type: { summary: 'string' } } },
    disabled: { control: 'boolean', description: 'Suppress interaction while retaining the appearance; no disabled visual is defined in Figma.', table: { type: { summary: 'boolean' } } },
    onPress: { action: 'press', control: false, description: 'Toggle selection or open a picker in the caller.', table: { type: { summary: 'PressableProps["onPress"]' } } }
  },
  parameters: storybookDocsArgTypesInclude(['icon', 'selectedIcon', 'selected', 'size', 'badge', 'badgeValue', 'disabled', 'onPress'])
} satisfies Meta<typeof ToggleButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: args => <StorybookStoryShell align="center"><ToggleButton {...args} /></StorybookStoryShell>
};

export const States: Story = {
  render: args => <StorybookStoryShell align="center"><StorybookVariantCatalog>
    <StorybookVariantCell label="Default"><ToggleButton {...args} selected={false} /></StorybookVariantCell>
    <StorybookVariantCell label="Selected with badge"><ToggleButton {...args} selected badge /></StorybookVariantCell>
    <StorybookVariantCell label="Selected without badge"><ToggleButton {...args} selected badge={false} /></StorybookVariantCell>
    <StorybookVariantCell label="Disabled"><ToggleButton {...args} disabled /></StorybookVariantCell>
  </StorybookVariantCatalog></StorybookStoryShell>
};

function SelectionExample(args: ToggleButtonProps) {
  const [selected, setSelected] = useState(false);
  return <ToggleButton {...args} selected={selected} onPress={event => { setSelected(value => !value); args.onPress?.(event); }} />;
}

export const Selection: Story = {
  args: { icon: 'filter-outline', accessibilityLabel: 'Filters', badgeValue: '3' },
  render: args => <StorybookStoryShell align="center"><SelectionExample {...args} /></StorybookStoryShell>
};
