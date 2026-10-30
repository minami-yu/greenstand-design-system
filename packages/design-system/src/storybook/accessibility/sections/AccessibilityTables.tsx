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
    component: 'Card',
    guidance: 'A non-interactive surface: leave child text and controls individually accessible. Use visible headings and labeled actions; do not group the whole card as one accessible element when it contains controls. Content height grows with text.'
  },
  {
    component: 'DetailRow',
    guidance: 'Read-only label and value content follows label-first reading order. Keep visible text accessible, omit redundant labels on decorative avatars, and preserve readable wrapping for custom values. Dividers are hidden from assistive technology.'
  },
  {
    component: 'IconButton',
    guidance: 'Supply a specific accessibilityLabel describing the action or destination. xs uses a 44 px touch target around a 28 px circle; sm and md retain 48 px targets. Disabled state is exposed and prevents activation.'
  },
  {
    component: 'Dialog / PointerDialog',
    guidance: 'Use a visible heading and explicit labeled actions. Dialog modal and DialogOverlay use the React Native Modal focus scope; Back/Escape call onClose and backdrop taps do not dismiss. The close action has a 44 px target. Entrance fades respect Reduce Motion. PointerDialog is a presentation card: its caller owns the modal host and target placement. Pointers and tutorial artwork are decorative. Verify VoiceOver/TalkBack focus in the hosting app.'
  },
  {
    component: 'BottomSheet',
    guidance: 'Place persistent actions in footer so they remain reachable when the body scrolls at maximum height. The footer follows the body in reading order, reserves its own space, and stays above the bottom safe area. Give each action a clear visible label.'
  },
  {
    component: 'ToggleButton',
    guidance: 'Requires a meaningful accessibilityLabel; include the badge count when relevant. Exposes button, selected, and disabled states, plus aria-pressed on web. The icon and badge are decorative children of one 48 px touch target. Callers opening a picker can also pass expanded state.'
  },
  {
    component: 'Chip',
    guidance: 'The visible label names the button; close chips announce Remove plus the label. Selection and disabled state are exposed. Both pill sizes retain a minimum 44 px touch target; allow for this target when spacing wrapping rows.'
  },
  {
    component: 'Snackbar',
    guidance: 'Announces the message as feedback with a polite live region on web. Keep an enduring status elsewhere after dismissal; decorative status icons need no separate label.'
  },
  {
    component: 'Select',
    guidance: 'Announces the field label and current value. The trigger exposes button, disabled, and expanded state with a 56 px minimum height. The caller owns picker focus and dismissal. With hideLabel, the required label still names the trigger; leadingContent is decorative.'
  },
  {
    component: 'TextField',
    guidance: 'Use a visible label or supply accessibilityLabel for unlabeled email and phone inputs. Leading icons are decorative. Clear announces the field name and preserves input focus.'
  },
  {
    component: 'ImageGroup',
    guidance: 'Announces the total saved-photo count as one group. Thumbnails are decorative and the group is not interactive.'
  },
  {
    component: 'AvatarCard',
    guidance: 'The whole card is one button named by its full label, with selected and disabled states. Photo and action icon are decorative. Labels wrap to two lines; use accessibilityLabel only when the visible label needs clarification.'
  },
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
