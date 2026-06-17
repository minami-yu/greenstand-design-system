/**
 * Badge stories — CSF catalog aligned with Figma Badge (13148:62280).
 *
 * Snapshot-friendly stories freeze `badge`, `size`, and `value` for visual regression.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Badge } from './Badge';
import type { BadgeSize, BadgeType } from './getBadgeLayout';

const badgeTypes: BadgeType[] = ['label', 'dot'];
const sizes: BadgeSize[] = ['medium', 'large'];

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    badge: 'label',
    size: 'medium',
    value: '1'
  },
  argTypes: {
    badge: {
      control: 'select',
      description: 'Figma `badge` property — label shows a count, dot is indicator-only.',
      options: badgeTypes
    },
    size: {
      control: 'select',
      description: 'Badge dimensions from getBadgeLayout token map.',
      options: sizes
    },
    value: {
      control: 'text',
      description: 'Numeric label when badge is "label". Keep short (e.g. 1, 9, 99).'
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive sandbox — toggle badge type, size, and value. */
export const Playground: Story = {};

function VariantsMatrix() {
  const t = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        gap: theme.space['400'],
        padding: theme.space['400']
      }}
    >
      <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>
        badge × size · Figma component set (12918:1005)
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: theme.space['400'],
          paddingLeft: 80
        }}
      >
        {sizes.map((size) => (
          <Text
            key={size}
            style={[
              t.typography.labelSStrong,
              { color: t.color.text.neutral.secondary, flex: 1, textAlign: 'center' }
            ]}
          >
            {size}
          </Text>
        ))}
      </View>

      {badgeTypes.map((badge) => (
        <View
          key={badge}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: theme.space['400']
          }}
        >
          <Text
            style={[
              t.typography.labelSStrong,
              { color: t.color.text.neutral.primary, width: 80 }
            ]}
          >
            {badge}
          </Text>

          {sizes.map((size) => (
            <View key={size} style={{ alignItems: 'center', flex: 1 }}>
              <Badge badge={badge} size={size} value="1" />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

/** Snapshot-friendly matrix of all Figma badge variants. */
export const Variants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => <VariantsMatrix />
};

/** Common notification counts for label badges. */
export const LabelValues: Story = {
  name: 'Label Values',
  parameters: {
    controls: { disable: true }
  },
  render: () => {
    const t = useTheme();

    return (
      <View style={{ flexDirection: 'row', gap: theme.space['200'], padding: theme.space['400'] }}>
        {['1', '9', '99'].map((value) => (
          <View key={value} style={{ alignItems: 'center', gap: theme.space['100'] }}>
            <Badge badge="label" size="medium" value={value} />
            <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    );
  }
};
