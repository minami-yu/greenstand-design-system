import { create } from '@storybook/theming';
import logoUrl from './assets/logo-storybook.svg?url';
import { theme } from '../src/theme/tokens';

export const storybookTheme = create({
  base: 'light',
  brandImage: logoUrl,
  brandTitle: 'Greenstand Design System',

  // Typography
  fontBase: 'Inter_400Regular, Inter, sans-serif',
  fontCode: 'monospace',

  // Color palette
  colorPrimary: theme.color.fill.brand.default,
  colorSecondary: theme.color.fill.brand.default,

  // UI
  appBg: theme.color.fill.neutral.subtle,
  appBorderColor: theme.color.border.neutral.subtle,
  appBorderRadius: theme.radius.sm,
  appContentBg: theme.color.background.neutral.default,
  appPreviewBg: theme.color.background.neutral.default,

  // Text colors
  textColor: theme.color.text.neutral.primary,
  textInverseColor: theme.color.text.neutral.inverse,

  // Toolbar default and active colors
  barBg: theme.color.background.neutral.default,
  barHoverColor: theme.color.text.neutral.primary,
  barSelectedColor: theme.color.text.neutral.primary,
  barTextColor: theme.color.text.neutral.secondary,

  // Form colors
  inputBg: theme.color.background.neutral.default,
  inputBorder: theme.color.border.neutral.default,
  inputBorderRadius: theme.radius.sm,
  inputTextColor: theme.color.text.neutral.primary
});
