import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { PointerDialog } from './PointerDialog';
import { Button } from '../Button/Button';
import { theme } from '../../theme/tokens';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
const directions = ['up', 'down'] as const;
const alignments = ['left', 'center', 'right'] as const;
const meta = {
  title: 'Components/PointerDialog', component: PointerDialog,
  args: { title: 'Capture a tree', body: 'Use the camera to record each planted tree.', direction: 'down', align: 'center' },
  argTypes: {
    title: { description: 'Visible heading.', control: 'text', table: { type: { summary: 'string' } } },
    body: { description: 'Supporting message.', control: 'text', table: { type: { summary: 'string' } } },
    children: { description: 'Custom content and actions.', control: false, table: { type: { summary: 'ReactNode' } } },
    direction: { description: 'Edge containing the pointer.', control: 'select', options: directions, table: { type: { summary: storybookQuotedUnion(directions) } } },
    align: { description: 'Pointer alignment along the edge.', control: 'select', options: alignments, table: { type: { summary: storybookQuotedUnion(alignments) } } },
    pointerOffset: { description: 'Measured pointer offset from the left edge; overrides align.', control: 'number', table: { type: { summary: 'number' } } },
    visible: { description: 'Controlled visibility.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    showClose: { description: 'Show the optional close control.', control: 'boolean', table: { type: { summary: 'boolean' } } },
    onClose: { description: 'Close action.', control: false, table: { type: { summary: '() => void' } } }
  },
  parameters: storybookDocsArgTypesInclude(['title', 'body', 'children', 'direction', 'align', 'pointerOffset', 'visible', 'showClose', 'onClose'])
} satisfies Meta<typeof PointerDialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Variants: Story = { render: args => <View style={{ gap: theme.space['400'], alignItems: 'center' }}>{directions.flatMap(direction => alignments.map(align => <PointerDialog {...args} key={`${direction}-${align}`} direction={direction} align={align} title={`${direction} / ${align}`} />))}</View> };
function Example() {
  const [open, setOpen] = useState(true);
  return open ? <PointerDialog title="Add users" body="You can also add people who use this device." align="left"><Button label="Start using" leadingIcon="check" onPress={() => setOpen(false)} /></PointerDialog> : <Button label="Show instruction" onPress={() => setOpen(true)} />;
}
export const Interactive: Story = { render: () => <Example />, parameters: { docs: { description: { story: 'Dismiss and reopen to replay the synchronized card and pointer fade-in. Reduce Motion skips the transition.' } } } };
