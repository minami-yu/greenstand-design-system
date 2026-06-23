/**
 * Button stories — CSF catalog aligned with Figma Button (12618:892).
 */
import type { Meta, StoryObj } from '@storybook/react';
import {
  StorybookStoryShell,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import type { IconName } from '../Icon/icons';
import { icons } from '../Icon/icons';
import { Button, type ButtonProps } from './Button';
import type { ButtonSize, ButtonVariant, ButtonVisualState } from './getButtonStyles';

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'error',
  'error-secondary'
];

const visualStates: ButtonVisualState[] = ['default', 'hover', 'pressed', 'disabled'];

const sizes: ButtonSize[] = ['md', 'sm'];

const iconNames = Object.keys(icons).sort() as IconName[];
const demoIcon: IconName = 'heart-outline';

const autoVisualState = 'auto' as const;

type PlaygroundVisualState = typeof autoVisualState | ButtonVisualState;

type ButtonStoryArgs = Omit<ButtonProps, 'visualState'> & {
  visualState: PlaygroundVisualState;
};

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    label: 'Save',
    variant: 'primary',
    size: 'md',
    leadingIcon: undefined,
    trailingIcon: undefined,
    disabled: false,
    visualState: autoVisualState
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible button label. Required.'
    },
    variant: {
      control: 'select',
      description: 'Figma `variant` property — fill, border, and text tokens from getButtonStyles.',
      options: variants
    },
    size: {
      control: 'select',
      description: 'Figma `size` — `md` or `sm` layout from getButtonLayout.',
      options: sizes
    },
    leadingIcon: {
      control: 'select',
      description: 'Icon before the label. Sets Figma `iconPosition=leading` when defined.',
      options: [undefined, ...iconNames]
    },
    trailingIcon: {
      control: 'select',
      description: 'Icon after the label. Sets Figma `iconPosition=trailing` when defined.',
      options: [undefined, ...iconNames]
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and applies disabled fill/text tokens.'
    },
    visualState: {
      control: 'select',
      description:
        'Use "auto" for live press behavior. Other values force a Figma interaction state.',
      options: [autoVisualState, ...visualStates] satisfies PlaygroundVisualState[]
    }
  }
} satisfies Meta<ButtonStoryArgs>;

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

const docsOnlyParameters = {
  controls: { disable: true }
};

function VariantStatesRow({ variant }: { variant: ButtonVariant }) {
  return (
    <StorybookStoryShell align="center">
      <StorybookVariantRow gap="md">
        {visualStates.map((state) => (
          <StorybookVariantCell key={state} align="center" label={state} labelPosition="below">
            <Button label="Save" size="md" variant={variant} visualState={state} />
          </StorybookVariantCell>
        ))}
      </StorybookVariantRow>
    </StorybookStoryShell>
  );
}

function createVariantStory(variant: ButtonVariant, name: string): Story {
  return {
    name,
    tags: ['!dev'],
    parameters: docsOnlyParameters,
    render: () => <VariantStatesRow variant={variant} />
  };
}

/** Interactive sandbox — toggle every prop from the controls panel. */
export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    const { visualState, ...rest } = args;

    return (
      <StorybookStoryShell align="center">
        <Button
          {...rest}
          visualState={visualState === autoVisualState ? undefined : visualState}
        />
      </StorybookStoryShell>
    );
  }
};

export const Primary = createVariantStory('primary', 'Primary');
export const Secondary = createVariantStory('secondary', 'Secondary');
export const Tertiary = createVariantStory('tertiary', 'Tertiary');
export const Accent = createVariantStory('accent', 'Accent');
export const Error = createVariantStory('error', 'Error');
export const ErrorSecondary = createVariantStory('error-secondary', 'Error secondary');

/** Primary · md · text only, leading icon, trailing icon. */
export const Icons: Story = {
  name: 'Icons',
  parameters: docsOnlyParameters,
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantRow gap="md">
        <StorybookVariantCell align="center" label="Text only" labelPosition="below">
          <Button label="Save" size="md" variant="primary" visualState="default" />
        </StorybookVariantCell>
        <StorybookVariantCell align="center" label="Leading icon" labelPosition="below">
          <Button
            label="Save"
            leadingIcon={demoIcon}
            size="md"
            variant="primary"
            visualState="default"
          />
        </StorybookVariantCell>
        <StorybookVariantCell align="center" label="Trailing icon" labelPosition="below">
          <Button
            label="Save"
            size="md"
            trailingIcon={demoIcon}
            variant="primary"
            visualState="default"
          />
        </StorybookVariantCell>
      </StorybookVariantRow>
    </StorybookStoryShell>
  )
};

/** Primary · default state · md and sm. */
export const Sizes: Story = {
  name: 'Sizes',
  parameters: docsOnlyParameters,
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantRow gap="md">
        {sizes.map((size) => (
          <StorybookVariantCell key={size} align="center" label={size} labelPosition="below">
            <Button label="Save" size={size} variant="primary" visualState="default" />
          </StorybookVariantCell>
        ))}
      </StorybookVariantRow>
    </StorybookStoryShell>
  )
};

/** All variants · md · disabled state. */
export const Disabled: Story = {
  name: 'Disabled',
  tags: ['!dev'],
  parameters: docsOnlyParameters,
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantRow gap="md">
        {variants.map((variant) => (
          <StorybookVariantCell key={variant} align="center" label={variant} labelPosition="below">
            <Button disabled label="Save" size="md" variant={variant} visualState="disabled" />
          </StorybookVariantCell>
        ))}
      </StorybookVariantRow>
    </StorybookStoryShell>
  )
};
