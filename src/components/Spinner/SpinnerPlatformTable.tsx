import { Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { StorybookCatalogThemeProvider } from '../../storybook/ui/StorybookCatalogThemeProvider';
import {
  StorybookInlineCode,
  StorybookTable,
  StorybookTableCell,
  StorybookTableRow,
  storybookRnTypography,
  type StorybookTableColumn
} from '../../storybook/ui';

const platformColumnFlex = {
  property: 28,
  ios: 36,
  android: 36
} as const;

const platformTableColumns = [
  { label: '', flex: platformColumnFlex.property },
  { label: 'iOS', flex: platformColumnFlex.ios },
  { label: 'Android', flex: platformColumnFlex.android }
] satisfies StorybookTableColumn[];

const platformRows = [
  {
    property: 'Native widget',
    ios: 'UIActivityIndicatorView',
    android: 'ProgressBar'
  },
  {
    property: 'Size API',
    ios: 'small (20px) / large (36px)',
    android: 'numeric dp (20 / 36)'
  },
  {
    property: 'Look',
    ios: 'Classic Apple petal spinner',
    android: 'Material rotating arc'
  }
] as const;

function PlatformTableCell({
  mono,
  value
}: {
  mono?: boolean;
  value: string;
}) {
  const t = useTheme();

  if (mono) {
    return <StorybookInlineCode size="monoBodyS">{value}</StorybookInlineCode>;
  }

  return (
    <Text style={[storybookRnTypography.paragraphS, { color: t.color.text.neutral.primary }]}>
      {value}
    </Text>
  );
}

export function SpinnerPlatformTable() {
  return (
    <StorybookCatalogThemeProvider>
      <SpinnerPlatformTableView />
    </StorybookCatalogThemeProvider>
  );
}

function SpinnerPlatformTableView() {
  const t = useTheme();

  return (
    <StorybookTable columns={platformTableColumns}>
      {platformRows.map((row) => {
        const useMono = row.property === 'Native widget';

        return (
        <StorybookTableRow key={row.property} style={{ alignItems: 'center' }}>
          <StorybookTableCell flex={platformColumnFlex.property}>
            <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.secondary }]}>
              {row.property}
            </Text>
          </StorybookTableCell>
          <StorybookTableCell flex={platformColumnFlex.ios}>
            <PlatformTableCell mono={useMono} value={row.ios} />
          </StorybookTableCell>
          <StorybookTableCell flex={platformColumnFlex.android}>
            <PlatformTableCell mono={useMono} value={row.android} />
          </StorybookTableCell>
        </StorybookTableRow>
        );
      })}
    </StorybookTable>
  );
}
