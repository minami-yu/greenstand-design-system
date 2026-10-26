import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SearchField, type SearchFieldVariant } from './SearchField';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';

const variants = ['default', 'outlined', 'surface'] as const satisfies readonly SearchFieldVariant[];

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  args: { showAudio: true, variant: 'outlined' },
  argTypes: {
    value: { control: 'text', description: 'Controlled search text.', table: { type: { summary: 'string' } } },
    onChangeText: { control: false, description: 'Receives search input and clear actions.', table: { type: { summary: '(value: string) => void' } } },
    placeholder: { control: 'text', description: 'Hint shown while empty.', table: { type: { summary: 'string' } } },
    onVoicePress: { control: false, description: 'Enables the voice action when provided.', table: { type: { summary: '() => void' } } },
    showAudio: { control: 'boolean', description: 'Shows the trailing voice-search action while empty.', table: { type: { summary: 'boolean' } } },
    variant: { control: 'select', options: variants, description: 'Sets the field surface treatment.', table: { type: { summary: storybookQuotedUnion(variants) } } }
  },
  parameters: storybookDocsArgTypesInclude(['value', 'onChangeText', 'placeholder', 'onVoicePress', 'showAudio', 'variant']),
  decorators: [(Story) => <View style={{ padding: theme.space['400'], width: '100%' }}><Story /></View>]
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Interactive: Story = {
  render: args => {
    const [value, setValue] = useState('');
    return <SearchField {...args} value={value} onChangeText={setValue} onVoicePress={() => undefined} />;
  }
};
