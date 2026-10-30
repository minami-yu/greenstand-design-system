import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { DetailRow } from './DetailRow';
import { Avatar } from '../Avatar/Avatar';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';

const meta = {
  title: 'Components/DetailRow', component: DetailRow,
  args: { label: 'Species', children: 'Mvule', showDivider: true },
  argTypes: {
    label: { description: 'Content-width label on the left.', control: 'text', table: { type: { summary: 'string' } } },
    children: { description: 'Right-aligned text or custom value content.', control: 'text', table: { type: { summary: 'ReactNode' } } },
    showDivider: { description: 'Show the bottom divider.', control: 'boolean', table: { type: { summary: 'boolean' } } }
  },
  parameters: storybookDocsArgTypesInclude(['label', 'children', 'showDivider'])
} satisfies Meta<typeof DetailRow>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const WithoutDivider: Story = { args: { showDivider: false } };
export const LongValue: Story = { args: { label: 'Organization', children: 'Kilimanjaro community tree planting project' } };
function IdentityValue() {
  const t = useTheme();
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.space['200'], maxWidth: '100%' }}>
    <Avatar size="xs" type="initial" initial="OA" />
    <Text style={[t.typography.paragraphM, { flexShrink: 1, textAlign: 'right', color: t.color.text.neutral.primary }]}>Oluwatobiloba Adeyemi</Text>
  </View>;
}
export const CustomValue: Story = {
  args: { label: 'Planter' },
  render: args => <DetailRow {...args}><IdentityValue /></DetailRow>
};
