import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StorybookStoryShell } from '../../storybook/ui';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { useTheme } from '../../theme/useTheme';
import { CameraFocus } from './CameraFocus';

const meta = {
  title: 'Components/CameraFocus',
  component: CameraFocus,
  argTypes: {
    accessibilityLabel: {
      control: 'text',
      description: 'Optional accessible name when the focus reticle conveys information.',
      table: { type: { summary: 'string' } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['accessibilityLabel'])
} satisfies Meta<typeof CameraFocus>;

export default meta;

type Story = StoryObj<typeof meta>;

function CameraPreviewFrame({ children }: { children: React.ReactNode }) {
  const t = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: t.color.background.neutral.default,
        height: 180,
        justifyContent: 'center',
        width: 180
      }}
    >
      {children}
    </View>
  );
}

function CameraPreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <StorybookStoryShell align="center">
      <ThemeProvider mode="dark">
        <CameraPreviewFrame>{children}</CameraPreviewFrame>
      </ThemeProvider>
    </StorybookStoryShell>
  );
}

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <CameraPreviewShell>
      <CameraFocus {...args} />
    </CameraPreviewShell>
  )
};

export const Default: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <CameraPreviewShell>
      <CameraFocus />
    </CameraPreviewShell>
  )
};
