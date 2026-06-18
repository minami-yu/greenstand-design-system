/**
 * RadioGroup stories — CSF catalog aligned with Figma RadioButton (15274:37789)
 * and RadioGroup (15276:38088).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import {
  StorybookStoryShell,
  StorybookVariantGrid,
  StorybookVariantGridItem
} from '../../storybook/ui';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
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

/** Interactive sandbox — controls and Code panel stay in sync via Storybook args. */
export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    const [, updateArgs] = useArgs();

    return (
      <StorybookStoryShell align="center">
        <RadioGroup
          {...args}
          onValueChange={(next) => {
            updateArgs({ value: next });
            args.onValueChange?.(next);
          }}
        />
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
      <RadioGroup
        error
        errorText="Error message"
        label="Label"
        options={defaultOptions}
      />
    </StorybookStoryShell>
  )
};

/** Figma RadioButton (15274:37789) — all atomic variants. Shown in MDX only. */
export const RadioButtonStory: Story = {
  name: 'RadioButton',
  tags: ['!dev'],
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantGrid align="center" columnWidth={180} columns={2} gap="lg">
        <StorybookVariantGridItem align="left" label="Selected">
          <RadioButton selected />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Unselected">
          <RadioButton selected={false} />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Disabled selected">
          <RadioButton disabled selected />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Disabled unselected">
          <RadioButton disabled selected={false} />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Error unselected">
          <RadioButton error selected={false} />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Error selected">
          <RadioButton error selected />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Hide label selected">
          <RadioButton hideLabel selected />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Hide label unselected">
          <RadioButton hideLabel selected={false} />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Hide label error unselected">
          <RadioButton error hideLabel selected={false} />
        </StorybookVariantGridItem>
        <StorybookVariantGridItem align="left" label="Hide label error selected">
          <RadioButton error hideLabel selected />
        </StorybookVariantGridItem>
      </StorybookVariantGrid>
    </StorybookStoryShell>
  )
};
