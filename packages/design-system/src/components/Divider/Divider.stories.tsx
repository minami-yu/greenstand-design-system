/**
 * Divider stories — CSF catalog aligned with Figma Divider (12962:9382).
 */
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { StorybookStoryShell } from '../../storybook/ui';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

function DividerDemoFrame({ children }: { children: ReactNode }) {
  return <View style={{ alignSelf: 'stretch', width: 360 }}>{children}</View>;
}

/** Interactive sandbox — divider stretches to the demo frame width. */
export const Playground: Story = {
  parameters: {
    ...storybookPlaygroundParameters,
    controls: { disable: true }
  },
  render: function Playground() {
    return (
      <StorybookStoryShell align="center">
        <DividerDemoFrame>
          <Divider />
        </DividerDemoFrame>
      </StorybookStoryShell>
    );
  }
};

/** Figma reference — horizontal rule between stacked content. Shown in MDX only. */
export const Default: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true }
  },
  render: function Default() {
    const t = useTheme();

    return (
      <StorybookStoryShell align="center">
        <DividerDemoFrame>
          <View style={{ gap: theme.space['400'], width: '100%' }}>
            <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.primary }]}>
              Content above
            </Text>
            <Divider />
            <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.primary }]}>
              Content below
            </Text>
          </View>
        </DividerDemoFrame>
      </StorybookStoryShell>
    );
  }
};
