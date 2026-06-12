import type { Preview } from '@storybook/react';
import { View } from 'react-native';
import { useAppFonts } from '../src/theme/fonts';
import { theme } from '../src/theme/tokens';

const preview: Preview = {
  decorators: [
    (Story) => {
      const fontsLoaded = useAppFonts();

      if (!fontsLoaded) {
        return <View />;
      }

      return (
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            padding: theme.space['400']
          }}
        >
          <Story />
        </View>
      );
    }
  ]
};

export default preview;
