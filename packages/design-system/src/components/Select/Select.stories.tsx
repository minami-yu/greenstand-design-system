import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Select } from './Select';
import { ListItem } from '../ListItem/ListItem';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
const meta = {
  title: 'Components/Select', component: Select,
  args: { label: 'Organization', value: 'Kilimanjaro Project', onPress: () => {} },
  argTypes: {
    hideLabel: { description: 'Hide the visible label while retaining its accessible name.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    leadingContent: { description: 'Optional decorative artwork before the selected value.', control: false, table: { type: { summary: 'ReactNode' } } },
    label: { description: 'Visible field label.', control: 'text', table: { type: { summary: 'string' } } },
    value: { description: 'Selected option label.', control: 'text', table: { type: { summary: 'string' } } },
    placeholder: { description: 'Text when no option is selected.', control: 'text', table: { type: { summary: 'string' } } },
    avatarSource: { description: 'Optional selected-option avatar.', control: false, table: { type: { summary: 'ImageSourcePropType' } } },
    disabled: { description: 'Prevent activation.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    expanded: { description: 'Whether the caller’s picker is open.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    onPress: { description: 'Open the caller’s picker.', control: false, table: { type: { summary: '() => void' } } }
  },
  parameters: storybookDocsArgTypesInclude(['hideLabel', 'leadingContent', 'label', 'value', 'placeholder', 'avatarSource', 'disabled', 'expanded', 'onPress'])
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Empty: Story = { args: { value: undefined } };
export const Disabled: Story = { args: { disabled: true } };
function Example() {
  const [value, setValue] = useState('Kilimanjaro Project');
  const [open, setOpen] = useState(false);
  return <View><Select label="Organization" value={value} expanded={open} onPress={() => setOpen(!open)} />{open && ['Kilimanjaro Project', 'Greenstand'].map(option => <ListItem key={option} label={option} trailingElement="radioButton" selected={value === option} onSelectedChange={() => { setValue(option); setOpen(false); }} />)}</View>;
}
export const Interactive: Story = { render: () => <Example /> };

export const HiddenLabel: Story = { args: { label: 'Country', hideLabel: true, value: 'United States (+1)' } };
