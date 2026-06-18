import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { getDividerStyles } from './getDividerStyles';

export type DividerProps = ViewProps;

export function Divider({
  accessibilityElementsHidden = true,
  importantForAccessibility = 'no-hide-descendants',
  style,
  ...props
}: DividerProps) {
  const t = useTheme();
  const styles = getDividerStyles(t.color);

  const dividerStyle: ViewStyle = {
    alignSelf: 'stretch',
    backgroundColor: styles.backgroundColor,
    height: styles.thickness,
    width: '100%'
  };

  return (
    <View
      {...props}
      accessibilityElementsHidden={accessibilityElementsHidden}
      importantForAccessibility={importantForAccessibility}
      style={[dividerStyle, style]}
    />
  );
}
