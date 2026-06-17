/**
 * Toggle stories — CSF catalog aligned with Figma Toggle (13571:25414).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    toggled: true,
    disabled: false
  },
  argTypes: {
    toggled: {
      control: 'boolean',
      description: 'Figma `toggled` property — on (thumb right) or off (thumb left).'
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and applies disabled track/thumb tokens.'
    },
    onToggledChange: {
      action: 'toggled',
      description: 'Called with the next toggled value when the control is pressed.'
    }
  }
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

function PlaygroundToggle(args: ComponentProps<typeof Toggle>) {
  const [toggled, setToggled] = useState(args.toggled ?? false);

  return (
    <Toggle
      {...args}
      toggled={toggled}
      onToggledChange={(next) => {
        setToggled(next);
        args.onToggledChange?.(next);
      }}
    />
  );
}

/** Interactive sandbox — flip toggled and disabled from the controls panel. */
export const Playground: Story = {
  render: (args) => <PlaygroundToggle {...args} />
};

const stateMatrix = [
  { label: 'On', toggled: true, disabled: false },
  { label: 'Off', toggled: false, disabled: false },
  { label: 'On · disabled', toggled: true, disabled: true },
  { label: 'Off · disabled', toggled: false, disabled: true }
] as const;

function StatesGallery() {
  const t = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        gap: theme.space['400'],
        padding: theme.space['400']
      }}
    >
      <Text style={[t.typography.labelS, { color: t.color.text.neutral.secondary }]}>
        toggled × disabled · Figma component (13571:25414)
      </Text>

      <View style={{ gap: theme.space['300'] }}>
        {stateMatrix.map((state) => (
          <View
            key={state.label}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              gap: theme.space['400']
            }}
          >
            <Text
              style={[
                t.typography.labelSStrong,
                { color: t.color.text.neutral.secondary, width: 120 }
              ]}
            >
              {state.label}
            </Text>
            <Toggle disabled={state.disabled} toggled={state.toggled} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

/** Snapshot-friendly: all four Figma variant states. */
export const States: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => <StatesGallery />
};
