/**
 * ProgressBar stories — CSF catalog aligned with Figma ProgressBar (13472:24568).
 */
import type { Meta, StoryObj } from '@storybook/react';
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
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    max: 100,
    value: 65
  },
  argTypes: {
    max: {
      control: { min: 1, step: 1, type: 'number' },
      description: 'Maximum progress value.'
    },
    value: {
      control: { max: 100, min: 0, step: 1, type: 'range' },
      description: 'Current progress — animates when changed.'
    }
  }
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const matrixColumnWidth = 120;
const matrixLabelWidth = 80;

const progressValues = [0, 25, 50, 75, 100] as const;

function ProgressBarDemoFrame({ children }: { children: ReactNode }) {
  return <View style={{ alignSelf: 'stretch', width: 264 }}>{children}</View>;
}

/** Interactive sandbox — scrub `value` to see the fill animate. */
export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground(args) {
    return (
      <StorybookStoryShell align="center">
        <ProgressBarDemoFrame>
          <ProgressBar {...args} />
        </ProgressBarDemoFrame>
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
          {progressValues.map((value) => (
            <StorybookVariantCell key={value} align="center" columnWidth={matrixColumnWidth}>
              <Text
                style={[
                  t.typography.labelS,
                  { color: t.color.text.neutral.secondary, textAlign: 'center' }
                ]}
              >
                {value}%
              </Text>
            </StorybookVariantCell>
          ))}
        </StorybookVariantRow>

        <StorybookVariantRow gap="sm">
          <StorybookVariantCell columnWidth={matrixLabelWidth} align="start">
            <Text style={[t.typography.labelS, { color: t.color.text.neutral.primary }]}>
              progress
            </Text>
          </StorybookVariantCell>

          {progressValues.map((value) => (
            <StorybookVariantCell key={value} align="center" columnWidth={matrixColumnWidth}>
              <View style={{ width: '100%' }}>
                <ProgressBar value={value} />
              </View>
            </StorybookVariantCell>
          ))}
        </StorybookVariantRow>
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  );
}

/** Snapshot-friendly matrix of common progress values. */
export const Variants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => <VariantsMatrix />
};
