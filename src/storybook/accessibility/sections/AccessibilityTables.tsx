import { Text } from 'react-native';
import { StorybookCatalogThemeProvider } from '../../ui/StorybookCatalogThemeProvider';
import {
  StorybookInlineCode,
  StorybookTable,
  StorybookTableCell,
  StorybookTableRow,
  storybookRnTypography,
  type StorybookTableColumn
} from '../../ui';
import { useTheme } from '../../../theme/useTheme';

const apiColumnFlex = {
  rnProp: 26,
  web: 22,
  whenToUse: 52
} as const;

const apiTableColumns = [
  { label: 'React Native prop', flex: apiColumnFlex.rnProp },
  { label: 'Web (via RN Web)', flex: apiColumnFlex.web },
  { label: 'When to use', flex: apiColumnFlex.whenToUse }
] satisfies StorybookTableColumn[];

const apiRows = [
  {
    rnProp: 'accessibilityRole',
    web: 'role',
    whenToUse:
      'Set inside design-system components (switch, checkbox, button, …). Override only when needed.'
  },
  {
    rnProp: 'accessibilityState',
    web: 'aria-checked, aria-disabled, …',
    whenToUse: 'Set inside components for checked, disabled, selected, busy, etc.'
  },
  {
    rnProp: 'accessibilityLabel',
    web: 'aria-label',
    whenToUse: 'Call site when purpose is not obvious from visible text.'
  },
  {
    rnProp: 'accessibilityHint',
    web: 'Hint / description',
    whenToUse: 'Optional extra context after the label.'
  },
  {
    rnProp: 'accessibilityValue',
    web: 'aria-valuenow, …',
    whenToUse: 'Progress and similar value-bearing controls.'
  }
] as const;

const labelColumnFlex = {
  component: 24,
  guidance: 76
} as const;

const labelTableColumns = [
  { label: 'Component', flex: labelColumnFlex.component },
  { label: 'Label guidance', flex: labelColumnFlex.guidance }
] satisfies StorybookTableColumn[];

const labelRows = [
  {
    component: 'Button',
    guidance: 'Visible label is usually enough. Add accessibilityLabel for icon-only buttons.'
  },
  {
    component: 'Switch / CheckInput',
    guidance: 'Pass accessibilityLabel when used without adjacent visible label text.'
  },
  {
    component: 'Icon',
    guidance:
      'Required when the icon conveys meaning (close, delete, status). Omit for decorative icons inside labeled buttons.'
  },
  {
    component: 'Spinner',
    guidance: 'Defaults to "Loading"; override when context is clearer (e.g. "Uploading photos").'
  },
  {
    component: 'Badge',
    guidance:
      'Label badges default to value; dot badges need accessibilityLabel if they convey status.'
  },
  {
    component: 'ProgressBar',
    guidance:
      'Set accessibilityLabel when progress is meaningful (e.g. "Upload progress"). Value/min/max are set internally.'
  },
  {
    component: 'RadioGroup',
    guidance: 'Group label prop names the field; each option uses its option label.'
  },
  {
    component: 'Divider',
    guidance: 'Decorative — hidden from screen readers by default (accessibilityElementsHidden).'
  }
] as const;

function TableBodyText({ children }: { children: string }) {
  const t = useTheme();

  return (
    <Text style={[storybookRnTypography.paragraphS, { color: t.color.text.neutral.primary }]}>
      {children}
    </Text>
  );
}

function AccessibilityApiTableView() {
  const t = useTheme();

  return (
    <StorybookTable columns={apiTableColumns}>
      {apiRows.map((row) => (
        <StorybookTableRow key={row.rnProp} style={{ alignItems: 'center' }}>
          <StorybookTableCell flex={apiColumnFlex.rnProp}>
            <StorybookInlineCode size="monoBodyS">{row.rnProp}</StorybookInlineCode>
          </StorybookTableCell>
          <StorybookTableCell flex={apiColumnFlex.web}>
            <Text style={[storybookRnTypography.paragraphS, { color: t.color.text.neutral.primary }]}>
              {row.web}
            </Text>
          </StorybookTableCell>
          <StorybookTableCell flex={apiColumnFlex.whenToUse}>
            <TableBodyText>{row.whenToUse}</TableBodyText>
          </StorybookTableCell>
        </StorybookTableRow>
      ))}
    </StorybookTable>
  );
}

function ComponentLabelGuidanceTableView() {
  const t = useTheme();

  return (
    <StorybookTable columns={labelTableColumns}>
      {labelRows.map((row) => (
        <StorybookTableRow key={row.component} style={{ alignItems: 'center' }}>
          <StorybookTableCell flex={labelColumnFlex.component}>
            <Text style={[storybookRnTypography.labelS, { color: t.color.text.neutral.primary }]}>
              {row.component}
            </Text>
          </StorybookTableCell>
          <StorybookTableCell flex={labelColumnFlex.guidance}>
            <TableBodyText>{row.guidance}</TableBodyText>
          </StorybookTableCell>
        </StorybookTableRow>
      ))}
    </StorybookTable>
  );
}

export function AccessibilityApiTable() {
  return (
    <StorybookCatalogThemeProvider>
      <AccessibilityApiTableView />
    </StorybookCatalogThemeProvider>
  );
}

export function ComponentLabelGuidanceTable() {
  return (
    <StorybookCatalogThemeProvider>
      <ComponentLabelGuidanceTableView />
    </StorybookCatalogThemeProvider>
  );
}
