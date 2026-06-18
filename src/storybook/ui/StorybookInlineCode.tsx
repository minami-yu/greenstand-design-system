import type { PropsWithChildren } from 'react';
import { Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { storybookRnCodeStyles, storybookRnTypography, type StorybookRnMonoTypography } from './storybookRnTypography';

type StorybookInlineCodeProps = PropsWithChildren<{
  containerStyle?: ViewStyle;
  size?: StorybookRnMonoTypography;
  style?: TextStyle;
}>;

export function StorybookInlineCode({
  children,
  containerStyle,
  size = 'monoBodyS',
  style
}: StorybookInlineCodeProps) {
  const t = useTheme();

  return (
    <View
      style={[
        storybookRnCodeStyles.inlineContainer,
        { backgroundColor: t.color.fill.neutral.subtle },
        containerStyle
      ]}
    >
      <Text
        style={[storybookRnTypography[size], { color: t.color.text.neutral.primary }, style]}
      >
        {children}
      </Text>
    </View>
  );
}
