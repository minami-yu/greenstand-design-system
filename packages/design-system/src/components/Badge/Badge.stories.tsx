/**
 * Badge stories — CSF catalog aligned with Figma Badge (13148:62280).
 *
 * Snapshot-friendly stories freeze `type`, `size`, and `value` for visual regression.
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
import {
  storybookDocsArgTypesInclude,
  storybookQuotedUnion
} from '../../storybook/storybookArgTypes';
import { useTheme } from '../../theme/useTheme';
import { Badge } from './Badge';
import type { BadgeSize, BadgeType } from './getBadgeLayout';

const types: BadgeType[] = ['label', 'dot'];
const sizes: BadgeSize[] = ['md', 'lg'];

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    type: 'label',
    size: 'md',
    value: '1'
  },
  argTypes: {
    type: {
      control: 'select',
      description: 'Whether the badge shows a count or just adot.',
      options: types,
      table: { type: { summary: storybookQuotedUnion(types) } }
    },
    size: {
      control: 'select',
      description: 'Badge dimensions from getBadgeLayout token map.',
      options: sizes,
      table: { type: { summary: storybookQuotedUnion(sizes) } }
    },
    value: {
      control: 'text',
      description: 'Numeric label when type is "label".',
      table: { type: { summary: 'string' } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['type', 'size', 'value'])
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

        {types.map((badgeType) => (
          <StorybookVariantRow key={badgeType} gap="sm">
            <StorybookVariantCell columnWidth={matrixLabelWidth} align="start">
              <Text
                style={[t.typography.labelS, { color: t.color.text.neutral.primary }]}
              >
                {badgeType}
              </Text>
            </StorybookVariantCell>

            {sizes.map((size) => (
              <StorybookVariantCell key={size} align="center" columnWidth={matrixColumnWidth}>
                <Badge size={size} type={badgeType} value="1" />
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
