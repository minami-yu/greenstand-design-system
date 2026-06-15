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

export function StorybookTable({ children, columns, minWidth = 'lg' }: StorybookTableProps) {
  const t = useTheme();

  return (
    <ScrollView horizontal contentContainerStyle={{ minWidth: '100%' }} style={{ width: '100%' }}>
      <View
        style={{
          borderColor: t.color.border.neutral.subtle,
          borderRadius: theme.radius.sm,
          borderWidth: theme.stroke.sm,
          minWidth: theme.responsive[minWidth],
          overflow: 'hidden',
          width: '100%'
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
        backgroundColor: t.color.background.neutral.subtle,
        borderBottomColor: t.color.border.neutral.subtle,
        borderBottomWidth: theme.stroke.sm,
        flexDirection: 'row'
      }}
    >
      {columns.map((column) => (
        <StorybookTableCell flex={column.flex} key={column.label}>
          <Text style={[storybookRnTypography['label-s-strong'], { color: t.color.text.neutral.secondary }]}>
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
          borderTopColor: t.color.border.neutral.subtle,
          borderTopWidth: theme.stroke.sm,
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
        justifyContent,
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
        borderTopWidth: theme.stroke.sm,
        paddingHorizontal: theme.space['400'],
        paddingVertical: theme.space['200'],
        width: '100%'
      }}
    >
      <Text style={[storybookRnTypography['label-m-strong'], { color: t.color.text.neutral.primary }]}>
        {label}
      </Text>
    </View>
  );
}
