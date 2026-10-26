import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { IconButton } from './IconButton';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';
const meta = { title: 'Components/IconButton', component: IconButton, args: { icon: 'my-location', accessibilityLabel: 'Center map' }, argTypes: {"icon": {"control": false, "description": "Icon registry name.", "table": {"type": {"summary": "IconName"}}}, "variant": {"control": "select", "description": "Visual treatment; subtle preserves the compact legacy presentation.", "table": {"type": {"summary": storybookQuotedUnion(['primary', 'surface', 'secondary', 'subtle'])}}, "options": ["primary", "surface", "secondary", "subtle"]}, "disabled": {"control": "boolean", "description": "Disable activation.", "table": {"type": {"summary": "boolean"}}}, "onPress": {"control": false, "description": "Called when activated.", "table": {"type": {"summary": "(event) => void"}}}}, parameters: storybookDocsArgTypesInclude(['icon', 'variant', 'disabled', 'onPress']), decorators: [(Story) => <View style={{ padding: theme.space['400'], width: '100%' }}><Story /></View>] } satisfies Meta<typeof IconButton>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};

export const Secondary: StoryObj<typeof meta> = { args: { variant: 'secondary' } };
export const Subtle: StoryObj<typeof meta> = { args: { variant: 'subtle', icon: 'filter-outline', accessibilityLabel: 'Filter trees' } };
export const Disabled: StoryObj<typeof meta> = { args: { disabled: true } };

export const Primary: StoryObj<typeof meta> = { args: { variant: 'primary', icon: 'add', accessibilityLabel: 'Add user' } };
