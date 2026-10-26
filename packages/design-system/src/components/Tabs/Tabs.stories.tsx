import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { Tabs, type TabsProps } from './Tabs';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
const items = [{ id: 'summary', label: 'Summary' }, { id: 'history', label: 'History' }, { id: 'profile', label: 'Profile' }];
const meta = {
  title: 'Components/Tabs', component: Tabs, args: { items, value: 'summary', onValueChange: () => {} },
  argTypes: {
    items: { description: 'Tabs with stable IDs, visible labels, and optional disabled states.', control: 'object', table: { type: { summary: '{ id: string; label: string; disabled?: boolean }[]' } } },
    value: { description: 'Selected tab ID.', control: 'text', table: { type: { summary: 'string' } } },
    onValueChange: { description: 'Called with the selected tab ID.', control: false, table: { type: { summary: '(value: string) => void' } } }
  },
  parameters: storybookDocsArgTypesInclude(['items', 'value', 'onValueChange'])
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
function InteractiveTabs(args: TabsProps) {
  const t = useTheme();
  const [value, setValue] = useState(args.value);
  return <View style={{ gap: theme.space['400'] }}><Tabs {...args} value={value} onValueChange={next => { setValue(next); args.onValueChange(next); }} /><Text style={[t.typography.paragraphM, { color: t.color.text.neutral.primary }]}>{args.items.find(item => item.id === value)?.label} content</Text></View>;
}
export const Playground: Story = { render: args => <InteractiveTabs {...args} /> };
export const DisabledTab: Story = { args: { items: items.map(item => ({ ...item, disabled: item.id === 'history' })) }, render: args => <InteractiveTabs {...args} /> };
