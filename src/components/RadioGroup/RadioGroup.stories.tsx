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
    error: {
      control: 'boolean',
      description: 'Figma `error` — red indicator styling on all options and error message with information icon.'
    },
    errorText: {
      control: 'text',
      description: 'Figma `errorText` — message shown when `error` is true.'
    },
    hint: {
      control: 'boolean',
      description: 'Figma `hint` — show helper text below the options.'
    },
    hintText: {
      control: 'text',
      description: 'Figma `hintText` — helper copy below the options.'
    },
    hideLabel: {
      control: 'boolean',
      description: 'Figma `hideLabel` — omit the group label above the options.'
    },
    label: {
      control: 'text',
      description: 'Group label rendered with label-m-strong typography.'
    },
    onValueChange: {
      action: 'valueChange',
      description: 'Called with the next option value when a radio button is pressed.'
    },
    value: {
      control: 'text',
      description: 'Currently selected option value.'
    }
  }
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const matrixColumnWidth = 120;
const matrixLabelWidth = 100;

const selectedStates = [
  { label: 'selected', selected: true },
  { label: 'unselected', selected: false }
] as const;

const enabledColumns = [
  { disabled: false, error: false, label: 'enabled' },
  { disabled: true, error: false, label: 'disabled' },
  { disabled: false, error: true, label: 'error' }
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
