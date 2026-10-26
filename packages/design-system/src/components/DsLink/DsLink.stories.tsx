import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import {
  StorybookStoryShell,
  StorybookVariantCatalog,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import {
  storybookDocsArgTypesInclude,
  storybookQuotedUnion
} from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { DsLink, type DsLinkColor, type DsLinkEmphasis, type DsLinkIconPosition, type DsLinkSize } from './DsLink';

const colors: DsLinkColor[] = ['brand', 'neutralPrimary', 'neutralSecondary', 'neutralTertiary'];
const emphases: DsLinkEmphasis[] = ['default', 'low'];
const iconPositions: DsLinkIconPosition[] = ['none', 'leading', 'trailing'];
const sizes: DsLinkSize[] = ['md', 'sm'];

const meta = {
  title: 'Components/DsLink',
  component: DsLink,
  args: {
    color: 'brand',
    emphasis: 'default',
    icon: 'trailing',
    inline: false,
    label: 'Link',
    leadingIcon: 'refresh',
    size: 'md',
    trailingIcon: 'chevron-right'
  },
  argTypes: {
    color: {
      control: 'select',
      description: 'Semantic text/icon color from the Figma Link color variants.',
      options: colors,
      table: { type: { summary: storybookQuotedUnion(colors) } }
    },
    emphasis: {
      control: 'select',
      description: 'Typography emphasis. Inline low emphasis uses regular-weight paragraph tokens.',
      options: emphases,
      table: { type: { summary: storybookQuotedUnion(emphases) } }
    },
    icon: {
      control: 'select',
      description: 'Icon placement for standalone links. Inline links render text only.',
      options: iconPositions,
      table: { type: { summary: storybookQuotedUnion(iconPositions) } }
    },
    inline: {
      control: 'boolean',
      description: 'Uses the inline underlined treatment from Figma.',
      table: { type: { summary: 'boolean' } }
    },
    label: {
      control: 'text',
      description: 'Visible link text.',
      table: { type: { summary: 'string' } }
    },
    leadingIcon: {
      control: 'select',
      description: 'Icon name used when icon is leading.',
      options: ['refresh', 'chevron-right', 'external-link'],
      table: { type: { summary: 'IconName' } }
    },
    size: {
      control: 'select',
      description: 'Link size variant.',
      options: sizes,
      table: { type: { summary: storybookQuotedUnion(sizes) } }
    },
    trailingIcon: {
      control: 'select',
      description: 'Icon name used when icon is trailing.',
      options: ['chevron-right', 'external-link', 'arrow-right'],
      table: { type: { summary: 'IconName' } }
    }
  },
  parameters: storybookDocsArgTypesInclude([
    'color',
    'emphasis',
    'icon',
    'inline',
    'label',
    'leadingIcon',
    'size',
    'trailingIcon'
  ])
} satisfies Meta<typeof DsLink>;

export default meta;

type Story = StoryObj<typeof meta>;

const matrixColumnWidth = 116;
const matrixLabelWidth = 112;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => (
    <StorybookStoryShell align="center">
      <DsLink {...args} />
    </StorybookStoryShell>
  )
};

function MatrixLabel({ children }: { children: string }) {
  const t = useTheme();

  return (
    <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>
      {children}
    </Text>
  );
}

export const Standalone: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog gap="sm">
        <StorybookVariantRow gap="md">
          <StorybookVariantCell columnWidth={matrixLabelWidth} />
          {iconPositions.map((icon) => (
            <StorybookVariantCell key={icon} align="center" columnWidth={matrixColumnWidth}>
              <MatrixLabel>{icon}</MatrixLabel>
            </StorybookVariantCell>
          ))}
        </StorybookVariantRow>

        {sizes.map((size) => (
          <StorybookVariantRow key={size} gap="md">
            <StorybookVariantCell align="start" columnWidth={matrixLabelWidth}>
              <MatrixLabel>{size}</MatrixLabel>
            </StorybookVariantCell>
            {iconPositions.map((icon) => (
              <StorybookVariantCell key={icon} align="center" columnWidth={matrixColumnWidth}>
                <DsLink icon={icon} label="Link" size={size} />
              </StorybookVariantCell>
            ))}
          </StorybookVariantRow>
        ))}
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  )
};

export const InlineColors: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog gap="sm">
        <StorybookVariantRow gap="md">
          <StorybookVariantCell columnWidth={matrixLabelWidth} />
          {colors.map((color) => (
            <StorybookVariantCell key={color} align="center" columnWidth={matrixColumnWidth}>
              <MatrixLabel>{color}</MatrixLabel>
            </StorybookVariantCell>
          ))}
        </StorybookVariantRow>

        {emphases.map((emphasis) => (
          <StorybookVariantRow key={emphasis} gap="md">
            <StorybookVariantCell align="start" columnWidth={matrixLabelWidth}>
              <MatrixLabel>{emphasis}</MatrixLabel>
            </StorybookVariantCell>
            {colors.map((color) => (
              <StorybookVariantCell key={color} align="center" columnWidth={matrixColumnWidth}>
                <View style={{ gap: theme.space['300'] }}>
                  <DsLink color={color} emphasis={emphasis} inline label="Link" size="md" />
                  <DsLink color={color} emphasis={emphasis} inline label="Link" size="sm" />
                </View>
              </StorybookVariantCell>
            ))}
          </StorybookVariantRow>
        ))}
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  )
};
