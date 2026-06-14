import type { TextStyle, ViewStyle } from 'react-native';
import { theme } from '../../theme/tokens';

const monoFontFamily = 'Roboto Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export const sbTypography = {
  'heading-m': {
    fontFamily: 'Montserrat_700Bold, Montserrat, sans-serif',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 40
  },
  'heading-s': {
    fontFamily: 'Montserrat_700Bold, Montserrat, sans-serif',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32
  },
  'heading-xs': {
    fontFamily: 'Montserrat_700Bold, Montserrat, sans-serif',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24
  },
  'paragraph-m': {
    fontFamily: 'Inter_400Regular, Inter, sans-serif',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  'paragraph-l': {
    fontFamily: 'Inter_500Medium, Inter, sans-serif',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24
  },
  'paragraph-s': {
    fontFamily: 'Inter_400Regular, Inter, sans-serif',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20
  },
  'label-m-strong': {
    fontFamily: 'Inter_600SemiBold, Inter, sans-serif',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20
  },
  'label-s': {
    fontFamily: 'Inter_400Regular, Inter, sans-serif',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16
  },
  'label-s-strong': {
    fontFamily: 'Inter_600SemiBold, Inter, sans-serif',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16
  },
  'mono-body-l': {
    fontFamily: monoFontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  'mono-body-m': {
    fontFamily: monoFontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20
  }
} as const satisfies Record<string, TextStyle>;

export type StorybookMonoTypography =
  | 'mono-body-l'
  | 'mono-body-m';

export const storybookCodeStyles = {
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
