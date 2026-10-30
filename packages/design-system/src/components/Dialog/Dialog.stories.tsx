import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { theme } from '../../theme/tokens';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
const meta = {
  title: 'Components/Dialog', component: Dialog,
  args: { title: 'Title', body: 'Use a short message to explain the next action.' },
  argTypes: {
    title: { description: 'Visible heading.', control: 'text', table: { type: { summary: 'string' } } },
    body: { description: 'Supporting message.', control: 'text', table: { type: { summary: 'string' } } },
    children: { description: 'Content slot for illustrations and actions.', control: false, table: { type: { summary: 'ReactNode' } } },
    showClose: { description: 'Display a close button when onClose is supplied.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    onClose: { description: 'Close button, Back, or Escape handler.', control: false, table: { type: { summary: '() => void' } } },
    modal: { description: 'Present over the screen with a backdrop and focus containment.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    visible: { description: 'Controlled visibility.', control: 'boolean', table: { type: { summary: 'boolean' } } }
  },
  parameters: storybookDocsArgTypesInclude(['title', 'body', 'children', 'showClose', 'onClose', 'modal', 'visible'])
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = { parameters: { docs: { description: { story: 'Uses 80% of the available container width and hugs content vertically. Resize the preview to check message wrapping.' } } } };
export const Confirmation: Story = {
  args: { title: 'Are you sure you want to log out?', body: 'You’re offline. If you log out, you won’t be able to log back in until you’re online.', showClose: true, onClose: () => {} },
  render: args => <Dialog {...args}><View style={{ width: '100%', gap: theme.space['200'], marginTop: theme.space['200'] }}><Button label="Keep logged in" leadingIcon="arrow-left" variant="secondary" /><Button label="Log out" leadingIcon="logout" variant="error-secondary" /></View></Dialog>,
  parameters: { docs: { description: { story: 'Long warning copy wraps above full-width, vertically stacked actions.' } } }
};
export const WithClose: Story = { args: { showClose: true, onClose: () => {} }, parameters: { docs: { description: { story: 'Uses the shared xs IconButton with a 44 px touch target.' } } } };
function ModalExample() {
  const [visible, setVisible] = useState(false);
  return <><Button label="Open dialog" onPress={() => setVisible(true)} /><Dialog modal visible={visible} title="Ready to continue?" body="Review the message before continuing." showClose onClose={() => setVisible(false)}><Button label="Continue" onPress={() => setVisible(false)} /></Dialog></>;
}
export const Interactive: Story = { render: () => <ModalExample />, parameters: { docs: { description: { story: 'Open, close, and reopen to preview the fade-in. Reduce Motion displays the dialog immediately.' } } } };
