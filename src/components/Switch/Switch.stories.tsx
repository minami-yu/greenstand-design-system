/**
 * Switch stories — CSF catalog aligned with Figma Switch (13571:25414).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
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
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    toggled: true,
    disabled: false,
    accessibilityLabel: 'Notifications'
  },
  argTypes: {
    toggled: {
      control: 'boolean',
      description: 'True when the switch is on, false when it is off.',
      table: { type: { summary: 'boolean' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and applies disabled track/thumb tokens.',
      table: { type: { summary: 'boolean' } }
    },
    onToggledChange: {
      action: 'toggled',
      description: 'Called with the next toggled value when the control is pressed.',
      table: { type: { summary: '(toggled: boolean) => void' } }
    },
    accessibilityLabel: {
      ...storybookArgTypeAccessibilityLabel,
      description:
        'Screen reader name when the switch has no adjacent visible label (e.g. "Wi-Fi"). See Accessibility/Overview.'
    }
  },
  parameters: storybookDocsArgTypesInclude([
    'toggled',
    'disabled',
    'onToggledChange',
    'accessibilityLabel'
  ])
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive sandbox — controls and Code panel stay in sync via Storybook args. */
export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    const [, updateArgs] = useArgs();

    return (
      <StorybookStoryShell align="center">
        <Switch
          {...args}
          onToggledChange={(next) => {
            updateArgs({ toggled: next });
            args.onToggledChange?.(next);
          }}
        />
      </StorybookStoryShell>
    );
  }
};

/** Off and on — Figma `toggled=false` vs `toggled=true`. */
export const Toggled: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookVariantCatalog align="center">
      <StorybookVariantRow gap="lg">
        <StorybookVariantCell label="true" labelPosition="below">
          <Switch toggled />
        </StorybookVariantCell>
        <StorybookVariantCell label="false" labelPosition="below">
          <Switch toggled={false} />
        </StorybookVariantCell>
      </StorybookVariantRow>
    </StorybookVariantCatalog>
  )
};

/** Enabled and disabled — Figma `disabled=false` vs `disabled=true`. */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookVariantCatalog align="center">
      <StorybookVariantRow gap="lg">
        <StorybookVariantCell label="false" labelPosition="below">
          <Switch disabled={false} toggled />
        </StorybookVariantCell>
        <StorybookVariantCell label="true" labelPosition="below">
          <Switch disabled toggled />
        </StorybookVariantCell>
      </StorybookVariantRow>
    </StorybookVariantCatalog>
  )
};
