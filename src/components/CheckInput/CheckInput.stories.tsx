/**
 * CheckInput stories — CSF catalog aligned with Figma CheckInput (12982:15345).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
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
  storybookArgTypeAccessibilityLabel
} from '../../storybook/storybookArgTypes';
import { useTheme } from '../../theme/useTheme';
import { CheckInput } from './CheckInput';

const meta = {
  title: 'Components/CheckInput',
  component: CheckInput,
  args: {
    selected: true,
    disabled: false,
    accessibilityLabel: 'Accept terms'
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Figma `selected` property — checked or unchecked.',
      table: { type: { summary: 'boolean' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Figma `disabled` — muted ring/fill and white check when selected.',
      table: { type: { summary: 'boolean' } }
    },
    onSelectedChange: {
      action: 'selected',
      description: 'Called with the next selected value when the control is pressed.',
      table: { type: { summary: '(selected: boolean) => void' } }
    },
    accessibilityLabel: {
      ...storybookArgTypeAccessibilityLabel,
      description:
        'Screen reader name when the checkbox has no adjacent visible label (e.g. "Accept terms"). See Accessibility/Overview.'
    }
  },
  parameters: storybookDocsArgTypesInclude([
    'selected',
    'disabled',
    'onSelectedChange',
    'accessibilityLabel'
  ])
} satisfies Meta<typeof CheckInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const matrixColumnWidth = 100;
const matrixLabelWidth = 80;

const selectedStates = [
  { label: 'Selected=True', selected: true },
  { label: 'Selected=False', selected: false },
] as const;

const disabledStates = [
  { disabled: false, label: 'Enabled' },
  { disabled: true, label: 'Disabled' }
] as const;

/** Interactive sandbox — controls and Code panel stay in sync via Storybook args. */
export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    const [, updateArgs] = useArgs();

    return (
      <StorybookStoryShell align="center">
        <CheckInput
          {...args}
          onSelectedChange={(next) => {
            updateArgs({ selected: next });
            args.onSelectedChange?.(next);
          }}
        />
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
          {selectedStates.map(({ label }) => (
            <StorybookVariantCell key={label} align="center" columnWidth={matrixColumnWidth}>
              <Text
                style={[
                  t.typography.labelS,
                  { color: t.color.text.neutral.secondary, textAlign: 'center' }
                ]}
              >
                {label}
              </Text>
            </StorybookVariantCell>
          ))}
        </StorybookVariantRow>

        {disabledStates.map(({ disabled, label }) => (
          <StorybookVariantRow key={label} gap="sm">
            <StorybookVariantCell columnWidth={matrixLabelWidth} align="start">
              <Text style={[t.typography.labelS, { color: t.color.text.neutral.primary }]}>
                {label}
              </Text>
            </StorybookVariantCell>

            {selectedStates.map(({ selected }) => (
              <StorybookVariantCell key={selected} align="center" columnWidth={matrixColumnWidth}>
                <CheckInput disabled={disabled} selected={selected} />
              </StorybookVariantCell>
            ))}
          </StorybookVariantRow>
        ))}
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  );
}

/** Figma CheckInput — `disabled` rows × `selected` columns. */
export const Variants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => <VariantsMatrix />
};
