import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Box } from './Box';

const meta = {
  title: 'Components/Box',
  component: Box,
  args: {
    p: '4',
    gap: '2',
    radius: 'md'
  },
  argTypes: {
    p: {
      control: 'select',
      options: ['0', '1', '2', '4', '8', '16', 'n4']
    },
    px: {
      control: 'select',
      options: ['0', '1', '2', '4', '8', '16', 'n4']
    },
    py: {
      control: 'select',
      options: ['0', '1', '2', '4', '8', '16', 'n4']
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '4', '8', '16']
    },
    radius: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg']
    }
  },
  render: (args) => (
    <Box {...args} style={{ backgroundColor: '#EAF2FF' }}>
      <Text>Box layout primitive</Text>
      <Text>Token-driven spacing and radius</Text>
    </Box>
  )
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
