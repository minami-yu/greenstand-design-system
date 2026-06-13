import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Box } from '../../components/Box/Box';
import { useTheme } from '../../theme/useTheme';
import { DocBulletList, DocCallout, DocCode, DocPage, DocSection } from '../components/DocPage';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

function LayoutExample() {
  const t = useTheme();

  return (
    <Box
      gap="200"
      p="400"
      radius="md"
      style={{ alignSelf: 'stretch', backgroundColor: t.color.background.neutral.subtle }}
    >
      <Text style={[t.typography['paragraph-m'], { color: t.color.text.neutral.primary }]}>
        Box handles padding, gap, and radius with typed token props.
      </Text>
      <Text style={[t.typography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
        Prefer Box for structural layout instead of ad-hoc View styles.
      </Text>
    </Box>
  );
}

const meta = {
  title: 'Foundation/Layout',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Layout',
  render: () => (
    <DocPage
      description="Layout primitives and spacing conventions for composing screens."
      title="Layout"
    >
      <DocSection title="Box primitive">
        <DocBulletList
          items={[
            'Token-typed padding props: p, px, py, pt, pr, pb, pl',
            'Token-typed gap and radius props',
            'Use for cards, stacks, and story layouts'
          ]}
        />
        <DocCode code={`<Box p="400" gap="200" radius="md">\n  {children}\n</Box>`} />
        <LayoutExample />
      </DocSection>

      <DocCallout text="See Foundation/Spacing for the full space scale used by Box props." />
    </DocPage>
  )
};
