/**
 * RadioGroup stories — CSF catalog aligned with Figma RadioButton (15274:37789)
 * and RadioGroup (15276:38088).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps, type ReactNode } from 'react';
import { Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
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
  parameters: {
    layout: 'centered'
  },
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
      description: 'Figma `error` — red outlines on unselected options and error message with information icon.'
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

function PlaygroundRadioGroup(args: ComponentProps<typeof RadioGroup>) {
  const [value, setValue] = useState(args.value ?? defaultOptions[0].value);

  return (
    <RadioGroup
      {...args}
      onValueChange={(next) => {
        setValue(next);
        args.onValueChange?.(next);
      }}
      style={{ width: 360 }}
      value={value}
    />
  );
}

/** Interactive sandbox — flip error, labels, and selection from the controls panel. */
export const Playground: Story = {
  render: (args) => <PlaygroundRadioGroup {...args} />
};

type VariantWrapperProps = {
  children: ReactNode;
  /** Optional caption below the variant. Omit for an unlabeled cell. */
  label?: string;
};

function VariantWrapper({ children, label }: VariantWrapperProps) {
  const t = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        gap: label ? theme.space['200'] : theme.space['0']
      }}
    >
      {children}
      {label ? (
        <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>{label}</Text>
      ) : null}
    </View>
  );
}

function VariantRow({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.space['1600']
      }}
    >
      {children}
    </View>
  );
}

function VariantCatalog({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        gap: theme.space['1600'],
        padding: theme.space['1600']
      }}
    >
      {children}
    </View>
  );
}

/** Figma RadioGroup `error=false, hideLabel=false`. */
export const Default: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <RadioGroup
      hintText="Hint message"
      label="Label"
      options={defaultOptions}
      style={{ width: 360 }}
      value="option-1"
    />
  )
};

/** Figma RadioGroup `error=true, hideLabel=false`. */
export const Error: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <RadioGroup
      error
      errorText="Error message"
      label="Label"
      options={defaultOptions}
      style={{ width: 360 }}
    />
  )
};

/** Figma RadioButton (15274:37789) — all atomic variants. */
export const RadioButtonStory: Story = {
  name: 'RadioButton',
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <VariantCatalog>
      <VariantRow>
        <VariantWrapper label="Selected">
          <RadioButton selected />
        </VariantWrapper>
        <VariantWrapper label="Unselected">
          <RadioButton selected={false} />
        </VariantWrapper>
      </VariantRow>
      <VariantRow>
        <VariantWrapper label="Disabled selected">
          <RadioButton disabled selected />
        </VariantWrapper>
        <VariantWrapper label="Disabled unselected">
          <RadioButton disabled selected={false} />
        </VariantWrapper>
        <VariantWrapper label="Error unselected">
          <RadioButton error selected={false} />
        </VariantWrapper>
        <VariantWrapper label="Error selected">
          <RadioButton error selected />
        </VariantWrapper>
      </VariantRow>
      <VariantRow>
        <VariantWrapper label="Hide label selected">
          <RadioButton hideLabel selected />
        </VariantWrapper>
        <VariantWrapper label="Hide label unselected">
          <RadioButton hideLabel selected={false} />
        </VariantWrapper>
        <VariantWrapper label="Hide label error">
          <RadioButton error hideLabel selected={false} />
        </VariantWrapper>
      </VariantRow>
    </VariantCatalog>
  )
};
