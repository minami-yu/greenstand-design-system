import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, Text, View } from 'react-native';
import { Icon } from '../../components/Icon/Icon';
import { icons, type IconName } from '../../components/Icon/icons';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { DocPage, DocSection } from '../components/DocPage';
import { TokenCatalog } from '../components/TokenCatalog';
import { buildScaleCatalogEntries } from '../utils/buildCatalogEntries';
import { DOC_PAGE_PARAMETERS } from '../utils/createDocStory';

const iconSizes = buildScaleCatalogEntries('icon', 'icon');
const iconNames = Object.keys(icons).sort() as IconName[];

function IconGallery() {
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

const meta = {
  title: 'Foundation/Icons',
  parameters: DOC_PAGE_PARAMETERS
} satisfies Meta;

export default meta;

export const Page: StoryObj<typeof meta> = {
  name: 'Icons',
  render: () => (
    <DocPage
      description="MDI icons from the Figma Icons frame, registered in src/components/Icon/icons.ts."
      title="Icons"
    >
      <DocSection description="Size tokens for the Icon component." title="Sizes">
        <TokenCatalog entries={iconSizes} />
      </DocSection>

      <DocSection description={`${iconNames.length} icons currently registered.`} title="Catalog">
        <IconGallery />
      </DocSection>
    </DocPage>
  )
};
