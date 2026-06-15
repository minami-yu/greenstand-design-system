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
  args: {
    name: 'close',
    size: 'md',
    color: 'neutral.primary'
  },
  argTypes: {
    name: {
      control: 'select',
      description: 'Icon glyph key from icons.ts (Figma frame Icons 12663:7261).',
      options: iconNames
    },
    size: {
      control: 'select',
      description: 'Icon dimension from theme.icon scale.',
      options: Object.keys(theme.icon)
    },
    color: {
      control: 'select',
      description: 'Semantic icon color resolved via resolveIconColor.',
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
  const cellSize = theme.space['1600'] + theme.space['800'];

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
            gap: theme.space['200'],
            height: cellSize,
            justifyContent: 'center',
            padding: theme.space['300'],
            width: cellSize
          }}
        >
          <Icon color="neutral.primary" name={name} size="lg" />
          <Text
            numberOfLines={2}
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
