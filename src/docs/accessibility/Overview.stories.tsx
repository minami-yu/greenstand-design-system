import type { Meta, StoryObj } from '@storybook/react';
import { DocBulletList, DocCallout, DocPage, DocSection } from '../components/DocPage';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const meta = {
  title: 'Accessibility/Overview',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Overview',
  render: () => (
    <DocPage
      description="Accessibility expectations for React Native components in this design system."
      title="Accessibility"
    >
      <DocSection title="Component expectations">
        <DocBulletList
          items={[
            'Interactive components expose accessibilityRole and accessibilityLabel where needed',
            'Text contrast follows semantic color tokens for light and dark modes',
            'Touch targets should meet platform minimums — use size tokens, not arbitrary pixels'
          ]}
        />
      </DocSection>

      <DocSection title="Testing">
        <DocBulletList
          items={[
            'Verify with VoiceOver (iOS) and TalkBack (Android) on-device Storybook',
            'Check focus order and labels on web Storybook for shared components',
            'Audit new components before shipping to product apps'
          ]}
        />
      </DocSection>

      <DocCallout text="Accessibility guidance will expand as components add more states and platform-specific behavior." />
    </DocPage>
  )
};
