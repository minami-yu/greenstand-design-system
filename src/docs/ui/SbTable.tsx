import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, Text, View, type ViewStyle } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { sbTypography } from './sbTypography';

export type SbTableColumn = {
  flex: number;
  label: string;
};

type SbTableProps = PropsWithChildren<{
  columns: SbTableColumn[];
  minWidth?: keyof typeof theme.responsive;
}>;

export function SbTable({ children, columns, minWidth = 'lg' }: SbTableProps) {
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
        <SbTableHeader columns={columns} />
        {children}
      </View>
    </ScrollView>
  );
}

function SbTableHeader({ columns }: { columns: SbTableColumn[] }) {
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
        <SbTableCell flex={column.flex} key={column.label}>
          <Text style={[sbTypography['label-s-strong'], { color: t.color.text.neutral.secondary }]}>
            {column.label}
          </Text>
        </SbTableCell>
      ))}
    </View>
  );
}

type SbTableRowProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

export function SbTableRow({ children, style }: SbTableRowProps) {
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

type SbTableCellProps = {
  children: ReactNode;
  flex: number;
  justifyContent?: ViewStyle['justifyContent'];
};

export function SbTableCell({ children, flex, justifyContent }: SbTableCellProps) {
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

export function SbTableGroupRow({ label }: { label: string }) {
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
      <Text style={[sbTypography['label-m-strong'], { color: t.color.text.neutral.primary }]}>
        {label}
      </Text>
    </View>
  );
}
