/**
 * RN typography for Storybook docs **catalog / preview** components only.
 *
 * Applied to: `StorybookTable`, token catalogs, and other RN doc previews (react-native-web on web).
 * Not used for MDX prose — markdown headings and body copy use `.storybook-web/storybookMdStyles.ts`.
 */
import type { TextStyle, ViewStyle } from 'react-native';
import { theme } from '../../theme/tokens';

const monoFontFamily = 'Roboto Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export const storybookRnTypography = {
  headingM: {
    fontFamily: 'Montserrat_700Bold, Montserrat, sans-serif',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 40
  },
  headingS: {
    fontFamily: 'Montserrat_700Bold, Montserrat, sans-serif',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32
  },
  headingXs: {
    fontFamily: 'Montserrat_700Bold, Montserrat, sans-serif',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24
  },
  paragraphL: {
    fontFamily: 'Inter_400Regular, Inter, sans-serif',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26
  },
  paragraphLStrong: {
    fontFamily: 'Inter_600SemiBold, Inter, sans-serif',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26
  },
  paragraphM: {
    fontFamily: 'Inter_400Regular, Inter, sans-serif',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  paragraphMStrong: {
    fontFamily: 'Inter_600SemiBold, Inter, sans-serif',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24
  },
  paragraphS: {
    fontFamily: 'Inter_400Regular, Inter, sans-serif',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20
  },
  labelM: {
    fontFamily: 'Inter_500Medium, Inter, sans-serif',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24
  },
  labelMStrong: {
    fontFamily: 'Inter_600SemiBold, Inter, sans-serif',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24
  },
  labelS: {
    fontFamily: 'Inter_500Medium, Inter, sans-serif',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20
  },
  labelSStrong: {
    fontFamily: 'Inter_600SemiBold, Inter, sans-serif',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20
  },
  monoBodyM: {
    fontFamily: monoFontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  monoBodyS: {
    fontFamily: monoFontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20
  }
} as const satisfies Record<string, TextStyle>;

export type StorybookRnMonoTypography = 'monoBodyM' | 'monoBodyS';

export const storybookRnCodeStyles = {
  inlineContainer: {
    alignSelf: 'flex-start',
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.space['200'],
    paddingVertical: theme.space['050']
  },
  blockContainer: {
    borderRadius: theme.radius.sm,
    padding: theme.space['600']
  }
} as const satisfies Record<string, ViewStyle>;
