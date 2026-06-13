import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Icon } from './Icon';
import { icons, type IconName } from './icons';

const iconNames = Object.keys(icons).sort() as IconName[];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'MDI-based icon component with token sizes and semantic colors.'
      }
    }
  },
  args: {
    name: 'close',
    size: 'md',
    color: 'neutral.primary'
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames
    },
    size: {
      control: 'select',
      options: Object.keys(theme.icon)
    },
    color: {
      control: 'select',
      options: [
        'neutral.primary',
        'neutral.secondary',
        'brand.default',
        'error.default',
        'success.default'
      ]
    }
  }
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function IconGallery() {
  const t = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.space['400'],
        padding: theme.space['400']
      }}
    >
      {iconNames.map((name) => (
        <View
          key={name}
          style={{
            alignItems: 'center',
            gap: theme.space['100'],
            width: 96
          }}
        >
          <Icon color="neutral.primary" name={name} size="md" />
          <Text
            style={[
              t.typography['label-s'],
              { color: t.color.text.neutral.secondary, textAlign: 'center' }
            ]}
          >
            {name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

/** All icons from Figma frame "Icons" (12663:7261), keyed by title suffix. */
export const Gallery: Story = {
  render: () => <IconGallery />
};
