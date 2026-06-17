import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, Text, View, type ViewStyle } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { storybookRnTypography } from './storybookRnTypography';

export type StorybookTableColumn = {
  flex: number;
  label: string;
};

type StorybookTableProps = PropsWithChildren<{
  columns: StorybookTableColumn[];
  minWidth?: keyof typeof theme.responsive;
}>;

export function StorybookTable({ children, columns, minWidth }: StorybookTableProps) {
  const t = useTheme();
  const enableHorizontalScroll = minWidth != null;

  return (
    <ScrollView
      horizontal={enableHorizontalScroll}
      scrollEnabled={enableHorizontalScroll}
      contentContainerStyle={{ minWidth: '100%' }}
      style={{ marginVertical: theme.space['600'], width: '100%' }}
    >
      <View
        style={{
          backgroundColor: t.color.background.neutral.default,
          borderColor: t.color.border.neutral.subtle,
          borderRadius: theme.radius.sm,
          borderWidth: theme.border.sm,
          overflow: 'hidden',
          width: '100%',
          ...(minWidth ? { minWidth: theme.responsive[minWidth] } : {})
        }}
      >
        <StorybookTableHeader columns={columns} />
        {children}
      </View>
    </ScrollView>
  );
}

function StorybookTableHeader({ columns }: { columns: StorybookTableColumn[] }) {
  const t = useTheme();

  return (
    <View
      style={{
        backgroundColor: t.color.fill.neutral.subtle,
        borderBottomColor: t.color.border.neutral.subtle,
        borderBottomWidth: theme.border.sm,
        flexDirection: 'row'
      }}
    >
      {columns.map((column) => (
        <StorybookTableCell flex={column.flex} key={column.label}>
          <Text style={[storybookRnTypography.labelSStrong, { color: t.color.text.neutral.secondary }]}>
            {column.label}
          </Text>
        </StorybookTableCell>
      ))}
    </View>
  );
}

type StorybookTableRowProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

export function StorybookTableRow({ children, style }: StorybookTableRowProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.color.background.neutral.default,
          borderTopColor: t.color.border.neutral.subtle,
          borderTopWidth: theme.border.sm,
          flexDirection: 'row'
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

type StorybookTableCellProps = {
  children: ReactNode;
  flex: number;
  justifyContent?: ViewStyle['justifyContent'];
};

export function StorybookTableCell({ children, flex, justifyContent }: StorybookTableCellProps) {
  return (
    <View
      style={{
        flex,
        flexShrink: 1,
        justifyContent,
        minWidth: 0,
        paddingHorizontal: theme.space['400'],
        paddingVertical: theme.space['300']
      }}
    >
      {children}
    </View>
  );
}

export function StorybookTableGroupRow({ label }: { label: string }) {
  const t = useTheme();

  return (
    <View
      style={{
        backgroundColor: t.color.fill.neutral.subtle,
        borderTopColor: t.color.border.neutral.subtle,
        borderTopWidth: theme.border.sm,
        paddingHorizontal: theme.space['400'],
        paddingVertical: theme.space['200'],
        width: '100%'
      }}
    >
      <Text style={[storybookRnTypography.labelSStrong, { color: t.color.text.neutral.primary }]}>
        {label}
      </Text>
    </View>
  );
}
