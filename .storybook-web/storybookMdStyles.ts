import { theme } from '../src/theme/tokens';

/** Shared doc surface tokens for MDX CSS and RN preview components (`StorybookImage`, Do/Don't cards). */
export const storybookDocSurface = {
  imageBackground: theme.color.fill.neutral.subtle,
  imageRadius: theme.radius.sm,
} as const;

/**
 * CSS for MDX **markdown and Storybook HTML blocks** in the docs tab.
 *
 * Applied to: component MDX, foundation/guide prose (`#`, `##`, lists, `<ArgTypes />`, `<Title />`).
 * Not used for RN catalog tables — those use `src/storybook/ui/storybookRnTypography.ts`.
 */
export const storybookMdStyles = `
  .sbdocs.sbdocs-wrapper {
    padding: ${theme.space['1200']}px ${theme.space['800']}px;
    background: ${theme.color.background.neutral.default};
  }

  .sbdocs.sbdocs-content {
    max-width: 848px;
    width: 100%;
  }

  .sbdocs.sbdocs-content h1 {
    font-family: Montserrat_700Bold, Montserrat, sans-serif;
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    color: ${theme.color.text.neutral.primary};
    margin-bottom: ${theme.space['300']}px;
  }

  .sbdocs.sbdocs-content h2 {
    font-family: Montserrat_700Bold, Montserrat, sans-serif;
    font-size: 30px;
    font-weight: 700;
    line-height: 32px;
    color: ${theme.color.text.neutral.primary};
    margin-top: ${theme.space['1200']}px;
    margin-bottom: ${theme.space['300']}px;
  }

  .sbdocs.sbdocs-content h3 {
    font-family: Montserrat_700Bold, Montserrat, sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    color: ${theme.color.text.neutral.primary};
    margin-top: ${theme.space['800']}px;
    margin-bottom: ${theme.space['200']}px;
  }

  .sbdocs.sbdocs-content h4 {
    font-family: Inter_600SemiBold, Inter, sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: ${theme.color.text.neutral.primary};
    margin-top: ${theme.space['600']}px;
    margin-bottom: ${theme.space['200']}px;
  }

  .sbdocs.sbdocs-content p,
  .sbdocs.sbdocs-content li {
    font-family: Inter_400Regular, Inter, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: ${theme.color.text.neutral.primary};
  }

  .sbdocs.sbdocs-content p strong,
  .sbdocs.sbdocs-content li strong {
    font-family: Inter_600SemiBold, Inter, sans-serif;
    font-weight: 600;
  }

  .sbdocs.sbdocs-content ul,
  .sbdocs.sbdocs-content ol {
    margin: 0;
    padding-left: ${theme.space['600']}px;
  }

  .sbdocs.sbdocs-content li + li {
    margin-top: ${theme.space['200']}px;
  }

  .sbdocs.sbdocs-content blockquote {
    border-left: ${theme.stroke.md}px solid ${theme.color.border.brand.default};
    margin: ${theme.space['400']}px 0;
    padding-left: ${theme.space['400']}px;
    color: ${theme.color.text.neutral.secondary};
  }

  .sbdocs.sbdocs-content a {
    color: ${theme.color.text.brand.default};
  }

  .sbdocs.sbdocs-content a:hover {
    color: ${theme.color.fill.brand.hover};
  }

  .sbdocs.sbdocs-content code {
    font-family: Roboto Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 14px;
    background: ${theme.color.fill.neutral.subtle};
    border-radius: ${theme.radius.sm}px;
    padding: ${theme.space['050']}px ${theme.space['200']}px;
    color: ${theme.color.text.neutral.primary};
  }

  .sbdocs.sbdocs-content pre {
    background: ${theme.color.fill.neutral.subtle};
    border-radius: ${theme.radius.sm}px;
    margin: ${theme.space['400']}px 0;
    overflow-x: auto;
    padding: ${theme.space['600']}px;
  }

  .sbdocs.sbdocs-content pre code {
    background: transparent;
    padding: 0;
  }

  .sbdocs .docblock-argstable,
  .sbdocs table.docblock-argstable {
    font-family: Inter_400Regular, Inter, sans-serif;
    border: ${theme.stroke.sm}px solid ${theme.color.border.neutral.subtle};
    border-radius: ${theme.radius.sm}px;
    overflow: hidden;
  }

  .sbdocs .docblock-argstable-head span {
    font-family: Inter_600SemiBold, Inter, sans-serif;
    font-size: 12px;
    color: ${theme.color.text.neutral.secondary};
  }

  .sbdocs .docblock-argstable-body td {
    font-size: 14px;
    color: ${theme.color.text.neutral.secondary};
    border-top: ${theme.stroke.sm}px solid ${theme.color.border.neutral.subtle};
  }

  .sbdocs .docblock-argstable-body td:first-of-type {
    color: ${theme.color.text.neutral.primary};
    font-family: Roboto Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 14px;
  }

  .sbdocs .docblock-source,
  .sbdocs .source-block,
  .sbdocs pre[class*='language-'],
  .sbdocs .sbdocs-preview .docblock-code-toggle {
    display: none !important;
  }
`;
