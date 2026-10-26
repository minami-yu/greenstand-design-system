import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StorybookStoryShell } from '../../storybook/ui';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { TreeTag, type TreeTagSize } from './TreeTag';

const sizes: TreeTagSize[] = ['md', 'lg', 'xl'];
const meta = {
  title: 'Components/TreeTag', component: TreeTag,
  args: { size: 'md', background: false },
  argTypes: {
    size: { control: 'select', options: sizes, description: 'Transparent artwork size: 24, 48, or 96 px.', table: { type: { summary: storybookQuotedUnion(sizes) } } },
    background: { control: 'boolean', description: 'Optional tinted tile for md and lg. The xl variant is always transparent.', table: { type: { summary: 'boolean' } } }
  },
  parameters: storybookDocsArgTypesInclude(['size', 'background']),
  decorators: [(Story) => <StorybookStoryShell><Story /></StorybookStoryShell>]
} satisfies Meta<typeof TreeTag>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
function Examples() {
  const t = useTheme();
  return <View style={{ backgroundColor: t.color.fill.info.default, padding: theme.space['600'], gap: theme.space['600'] }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.space['600'] }}>
      {sizes.map(size => <TreeTag key={size} size={size} accessibilityLabel={`${size} tree`} />)}
    </View>
    <View style={{ flexDirection: 'row', gap: theme.space['600'] }}>
      <TreeTag background size="md" accessibilityLabel="Tree in medium tile" />
      <TreeTag background size="lg" accessibilityLabel="Tree in large tile" />
    </View>
  </View>;
}
export const Variants: Story = { render: () => <Examples /> };
