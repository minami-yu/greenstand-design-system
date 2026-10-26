import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { CurrentLocationTag } from './CurrentLocationTag';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';
const meta = { title: 'Components/CurrentLocationTag', component: CurrentLocationTag, args: { accessibilityLabel: 'Current location' }, argTypes: {"style": {"control": false, "description": "Position the marker without clipping its shadow.", "table": {"type": {"summary": "StyleProp<ViewStyle>"}}}}, parameters: storybookDocsArgTypesInclude(['style']), decorators: [(Story) => <View style={{ padding: theme.space['400'], width: '100%' }}><Story /></View>] } satisfies Meta<typeof CurrentLocationTag>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
