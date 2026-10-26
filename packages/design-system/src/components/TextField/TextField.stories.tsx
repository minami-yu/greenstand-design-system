import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { TextField } from './TextField';
import { theme } from '../../theme/tokens';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
const meta = {
  title: 'Components/TextField', component: TextField,
  args: { label: 'Name', placeholder: 'First name', clearable: true },
  argTypes: {
    label: { description: 'Visible input label.', control: 'text', table: { type: { summary: 'string' } } },
    value: { description: 'Controlled input value.', control: 'text', table: { type: { summary: 'string' } } },
    placeholder: { description: 'Hint displayed when empty.', control: 'text', table: { type: { summary: 'string' } } },
    clearable: { description: 'Show clear while focused and nonempty.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    editable: { description: 'Allow changes to the value.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    onChangeText: { description: 'Called with each new value, including clearing.', control: false, table: { type: { summary: '(value: string) => void' } } }
  },
  parameters: storybookDocsArgTypesInclude(['label', 'value', 'placeholder', 'clearable', 'editable', 'onChangeText']),
  decorators: [(Story) => <View style={{ padding: theme.space['400'], width: '100%' }}><Story /></View>]
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const ReadOnly: Story = { args: { value: 'Oluwatobiloba', editable: false } };
function NameFields() {
  const [first, setFirst] = useState('Oluwatobiloba');
  const [last, setLast] = useState('Adeyemi');
  return <View style={{ gap: theme.space['400'] }}><TextField label="Name" accessibilityLabel="First name" value={first} onChangeText={setFirst} /><TextField accessibilityLabel="Last name" value={last} onChangeText={setLast} /></View>;
}
export const NameForm: Story = { render: () => <NameFields /> };
