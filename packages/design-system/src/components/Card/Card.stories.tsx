import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';
import { useTheme } from '../../theme/useTheme';
import { theme } from '../../theme/tokens';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';

function Content({ expanded = false }: { expanded?: boolean }) {
  const t = useTheme();
  return <>
    <Text accessibilityRole="header" style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>Your Impact</Text>
    <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>
      {expanded ? 'Cards grow with their content. Use them to group related information and actions, and allow text to wrap at larger font sizes.' : 'A flexible surface for related content.'}
    </Text>
  </>;
}

const meta = {
  title: 'Components/Card', component: Card,
  args: { children: <Content /> },
  argTypes: {
    children: { description: 'Content placed in the Figma slot. Height follows the content.', control: false, table: { type: { summary: 'ReactNode' } } },
    style: { description: 'React Native style override for composition and placement.', control: false, table: { type: { summary: 'StyleProp<ViewStyle>' } } }
  },
  parameters: storybookDocsArgTypesInclude(['children', 'style']),
  render: function CardExample(args) {
    const t = useTheme();
    return <View style={{ padding: theme.space['400'], backgroundColor: t.color.background.neutral.base }}><Card {...args} /></View>;
  }
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const ContentAndAction: Story = {
  render: function ContentAndActionExample(args) {
    const t = useTheme();
    const [expanded, setExpanded] = useState(false);
    return <View style={{ padding: theme.space['400'], backgroundColor: t.color.background.neutral.base }}>
      <Card {...args}>
        <Content expanded={expanded} />
        <Button label={expanded ? 'Show less' : 'Show more'} variant="accent" onPress={() => setExpanded(value => !value)} />
      </Card>
    </View>;
  }
};
