import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { icons } from '../Icon/icons';
import { StorybookStoryShell, StorybookVariantCatalog, StorybookVariantRow, StorybookVariantCell } from '../../storybook/ui';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { Chip, type ChipProps, type ChipLeadingElements, type ChipTrailingElements } from './Chip';

const sizes = ['md', 'lg'] as const;
const leading: ChipLeadingElements[] = ['icon', 'avatar', 'none'];
const trailing: ChipTrailingElements[] = ['arrow', 'close', 'none'];
const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: { label: 'Label', size: 'md', selected: false, leadingElements: 'icon', trailingElements: 'arrow', icon: 'heart-outline', initial: 'A' },
  argTypes: {
    size: { control: 'select', options: sizes, description: 'Medium (32 px) or large (40 px) pill with size-specific padding. Large icon and text-only chips use a 6 px gap and 18 px leading/arrow icons. Avatar slots use xs for md chips and sm for lg chips.', table: { type: { summary: storybookQuotedUnion(sizes) } } },
    label: { control: 'text', description: 'Visible chip label.', table: { type: { summary: 'string' } } },
    selected: { control: 'boolean', description: 'Controlled selection state; applies the brand fill and border.', table: { type: { summary: 'boolean' } } },
    leadingElements: { control: 'select', options: leading, description: 'Leading icon, avatar, or no artwork.', table: { type: { summary: storybookQuotedUnion(leading) } } },
    trailingElements: { control: 'select', options: trailing, description: 'Arrow, remove indicator, or no indicator. The whole chip activates onPress.', table: { type: { summary: storybookQuotedUnion(trailing) } } },
    icon: { control: 'select', options: Object.keys(icons), description: 'Icon used in the leading icon slot.', table: { type: { summary: 'IconName' } } },
    source: { control: false, description: 'Dynamic React Native image source for the avatar.', table: { type: { summary: 'ImageSourcePropType' } } },
    initial: { control: 'text', description: 'Avatar fallback initial; defaults to the first character of label.', table: { type: { summary: 'string' } } },
    disabled: { control: 'boolean', description: 'Disables interaction; Figma does not specify a separate disabled appearance.', table: { type: { summary: 'boolean' } } },
    onPress: { action: 'press', control: false, description: 'Caller handles selection, picker opening, or removal.', table: { type: { summary: 'PressableProps["onPress"]' } } }
  },
  parameters: storybookDocsArgTypesInclude(['label', 'size', 'selected', 'leadingElements', 'trailingElements', 'icon', 'source', 'initial', 'disabled', 'onPress'])
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: (args) => <StorybookStoryShell align="center"><Chip {...args} /></StorybookStoryShell>
};

export const Variants: Story = {
  render: (args) => (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog>
        {(['arrow', 'none'] as const).flatMap((trailingElements) => [false, true].map((selected) => (
          <StorybookVariantRow key={`${trailingElements}-${selected}`}>
            {leading.map((leadingElements) => (
              <StorybookVariantCell key={leadingElements} label={`${leadingElements} / ${trailingElements} / ${selected ? 'selected' : 'default'}`}>
                <Chip {...args} leadingElements={leadingElements} trailingElements={trailingElements} selected={selected} />
              </StorybookVariantCell>
            ))}
          </StorybookVariantRow>
        )))}
        <StorybookVariantCell label="avatar / close / default">
          <Chip {...args} leadingElements="avatar" trailingElements="close" selected={false} />
        </StorybookVariantCell>
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  )
};

function SelectionExample(args: ChipProps) {
  const [selected, setSelected] = useState(false);
  return <Chip {...args} selected={selected} trailingElements="none" onPress={() => setSelected((value) => !value)} />;
}
export const Selection: Story = {
  args: { label: 'Favorites' },
  render: (args) => <StorybookStoryShell align="center"><SelectionExample {...args} /></StorybookStoryShell>
};

function RemovalExample(args: ChipProps) {
  const [visible, setVisible] = useState(true);
  return visible ? <Chip {...args} leadingElements="avatar" trailingElements="close" onPress={() => setVisible(false)} />
    : <Button label="Restore chip" onPress={() => setVisible(true)} />;
}
export const Removal: Story = {
  args: { label: 'Alex' },
  render: (args) => <StorybookStoryShell align="center"><RemovalExample {...args} /></StorybookStoryShell>
};

export const Sizes: Story = {
  render: (args) => (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog>
        {sizes.map(size => (
          <StorybookVariantRow key={size}>
            {leading.map(leadingElements => (
              <StorybookVariantCell key={leadingElements} label={`${size} / ${leadingElements}`}>
                <Chip {...args} size={size} leadingElements={leadingElements} />
                <Chip {...args} size={size} leadingElements={leadingElements} selected trailingElements="none" />
                {leadingElements === 'avatar' ? <Chip {...args} size={size} leadingElements="avatar" selected={false} trailingElements="close" /> : null}
              </StorybookVariantCell>
            ))}
          </StorybookVariantRow>
        ))}
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  )
};
