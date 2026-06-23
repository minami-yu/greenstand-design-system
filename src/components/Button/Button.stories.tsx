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
import {
  storybookDocsArgTypesInclude,
  storybookQuotedUnion
} from '../../storybook/storybookArgTypes';
import type { IconName } from '../Icon/icons';
import { icons } from '../Icon/icons';
import { Button } from './Button';
import type { ButtonSize, ButtonVariant } from './getButtonStyles';

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'error',
  'error-secondary'
];

const variantStateExamples = [
  { label: 'default', props: { state: 'default' as const } },
  { label: 'active', props: { state: 'active' as const } },
  { label: 'disabled', props: { disabled: true } }
] as const;

const sizes: ButtonSize[] = ['md', 'sm'];

const iconNames = Object.keys(icons).sort() as IconName[];
const demoIcon: IconName = 'heart-outline';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    label: 'Save',
    variant: 'primary',
    size: 'md',
    leadingIcon: undefined,
    trailingIcon: undefined,
    disabled: false
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible button label. Required.',
      table: { type: { summary: 'string' } }
    },
    variant: {
      control: 'select',
      description: 'hierarchy of the button',
      options: variants,
      table: { type: { summary: storybookQuotedUnion(variants) } }
    },
    size: {
      control: 'select',
      description: 'size of the buttons.',
      options: sizes,
      table: { type: { summary: storybookQuotedUnion(sizes) } }
    },
    leadingIcon: {
      control: 'select',
      description: 'Icon before the label. Used to o reinforce the button action.',
      options: [undefined, ...iconNames],
      table: { type: { summary: 'IconName' } }
    },
    trailingIcon: {
      control: 'select',
      description: 'Icon after the label. Used to indicate progression or navigation.',
      options: [undefined, ...iconNames],
      table: { type: { summary: 'IconName' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and applies disabled fill/text tokens.',
      table: { type: { summary: 'boolean' } }
    }
  },
  parameters: storybookDocsArgTypesInclude([
    'label',
    'variant',
    'size',
    'leadingIcon',
    'trailingIcon',
    'disabled'
  ])
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const docsOnlyParameters = {
  controls: { disable: true }
};

function VariantStatesRow({ variant }: { variant: ButtonVariant }) {
  return (
    <StorybookStoryShell align="center">
      <StorybookVariantRow gap="md">
        {variantStateExamples.map(({ label, props }) => (
          <StorybookVariantCell key={label} align="center" label={label} labelPosition="below">
            <Button label="Save" size="md" variant={variant} {...props} />
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
  parameters: {
    ...storybookPlaygroundParameters,
    controls: { exclude: ['state'] }
  },
  render: function Playground(args) {
    return (
      <StorybookStoryShell align="center">
        <Button {...args} />
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
          <Button label="Save" size="md" state="default" variant="primary" />
        </StorybookVariantCell>
        <StorybookVariantCell align="center" label="Leading icon" labelPosition="below">
          <Button
            label="Save"
            leadingIcon={demoIcon}
            size="md"
            state="default"
            variant="primary"
          />
        </StorybookVariantCell>
        <StorybookVariantCell align="center" label="Trailing icon" labelPosition="below">
          <Button
            label="Save"
            size="md"
            state="default"
            trailingIcon={demoIcon}
            variant="primary"
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
            <Button label="Save" size={size} state="default" variant="primary" />
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
            <Button disabled label="Save" size="md" variant={variant} />
          </StorybookVariantCell>
        ))}
      </StorybookVariantRow>
    </StorybookStoryShell>
  )
};
