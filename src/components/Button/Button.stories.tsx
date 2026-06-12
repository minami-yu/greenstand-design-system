/**
 * Button stories — CSF catalog for manual QA and visual regression testing.
 *
 * Visual regression workflow:
 * - `States` and `Variants` freeze props (`visualState`, `variant`, `iconPosition`) so each
 *   story renders a deterministic snapshot of the design system surface.
 * - Run `npm run storybook:web:build` to produce a static catalog, then diff captures in CI
 *   (e.g. Chromatic, Percy, or screenshot tests against `storybook-static/`) to catch
 *   unintended token or layout drift when `getButtonStyles` or theme tokens change.
 * - `Playground` stays interactive via args for exploratory testing; it is not ideal for
 *   regression baselines because control values vary.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import type { IconName } from '../Icon/icons';
import { icons } from '../Icon/icons';
import { Button, type ButtonProps } from './Button';
import type {
  ButtonIconPosition,
  ButtonSize,
  ButtonVariant,
  ButtonVisualState
} from './getButtonStyles';

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'error',
  'error-secondary'
];

const iconPositions: ButtonIconPosition[] = ['none', 'leading', 'trailing'];

const visualStates: ButtonVisualState[] = ['default', 'hover', 'pressed', 'disabled'];

const sizes: ButtonSize[] = ['medium', 'small'];

const iconNames = Object.keys(icons).sort() as IconName[];
const demoIcon: IconName = 'heart-outline';

const autoVisualState = 'auto' as const;

type PlaygroundVisualState = typeof autoVisualState | ButtonVisualState;

type ButtonStoryArgs = Omit<ButtonProps, 'visualState'> & {
  visualState: PlaygroundVisualState;
};

const meta = {
  title: 'Components/Button',
  args: {
    label: 'Save',
    variant: 'primary',
    size: 'medium',
    iconPosition: 'none',
    icon: demoIcon,
    disabled: false,
    visualState: autoVisualState
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: variants
    },
    size: {
      control: 'select',
      options: sizes
    },
    iconPosition: {
      control: 'select',
      description: 'Figma `iconPosition` property.',
      options: iconPositions
    },
    icon: {
      control: 'select',
      description: 'Icon asset when iconPosition is leading or trailing.',
      options: iconNames
    },
    disabled: { control: 'boolean' },
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

function toButtonProps(args: ButtonStoryArgs): ButtonProps {
  const { visualState, ...rest } = args;

  return {
    ...rest,
    visualState: visualState === autoVisualState ? undefined : visualState
  };
}

/** Interactive sandbox — toggle every prop from the controls panel. */
export const Playground: Story = {
  render: (args) => <Button {...toButtonProps(args)} />
};

function StatesGallery() {
  const t = useTheme();

  return (
    <View style={{ alignItems: 'flex-start', gap: theme.space['400'] }}>
      <Text style={[t.typography['label-s'], { color: t.color.text.neutral.secondary }]}>
        Primary · medium · forced via <Text style={t.typography['label-s-strong']}>visualState</Text>
      </Text>
      <View style={{ gap: theme.space['300'] }}>
        {visualStates.map((state) => (
          <View
            key={state}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              gap: theme.space['300']
            }}
          >
            <Text
              style={[
                t.typography['label-s-strong'],
                { color: t.color.text.neutral.secondary, width: 72 }
              ]}
            >
              {state}
            </Text>
            <Button label="Save" size="medium" variant="primary" visualState={state} />
          </View>
        ))}
      </View>
    </View>
  );
}

/**
 * Snapshot-friendly: one column per interaction state.
 * Ideal baseline for regression diffs on fill, border, and label color tokens.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => <StatesGallery />
};

const iconPositionLabels: Record<ButtonIconPosition, string> = {
  none: 'Text only',
  leading: 'Leading icon',
  trailing: 'Trailing icon'
};

function VariantsMatrix() {
  const t = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        gap: theme.space['400'],
        padding: theme.space['400']
      }}
    >
      <Text style={[t.typography['label-s'], { color: t.color.text.neutral.secondary }]}>
        All variants × iconPosition · medium · default state
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: theme.space['300'],
          paddingLeft: 120
        }}
      >
        {iconPositions.map((position) => (
          <Text
            key={position}
            style={[
              t.typography['label-s-strong'],
              {
                color: t.color.text.neutral.secondary,
                flex: 1,
                minWidth: 120,
                textAlign: 'center'
              }
            ]}
          >
            {iconPositionLabels[position]}
          </Text>
        ))}
      </View>

      {variants.map((variant) => (
        <View
          key={variant}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: theme.space['300']
          }}
        >
          <Text
            style={[
              t.typography['label-s-strong'],
              { color: t.color.text.neutral.primary, width: 120 }
            ]}
          >
            {variant}
          </Text>

          {iconPositions.map((iconPosition) => (
            <View key={iconPosition} style={{ alignItems: 'center', flex: 1, minWidth: 120 }}>
              <Button
                icon={iconPosition === 'none' ? undefined : demoIcon}
                iconPosition={iconPosition}
                label="Save"
                size="medium"
                variant={variant}
                visualState="default"
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

/**
 * Snapshot-friendly: full variant × iconPosition matrix.
 * Catches regressions in layout (gap, padding) and per-variant token resolution.
 */
export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen'
  },
  render: () => <VariantsMatrix />
};
