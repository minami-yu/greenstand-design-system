import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StorybookStoryShell } from '../../storybook/ui';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { SimpleTreeTag, type SimpleTreeTagType } from './SimpleTreeTag';

const types: SimpleTreeTagType[] = ['default', 'small', 'focus', 'number'];
const meta = {
  title: 'Components/SimpleTreeTag', component: SimpleTreeTag,
  args: { type: 'default', value: '120' },
  argTypes: {
    type: { control: 'select', options: types, description: 'Figma marker variant: tree, dot, pin (focus), or cluster count.', table: { type: { summary: storybookQuotedUnion(types) } } },
    value: { control: 'text', description: 'Cluster count shown by the number variant.', table: { type: { summary: 'string' } } }
  },
  parameters: storybookDocsArgTypesInclude(['type', 'value']),
  decorators: [(Story) => <StorybookStoryShell><Story /></StorybookStoryShell>]
} satisfies Meta<typeof SimpleTreeTag>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
function Examples() {
  const t = useTheme();
  return <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: t.color.fill.info.default, padding: theme.space['600'], gap: theme.space['600'] }}>
    {types.map(type => <SimpleTreeTag key={type} type={type} accessibilityLabel={type === 'number' ? '120 trees' : 'Tree location'} />)}
  </View>;
}
export const Variants: Story = { render: () => <Examples /> };
export const Count: Story = { args: { type: 'number' } };
