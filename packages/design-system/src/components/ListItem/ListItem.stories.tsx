import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon/Icon';
import { Text, View } from 'react-native';
import { storybookDocsArgTypesInclude, storybookQuotedUnion } from '../../storybook/storybookArgTypes';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { ListItem, type ListItemProps, type ListItemLeadingElement, type ListItemTrailingElement } from './ListItem';

const tones = ['default', 'destructive'] as const;
const sizes = ['md', 'lg'] as const;
const leadingElements: ListItemLeadingElement[] = ['none', 'icon', 'avatar', 'thumbnail'];
const trailingElements: ListItemTrailingElement[] = ['none', 'icon', 'checkInput', 'radioButton', 'switch', 'text', 'badge', 'badgeAndText'];
const thumbnailSource = require('./assets/tree-example.png');
const textProp = (description: string) => ({ control: 'text' as const, description, table: { type: { summary: 'string' } } });
const booleanProp = (description: string) => ({ control: 'boolean' as const, description, table: { type: { summary: 'boolean' } } });

function StatefulRow(props: ListItemProps) {
  const [selected, setSelected] = useState(props.selected ?? false);
  useEffect(() => setSelected(props.selected ?? false), [props.selected]);
  return <ListItem {...props} selected={selected} onSelectedChange={value => {
    setSelected(value);
    props.onSelectedChange?.(value);
  }} />;
}

function Surface({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return <View style={{ width: '100%', maxWidth: theme.size['2400'] * 4, padding: theme.space['300'], backgroundColor: t.color.background.neutral.default }}>{children}</View>;
}

function SectionLabel({ children }: { children: string }) {
  const t = useTheme();
  return <Text style={[t.typography.labelMStrong, { color: t.color.text.neutral.primary, paddingVertical: theme.space['200'] }]}>{children}</Text>;
}

const meta = {
  title: 'Components/ListItem', component: ListItem,
  args: { label: 'Label', paragraph: 'Text', size: 'lg', leadingElement: 'icon', trailingElement: 'icon', showDivider: true, showParagraph: true, caption: 'Caption', badgeValue: '1', selected: false, disabled: false, thumbnailSource },
  argTypes: {
    labelAccessory: { control: false, description: 'Optional inline status indicator after the label.', table: { type: { summary: 'ReactNode' } } },
    label: textProp('Primary row label.'),
    labelNumberOfLines: { control: 'number', description: 'Optional maximum label lines; overflowing text is ellipsized.', table: { type: { summary: 'number' } } },
    badgeType: { control: 'select', options: ['label', 'dot'], description: 'Trailing badge presentation. Dot uses the compact notification indicator.', table: { type: { summary: storybookQuotedUnion(['label', 'dot']) } } },
    tone: { control: 'select', options: tones, description: 'Semantic tone for the label and leading icon.', table: { type: { summary: storybookQuotedUnion(tones) } } },
    size: { control: 'select', options: sizes, description: 'md: compact 56 px minimum row with a 28 px leading icon; lg: 64 px minimum row with a 20 px leading icon. Both use 12 px after leading artwork. Thumbnail artwork always uses lg.', table: { type: { summary: storybookQuotedUnion(sizes) } } },
    paragraph: textProp('Supporting text on large rows only.'),
    showParagraph: booleanProp('Show supporting text on lg and the caption in badgeAndText, matching Figma.'),
    showDivider: booleanProp('Show the inset divider beneath the content, excluding leading artwork.'),
    leadingElement: { control: 'select', options: leadingElements, description: 'Left: none, icon, avatar, or thumbnail (lg only).', table: { type: { summary: storybookQuotedUnion(leadingElements) } } },
    leadingIcon: { ...textProp('Icon registry name for the left icon; icon.md (20 px) in both row sizes.'), table: { type: { summary: 'IconName' } } },
    avatarSource: { control: false, description: 'Optional avatar image; falls back to an initial.', table: { type: { summary: 'ImageSourcePropType' } } },
    avatarSize: { control: 'select', options: ['sm', 'md'], description: 'Override the avatar size for compact initial artwork.', table: { type: { summary: storybookQuotedUnion(['sm', 'md']) } } },
    avatarInitial: textProp('Avatar initial; defaults to the row label.'),
    thumbnailImageStyle: { control: false, description: 'Optional image crop inside the fixed thumbnail slot.', table: { type: { summary: 'StyleProp<ImageStyle>' } } },
    thumbnailSource: { control: false, description: 'Image source required when leadingElement is thumbnail.', table: { type: { summary: 'ImageSourcePropType' } } },
    trailingElement: { control: 'select', options: trailingElements, description: 'Right: none, icon, checkbox, radio, switch, caption, badge, or badge with caption.', table: { type: { summary: storybookQuotedUnion(trailingElements) } } },
    trailingIcon: { ...textProp('Right icon; defaults to chevron-right.'), table: { type: { summary: 'IconName' } } },
    caption: textProp('Right-side text for text and badgeAndText.'),
    badgeValue: textProp('Badge count.'),
    selected: booleanProp('Controlled checked state for checkbox, radio, or switch rows. Only the control changes appearance; the row background stays unchanged, including while pressed.'),
    disabled: booleanProp('Disable row activation and selection.'),
    onSelectedChange: { control: false, description: 'Called with the next checked state. Radio activation always requests true.', table: { type: { summary: '(selected: boolean) => void' } } },
    onPress: { control: false, description: 'Row action for non-selection variants. Pressing keeps the row background unchanged. Selection rows use onSelectedChange instead.', table: { type: { summary: '(event: GestureResponderEvent) => void' } } }
  },
  parameters: storybookDocsArgTypesInclude(['label', 'labelNumberOfLines', 'badgeType', 'labelAccessory', 'size', 'tone', 'paragraph', 'showParagraph', 'showDivider', 'leadingElement', 'leadingIcon', 'avatarSource', 'avatarSize', 'avatarInitial', 'thumbnailSource', 'thumbnailImageStyle', 'trailingElement', 'trailingIcon', 'caption', 'badgeValue', 'selected', 'disabled', 'onSelectedChange', 'onPress']),
  render: args => <Surface><StatefulRow {...args} /></Surface>
} satisfies Meta<typeof ListItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

export const LeftContent: Story = {
  render: () => <Surface>{leadingElements.map(leadingElement => <View key={leadingElement}>
    <SectionLabel>{leadingElement}</SectionLabel>
    <ListItem label="Label" paragraph="Text" leadingElement={leadingElement} avatarInitial="A" thumbnailSource={thumbnailSource} trailingElement="icon" />
  </View>)}</Surface>
};

export const RightContent: Story = {
  render: () => <Surface>{trailingElements.map(trailingElement => <View key={trailingElement}>
    <SectionLabel>{trailingElement}</SectionLabel>
    <StatefulRow label="Label" paragraph="Text" leadingElement="icon" trailingElement={trailingElement} selected={trailingElement === 'radioButton' || trailingElement === 'switch'} />
  </View>)}</Surface>
};

export const Sizes: Story = {
  render: () => <Surface>{sizes.map(size => <View key={size}>
    <SectionLabel>{size === 'md' ? 'Compact (md) · 56 px' : 'Large · 64 px'}</SectionLabel>
    <ListItem label="Label" paragraph="Text" size={size} leadingElement="icon" trailingElement="icon" />
    <ListItem label="Label" paragraph="Text" size={size} leadingElement="avatar" avatarInitial="A" trailingElement="badgeAndText" />
  </View>)}</Surface>
};

function SelectionExamples() {
  const [choice, setChoice] = useState('nearby');
  return <Surface>
    <StatefulRow label="Save offline" paragraph="Keep tree data on this device" trailingElement="checkInput" />
    <StatefulRow label="Notifications" paragraph="Receive capture updates" trailingElement="switch" selected />
    <View accessibilityRole="radiogroup" accessibilityLabel="Tree order">
      <ListItem label="Nearby trees" trailingElement="radioButton" selected={choice === 'nearby'} onSelectedChange={() => setChoice('nearby')} />
      <ListItem label="Recent trees" trailingElement="radioButton" selected={choice === 'recent'} onSelectedChange={() => setChoice('recent')} />
    </View>
    <StatefulRow label="Unavailable setting" trailingElement="switch" disabled />
  </Surface>;
}
export const Selection: Story = { render: () => <SelectionExamples /> };
export const LongContent: Story = {
  args: { label: 'A long tree name that wraps without colliding with the trailing control', paragraph: 'Supporting text can grow the row beyond its minimum height to remain readable at larger text sizes.', leadingElement: 'avatar', trailingElement: 'switch' }
};
export const NoDivider: Story = { args: { showDivider: false } };
export const Dark: Story = { render: () => <ThemeProvider mode="dark"><SelectionExamples /></ThemeProvider> };
export const Action: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    return <Surface><ListItem label="Tree details" paragraph={opened ? 'Details opened' : 'Open this tree'} leadingElement="thumbnail" thumbnailSource={thumbnailSource} trailingElement="icon" onPress={() => setOpened(true)} /></Surface>;
  }
};

export const Destructive: Story = { args: { label: "Log out", size: "md", tone: "destructive", leadingIcon: "logout", trailingElement: "none", showDivider: false } };

export const VerifiedTree: Story = { args: { label: 'Tree #51', paragraph: 'January 18, 2026', leadingElement: 'thumbnail', trailingElement: 'icon', showDivider: false, labelAccessory: <Icon name="check-circle-outline" size="sm" />, accessibilityLabel: 'Tree 51, verified, January 18, 2026' } };

export const CompactInitial: Story = { args: { label: 'Aether Green', leadingElement: 'avatar', avatarSize: 'sm', paragraph: undefined, trailingElement: 'checkInput' } };

export const Notification: Story = { args: { label: '150 trees reviewed by Greenstand', labelNumberOfLines: 1, paragraph: '10:10 AM, Yesterday', leadingElement: 'icon', leadingIcon: 'check-circle-outline', trailingElement: 'badge', badgeType: 'dot', showDivider: false } };
