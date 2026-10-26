import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Banner, type BannerTone } from './Banner';
import { StorybookStoryShell } from '../../storybook/ui';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';

const tones = ['warning', 'error', 'success', 'info', 'neutral'] as const satisfies readonly BannerTone[];

const meta = {
  title: 'Components/Banner',
  component: Banner,
  args: {
    message: 'Your changes have been saved.',
    showTrailingIcon: true,
    title: 'Title',
    tone: 'warning'
  },
  argTypes: {
    tone: { control: 'select', options: tones, description: 'Semantic visual treatment.', table: { type: { summary: storybookQuotedUnion(tones) } } },
    title: { control: 'text', description: 'Optional strong heading.', table: { type: { summary: 'string' } } },
    message: { control: 'text', description: 'Supporting banner message.', table: { type: { summary: 'string' } } },
    fullWidth: { control: 'boolean', description: 'Uses edge-to-edge emphasis colors and removes the radius.', table: { type: { summary: 'boolean' } } },
    leadingIcon: { control: false, description: 'Overrides the default semantic icon.', table: { type: { summary: 'IconName' } } },
    showTrailingIcon: { control: 'boolean', description: 'Shows the trailing chevron.', table: { type: { summary: 'boolean' } } },
    onPress: { control: false, description: 'Makes the banner actionable.', table: { type: { summary: '(event) => void' } } }
  },
  parameters: storybookDocsArgTypesInclude(['tone', 'title', 'message', 'fullWidth', 'leadingIcon', 'showTrailingIcon', 'onPress']),
  decorators: [(Story) => <StorybookStoryShell><Story /></StorybookStoryShell>]
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ContainedTones: Story = {
  render: args => <View style={{ gap: theme.space['300'], width: '100%' }}>
    {tones.map(tone => <Banner {...args} key={tone} tone={tone} />)}
  </View>
};

export const FullWidthTones: Story = {
  render: args => <View style={{ gap: theme.space['300'], width: '100%' }}>
    {tones.map(tone => <Banner {...args} fullWidth key={tone} tone={tone} />)}
  </View>
};

export const MessageOnly: Story = {
  args: { showTrailingIcon: false, title: undefined }
};
