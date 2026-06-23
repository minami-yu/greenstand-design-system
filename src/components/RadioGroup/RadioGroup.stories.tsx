/**
 * RadioGroup stories — CSF catalog aligned with Figma RadioButton (15274:37789)
 * and RadioGroup (15276:38088).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import {
  StorybookStoryShell,
  StorybookVariantCatalog,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
import { useTheme } from '../../theme/useTheme';
import { RadioButton } from './RadioButton';
import { RadioGroup } from './RadioGroup';

const defaultOptions = [
  { label: 'Label', value: 'option-1' },
  { label: 'Label', value: 'option-2' },
  { label: 'Label', value: 'option-3' },
  { label: 'Label', value: 'option-4' }
];

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    error: false,
    errorText: 'Error message',
    hint: true,
    hintText: 'Hint message',
    hideLabel: false,
    label: 'Label',
    options: defaultOptions,
    value: 'option-1'
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the radio group.',
      table: { type: { summary: 'string' } }
    },
    hideLabel: {
      control: 'boolean',
      description: 'If true, the group label is not displayed.',
      table: { type: { summary: 'boolean' } }
    },
    options: {
      control: 'object',
      description: 'Radio options — each entry has `label`, `value`, and optional `disabled`.',
      table: { type: { summary: 'RadioGroupOption[]' } }
    },
    value: {
      control: 'text',
      description: 'Currently selected option value.',
      table: { type: { summary: 'string' } }
    },
    onValueChange: {
      action: 'valueChange',
      description: 'Called with the next option value when a radio button is pressed.',
      table: { type: { summary: '(value: string) => void' } }
    },
    error: {
      control: 'boolean',
      description: 'Whether the group is in an error state.',
      table: { type: { summary: 'boolean' } }
    },
    errorText: {
      control: 'text',
      description: 'The error text messages.',
      table: { type: { summary: 'string' } }
    },
    hint: {
      control: 'boolean',
      description: 'If true, the hint text is displayed.',
      table: { type: { summary: 'boolean' } }
    },
    hintText: {
      control: 'text',
      description: 'The hint text message.',
      table: { type: { summary: 'string' } }
    }
  },
  parameters: storybookDocsArgTypesInclude([
    'label',
    'hideLabel',
    'options',
    'value',
    'onValueChange',
    'error',
    'errorText',
    'hint',
    'hintText'
  ])
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const matrixColumnWidth = 120;
const matrixLabelWidth = 100;

const selectedStates = [
  { label: 'Selected', selected: true },
  { label: 'Unselected', selected: false }
] as const;

const enabledColumns = [
  { disabled: false, error: false, label: 'Enabled' },
  { disabled: true, error: false, label: 'Disabled' },
  { disabled: false, error: true, label: 'Error' }
] as const;

/** Figma RadioGroup reference width (15276:38088). */
function RadioGroupDemoFrame({ children }: { children: ReactNode }) {
  return <View style={{ alignSelf: 'stretch', width: 360 }}>{children}</View>;
}

/** Interactive sandbox — controls and Code panel stay in sync via Storybook args. */
export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    const [, updateArgs] = useArgs();

    return (
      <StorybookStoryShell align="center">
        <RadioGroupDemoFrame>
          <RadioGroup
            {...args}
            onValueChange={(next) => {
              updateArgs({ value: next });
              args.onValueChange?.(next);
            }}
          />
        </RadioGroupDemoFrame>
      </StorybookStoryShell>
    );
  }
};

/** Figma RadioGroup `error=true, hideLabel=false`. */
export const Error: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <RadioGroupDemoFrame>
        <RadioGroup
          error
          errorText="Error message"
          label="Label"
          options={defaultOptions}
        />
      </RadioGroupDemoFrame>
    </StorybookStoryShell>
  )
};

/** Figma RadioGroup `error=false, hideLabel=true` (15286:38517). */
export const HideLabel: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <RadioGroupDemoFrame>
        <RadioGroup hideLabel options={defaultOptions} value="option-1" />
      </RadioGroupDemoFrame>
    </StorybookStoryShell>
  )
};

/** Figma RadioGroup `error=true, hideLabel=true` (15286:38525). */
export const ErrorHideLabel: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <RadioGroupDemoFrame>
        <RadioGroup error errorText="Error message" hideLabel options={defaultOptions} />
      </RadioGroupDemoFrame>
    </StorybookStoryShell>
  )
};

function RadioButtonVariantsMatrix({ hideLabel = false }: { hideLabel?: boolean }) {
  const t = useTheme();

  return (
    <StorybookVariantCatalog gap="sm">
      <StorybookVariantRow gap="sm">
        <StorybookVariantCell columnWidth={matrixLabelWidth} />
        {enabledColumns.map(({ label }) => (
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

      {selectedStates.map(({ label, selected }) => (
        <StorybookVariantRow key={label} gap="sm">
          <StorybookVariantCell columnWidth={matrixLabelWidth} align="start">
            <Text style={[t.typography.labelS, { color: t.color.text.neutral.primary }]}>
              {label}
            </Text>
          </StorybookVariantCell>

          {enabledColumns.map(({ disabled, error }) => (
            <StorybookVariantCell
              key={`${label}-${disabled}-${error}`}
              align="center"
              columnWidth={matrixColumnWidth}
            >
              <RadioButton
                disabled={disabled}
                error={error}
                hideLabel={hideLabel}
                selected={selected}
              />
            </StorybookVariantCell>
          ))}
        </StorybookVariantRow>
      ))}
    </StorybookVariantCatalog>
  );
}

/** Figma RadioButton (15274:37789) — all atomic variants. Shown in MDX only. */
export const RadioButtonStory: Story = {
  name: 'RadioButton',
  tags: ['!dev'],
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog gap="lg">
        <RadioButtonVariantsMatrix />
        <RadioButtonVariantsMatrix hideLabel />
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  )
};
