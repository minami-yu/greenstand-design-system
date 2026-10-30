import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { IconButton } from './IconButton';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';
const sizes = ['xs', 'sm', 'md'] as const;
const variants = ['primary', 'surface', 'secondary', 'subtle'] as const;
const meta = {
  title: 'Components/IconButton', component: IconButton,
  args: { icon: 'my-location', accessibilityLabel: 'Center map' },
  argTypes: {
    icon: { control: false, description: 'Icon registry name.', table: { type: { summary: 'IconName' } } },
    size: { control: 'select', options: sizes, description: 'Circle/icon size: xs 28/16, sm 36/18, md 48/28. Defaults to md, or sm for legacy subtle.', table: { type: { summary: storybookQuotedUnion(sizes) } } },
    variant: { control: 'select', options: variants, description: 'Visual treatment; subtle retains secondary styling and defaults to sm.', table: { type: { summary: storybookQuotedUnion(variants) } } },
    disabled: { control: 'boolean', description: 'Disable activation.', table: { type: { summary: 'boolean' } } },
    onPress: { control: false, description: 'Called when activated.', table: { type: { summary: '(event) => void' } } }
  },
  parameters: storybookDocsArgTypesInclude(['icon', 'size', 'variant', 'disabled', 'onPress']),
  decorators: [(Story) => <View style={{ padding: theme.space['400'], width: '100%' }}><Story /></View>]
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Sizes: Story = { render: args => <View style={{ flexDirection: 'row', gap: theme.space['400'] }}>{sizes.map(size => <IconButton {...args} key={size} size={size} variant="secondary" accessibilityLabel={`${size} example`} />)}</View> };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Subtle: Story = { args: { variant: 'subtle', icon: 'filter-outline', accessibilityLabel: 'Filter trees' } };
export const Disabled: Story = { args: { disabled: true } };
export const Primary: Story = { args: { variant: 'primary', icon: 'add', accessibilityLabel: 'Add user' } };
function MapListSwitch() {
  const [list, setList] = useState(false);
  return <View style={{ alignSelf: 'flex-end', marginRight: theme.space.n100 }}><IconButton size="sm" variant="secondary" icon={list ? 'map-outline' : 'list-box-outline'} accessibilityLabel={list ? 'Show map' : 'Show list'} onPress={() => setList(previous => !previous)} /></View>;
}
export const MapList: Story = { render: () => <MapListSwitch /> };
