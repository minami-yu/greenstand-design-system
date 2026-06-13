import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Surface container with token-driven padding, radius, and elevation.'
      }
    }
  },
  render: () => <Card />
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
