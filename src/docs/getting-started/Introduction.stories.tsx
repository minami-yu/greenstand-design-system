import type { Meta, StoryObj } from '@storybook/react';
import { DocBulletList, DocCallout, DocPage, DocSection } from '../components/DocPage';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const meta = {
  title: 'Getting started/Introduction',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Introduction: StoryObj<typeof meta> = {
  render: () => (
    <DocPage
      description="Greenstand design system sandbox — tokens from Figma, components in React Native, documented in Storybook."
      title="Getting started"
    >
      <DocSection title="What this is">
        <DocBulletList
          items={[
            'Design tokens compiled from Figma via Style Dictionary',
            'React Native components previewed on-device and on web',
            'Storybook as the shared catalog for designers and engineers'
          ]}
        />
      </DocSection>

      <DocSection title="Run locally">
        <DocBulletList
          items={[
            'npm install',
            'npm run build-tokens',
            'npm run storybook:web — desktop catalog at localhost:6006',
            'npm run storybook — on-device Storybook inside Expo'
          ]}
        />
      </DocSection>

      <DocCallout text="Use Foundation pages for tokens. Use Components for API docs and playgrounds. Switch light/dark mode from the Storybook toolbar." />
    </DocPage>
  )
};
