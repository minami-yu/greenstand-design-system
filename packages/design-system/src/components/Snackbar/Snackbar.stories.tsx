import { useState } from 'react';
import { View } from 'react-native';
import { theme } from '../../theme/tokens';
import { Button } from '../Button/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
const meta = {
  title: 'Components/Snackbar', component: Snackbar,
  args: { message: 'Upload completed!', icon: 'check-circle' },
  argTypes: {
    message: { description: 'Feedback message.', control: 'text', table: { type: { summary: 'string' } } },
    icon: { description: 'Leading status icon.', control: 'text', table: { type: { summary: 'IconName' } } }
  },
  parameters: storybookDocsArgTypesInclude(['message', 'icon'])
} satisfies Meta<typeof Snackbar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const LongMessage: Story = { args: { message: 'All photos have been uploaded. You can continue capturing more trees.' } };

export const FadeIn: Story = {
  render: function FadeInExample(args) {
    const [replay, setReplay] = useState(0);
    return <View style={{ gap: theme.space['400'] }}>
      <Button label="Replay fade in" variant="secondary" onPress={() => setReplay(value => value + 1)} />
      <Snackbar key={replay} {...args} />
    </View>;
  }
};
