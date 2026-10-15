import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useArgs } from 'storybook/preview-api';
import {
  StorybookNavigationCanvas,
  StorybookNavigationPreviewFrame,
  StorybookStoryShell,
  StorybookVariantCell,
  StorybookVariantRow,
  storybookNavigationPreviewWidths,
  type StorybookNavigationPreviewWidth
} from '../../storybook/ui';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
import { BottomNavigation, type BottomNavigationItem } from './BottomNavigation';

const items: BottomNavigationItem[] = [
  { id: 'home', icon: 'home-outline', selectedIcon: 'home', label: 'Home' },
  { id: 'people', icon: 'people-outline', selectedIcon: 'people', label: 'Community' },
  { id: 'camera', icon: 'camera-outline', selectedIcon: 'camera', label: 'Camera', variant: 'primary' },
  {
    id: 'trees',
    icon: 'pine-tree-variant-outline',
    selectedIcon: 'pine-tree-variant',
    label: 'Trees'
  },
  { id: 'settings', icon: 'cog-outline', selectedIcon: 'cog', label: 'Settings' }
];

type BottomNavigationStoryArgs = ComponentProps<typeof BottomNavigation> & {
  previewWidth: StorybookNavigationPreviewWidth;
};

const meta = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  args: {
    activeItem: 'home',
    bottomPadding: undefined,
    items,
    previewWidth: 360,
    showLabels: false
  },
  argTypes: {
    previewWidth: {
      control: 'select',
      description: 'Storybook-only preview frame width.',
      options: storybookNavigationPreviewWidths,
      table: { disable: true }
    },
    activeItem: {
      control: 'select',
      description: 'The id of the currently selected navigation item.',
      options: items.map((item) => item.id),
      table: { type: { summary: 'string' } }
    },
    items: {
      control: 'object',
      description: 'Navigation actions rendered from left to right.',
      table: { type: { summary: 'BottomNavigationItem[]' } }
    },
    bottomPadding: {
      control: 'number',
      description: 'Overrides the internal bottom padding. Apps can pass the OS bottom safe-area inset.',
      table: { type: { summary: 'number' } }
    },
    onItemPress: {
      action: 'item pressed',
      description: 'Called with the pressed navigation item.',
      table: { type: { summary: '(item: BottomNavigationItem) => void' } }
    },
    showLabels: {
      control: 'boolean',
      description: 'Shows visible labels under icons when true.',
      table: { type: { summary: 'boolean' } }
    }
  },
  parameters: storybookDocsArgTypesInclude([
    'activeItem',
    'bottomPadding',
    'items',
    'onItemPress',
    'showLabels'
  ])
} satisfies Meta<BottomNavigationStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: function Playground({ previewWidth, ...args }) {
    const [, updateArgs] = useArgs();

    return (
      <StorybookStoryShell align="stretch">
        <StorybookNavigationCanvas>
          <StorybookNavigationPreviewFrame width={previewWidth}>
            <BottomNavigation
              {...args}
              onItemPress={(item) => {
                updateArgs({ activeItem: item.id });
                args.onItemPress?.(item);
              }}
            />
          </StorybookNavigationPreviewFrame>
        </StorybookNavigationCanvas>
      </StorybookStoryShell>
    );
  }
};

export const Labels: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="stretch">
      <StorybookNavigationCanvas>
        <StorybookNavigationPreviewFrame>
          <BottomNavigation activeItem="home" items={items} showLabels />
        </StorybookNavigationPreviewFrame>
      </StorybookNavigationCanvas>
    </StorybookStoryShell>
  )
};

export const SelectedStates: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="stretch">
      <StorybookNavigationCanvas>
        <StorybookVariantRow gap="md">
          <StorybookVariantCell label="Home" labelPosition="below">
            <StorybookNavigationPreviewFrame>
              <BottomNavigation activeItem="home" items={items} />
            </StorybookNavigationPreviewFrame>
          </StorybookVariantCell>
          <StorybookVariantCell label="Trees" labelPosition="below">
            <StorybookNavigationPreviewFrame>
              <BottomNavigation activeItem="trees" items={items} />
            </StorybookNavigationPreviewFrame>
          </StorybookVariantCell>
        </StorybookVariantRow>
      </StorybookNavigationCanvas>
    </StorybookStoryShell>
  )
};
