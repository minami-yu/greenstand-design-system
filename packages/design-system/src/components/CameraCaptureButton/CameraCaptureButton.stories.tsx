import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StorybookStoryShell } from '../../storybook/ui';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { CameraCaptureButton } from './CameraCaptureButton';

const meta = {
  title: 'Components/CameraCaptureButton',
  component: CameraCaptureButton,
  argTypes: {
    accessibilityLabel: {
      control: 'text',
      description: 'Accessible name for the capture action.',
      table: { type: { summary: 'string' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the pressable capture action.',
      table: { type: { summary: 'boolean' } }
    },
    onPress: {
      action: 'press',
      description: 'Called when the capture button is pressed.',
      table: { type: { summary: 'PressableProps["onPress"]' } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['accessibilityLabel', 'disabled', 'onPress'])
} satisfies Meta<typeof CameraCaptureButton>;

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
  args: {
    accessibilityLabel: 'Capture photo'
  },
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <CameraPreviewShell>
      <CameraCaptureButton {...args} />
    </CameraPreviewShell>
  )
};

export const Default: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <CameraPreviewShell>
      <View style={{ padding: theme.space['400'] }}>
        <CameraCaptureButton />
      </View>
    </CameraPreviewShell>
  )
};
