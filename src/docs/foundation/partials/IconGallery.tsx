import { ScrollView, Text, View } from 'react-native';
import { Icon } from '../../../components/Icon/Icon';
import { icons, type IconName } from '../../../components/Icon/icons';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';

export const iconNames = Object.keys(icons).sort() as IconName[];

export function IconGallery() {
  const t = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.space['400']
      }}
    >
      {iconNames.map((name) => (
        <View
          key={name}
          style={{
            alignItems: 'center',
            gap: theme.space['100'],
            width: 96
          }}
        >
          <Icon color="neutral.primary" name={name} size="md" />
          <Text
            style={[
              t.typography['label-s'],
              { color: t.color.text.neutral.secondary, textAlign: 'center' }
            ]}
          >
            {name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
