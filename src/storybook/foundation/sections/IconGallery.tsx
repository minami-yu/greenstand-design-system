import { Text, View } from 'react-native';
import { Icon } from '../../../components/Icon/Icon';
import { icons, type IconName } from '../../../components/Icon/icons';
import { theme } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { CatalogThemeProvider } from '../../ui/CatalogThemeProvider';
import { storybookRnTypography } from '../../ui';

const galleryColumns = 6;

export const iconNames = Object.keys(icons).sort() as IconName[];

function chunkIconNames(names: IconName[], size: number): IconName[][] {
  const rows: IconName[][] = [];

  for (let index = 0; index < names.length; index += size) {
    rows.push(names.slice(index, index + size));
  }

  return rows;
}

export function IconGallery() {
  return (
    <CatalogThemeProvider>
      <IconGalleryView />
    </CatalogThemeProvider>
  );
}

function IconGalleryView() {
  const t = useTheme();
  const rows = chunkIconNames(iconNames, galleryColumns);
  const columnGap = theme.space['400'];
  const cellWidth = `calc((100% - ${(galleryColumns - 1) * columnGap}px) / ${galleryColumns})`;

  return (
    <View style={{ alignSelf: 'stretch', marginVertical: theme.space['600'], width: '100%' }}>
      {rows.map((row, rowIndex) => (
        <View
          key={`icon-gallery-row-${rowIndex}`}
          style={{
            flexDirection: 'row',
            gap: columnGap,
            marginBottom: rowIndex < rows.length - 1 ? columnGap : 0,
            width: '100%'
          }}
        >
          {row.map((name) => (
            <View
              key={name}
              style={{
                alignItems: 'center',
                aspectRatio: 1,
                borderColor: t.color.border.neutral.subtle,
                borderRadius: theme.radius.sm,
                borderWidth: theme.border.sm,
                flexGrow: 0,
                flexShrink: 0,
                gap: theme.space['400'],
                justifyContent: 'center',
                padding: theme.space['300'],
                width: cellWidth
              }}
            >
              <Icon color="neutral.primary" name={name} size="lg" />
              <Text
                numberOfLines={2}
                style={[
                  storybookRnTypography.labelS,
                  { color: t.color.text.neutral.secondary, textAlign: 'center' }
                ]}
              >
                {name}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
