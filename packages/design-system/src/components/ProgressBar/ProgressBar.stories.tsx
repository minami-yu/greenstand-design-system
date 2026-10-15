/**
 * ProgressBar stories — CSF catalog aligned with Figma ProgressBar (13472:24568).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState, type ReactNode } from 'react';
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
      description: 'Maximum progress value.',
      table: { type: { summary: 'number' } }
    },
    value: {
      control: { max: 100, min: 0, step: 1, type: 'range' },
      description: 'Current progress — animates when changed.',
      table: { type: { summary: 'number' } }
    }
  },
  parameters: storybookDocsArgTypesInclude(['max', 'value'])
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

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

const valueMaxComparisons = [
  { label: 'value={25} max={100}', max: 100, value: 25 },
  { label: 'value={1} max={4}', max: 4, value: 1 }
] as const;

function ValueAndMaxComparison() {
  const t = useTheme();

  return (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog align="center" gap="md">

        <StorybookVariantRow gap="lg">
          {valueMaxComparisons.map((example) => (
            <StorybookVariantCell
              key={example.label}
              align="center"
              columnWidth={280}
              label={example.label}
              labelPosition="below"
            >
              <ProgressBarDemoFrame>
                <ProgressBar max={example.max} value={example.value} />
              </ProgressBarDemoFrame>
            </StorybookVariantCell>
          ))}
        </StorybookVariantRow>
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  );
}

/** Side-by-side examples with the same fill ratio but different value/max scales. */
export const ValueAndMax: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => <ValueAndMaxComparison />
};

const animationPreviewValues = [0, 35, 70, 100, 45, 15] as const;
const animationPreviewIntervalMs = 1200;

function AnimationPreview() {
  const t = useTheme();
  const [value, setValue] = useState(animationPreviewValues[0]);

  useEffect(() => {
    let stepIndex = 0;

    const id = setInterval(() => {
      stepIndex = (stepIndex + 1) % animationPreviewValues.length;
      setValue(animationPreviewValues[stepIndex]);
    }, animationPreviewIntervalMs);

    return () => clearInterval(id);
  }, []);

  return (
    <StorybookStoryShell align="center">
      <ProgressBarDemoFrame>
        <ProgressBar value={value} />
        <Text
          style={[
            t.typography.labelS,
            {
              color: t.color.text.neutral.secondary,
              marginTop: t.space['200'],
              textAlign: 'center'
            }
          ]}
        >
          {value}%
        </Text>
      </ProgressBarDemoFrame>
    </StorybookStoryShell>
  );
}

/** Auto-cycling value changes — docs animation preview. */
export const Animation: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => <AnimationPreview />
};
