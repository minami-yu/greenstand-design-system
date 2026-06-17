import { create } from '@storybook/theming';
import logoUrl from './assets/logo-storybook.svg?url';
import { theme } from '../src/theme/tokens';

/**
 * Shared Storybook UI theme from design tokens.
 *
 * Wired in two places (Storybook runs manager + preview separately):
 * - `.storybook-web/manager.ts` — sidebar, toolbar, search, addon panels
 * - `.storybook-web/storybookDocsParameters.ts` — Docs tab page chrome
 *
 * MDX prose uses `storybookMdStyles.ts`. RN catalogs use `storybookRnTypography.ts`.
 *
 * @see https://storybook.js.org/docs/configure/user-interface/theming
 */
export const storybookTheme = create({
  base: 'light',
  brandImage: logoUrl,
  brandTitle: 'Greenstand Design System',

  fontBase: 'Inter_400Regular, Inter, sans-serif',
  fontCode: 'Roboto Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',

  colorPrimary: theme.color.fill.brand.default,
  colorSecondary: theme.color.fill.brand.default,

  appBg: theme.color.fill.neutral.surface,
  appContentBg: theme.color.background.neutral.default,
  appPreviewBg: theme.color.background.neutral.default,
  appBorderColor: theme.color.border.neutral.subtle,
  appBorderRadius: theme.radius.sm,

  textColor: theme.color.text.neutral.primary,
  textInverseColor: theme.color.text.neutral.inverse,
  textMutedColor: theme.color.text.neutral.secondary,

  barBg: theme.color.background.neutral.default,
  barHoverColor: theme.color.text.neutral.primary,
  barSelectedColor: theme.color.text.neutral.primary,
  barTextColor: theme.color.text.neutral.secondary,

  inputBg: theme.color.background.neutral.default,
  inputBorder: theme.color.border.neutral.default,
  inputBorderRadius: theme.radius.sm,
  inputTextColor: theme.color.text.neutral.primary
});
