/**
 * Badge stories — CSF catalog aligned with Figma Badge (13148:62280).
 *
 * Snapshot-friendly stories freeze `badge`, `size`, and `value` for visual regression.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import {
  StorybookStoryShell,
  StorybookVariantCatalog,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
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

const matrixColumnWidth = 100;
const matrixLabelWidth = 80;

/** Interactive sandbox — toggle badge type, size, and value. */
export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    return (
      <StorybookStoryShell align="center">
        <Badge {...args} />
      </StorybookStoryShell>
    );
  }
};

function VariantsMatrix() {
  const t = useTheme();

  return (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog gap="sm">
        <StorybookVariantRow gap="sm">
          <StorybookVariantCell columnWidth={matrixLabelWidth} />
          {sizes.map((size) => (
            <StorybookVariantCell key={size} align="center" columnWidth={matrixColumnWidth}>
              <Text
                style={[
                  t.typography.labelS,
                  { color: t.color.text.neutral.secondary, textAlign: 'center' }
                ]}
              >
                {size}
              </Text>
            </StorybookVariantCell>
          ))}
        </StorybookVariantRow>

        {badgeTypes.map((badge) => (
          <StorybookVariantRow key={badge} gap="sm">
            <StorybookVariantCell columnWidth={matrixLabelWidth} align="start">
              <Text
                style={[t.typography.labelS, { color: t.color.text.neutral.primary }]}
              >
                {badge}
              </Text>
            </StorybookVariantCell>

            {sizes.map((size) => (
              <StorybookVariantCell key={size} align="center" columnWidth={matrixColumnWidth}>
                <Badge badge={badge} size={size} value="1" />
              </StorybookVariantCell>
            ))}
          </StorybookVariantRow>
        ))}
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  );
}

/** Snapshot-friendly matrix of all Figma badge variants. */
export const Variants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => <VariantsMatrix />
};
