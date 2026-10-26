import { Children, type PropsWithChildren, type ReactNode } from 'react';
import { Text, View } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { resolveStoryAlign, type StorybookStoryAlign } from './StorybookStoryShell';

type SpaceKey = keyof typeof theme.space;
type LabelPosition = 'leading' | 'below';

/** Semantic gap steps for variant catalogs — maps to space tokens. */
export type StorybookVariantGap = 'sm' | 'md' | 'lg';

const storybookVariantGap: Record<StorybookVariantGap, SpaceKey> = {
  sm: '400',
  md: '800',
  lg: '1600'
};

function resolveVariantGap(gap: StorybookVariantGap) {
  return theme.space[storybookVariantGap[gap]];
}

function resolveVariantJustify(align: StorybookStoryAlign) {
  switch (align) {
    case 'center':
      return 'center' as const;
    case 'end':
    case 'right':
      return 'flex-end' as const;
    default:
      return 'flex-start' as const;
  }
}

function StorybookShrinkWrap({
  align = 'start',
  children
}: PropsWithChildren<{ align?: StorybookStoryAlign }>) {
  return <View style={{ alignSelf: resolveStoryAlign(align) }}>{children}</View>;
}

function resolveVariantTextAlign(align: StorybookStoryAlign) {
  switch (align) {
    case 'center':
      return 'center' as const;
    case 'end':
    case 'right':
      return 'right' as const;
    default:
      return 'left' as const;
  }
}

function StorybookVariantLabel({
  align = 'start',
  children
}: {
  align?: StorybookStoryAlign;
  children: ReactNode;
}) {
  const t = useTheme();

  return (
    <Text
      style={[
        t.typography.labelS,
        {
          alignSelf: 'stretch',
          color: t.color.text.neutral.tertiary,
          textAlign: resolveVariantTextAlign(align)
        }
      ]}
    >
      {children}
    </Text>
  );
}

type StorybookVariantCatalogProps = PropsWithChildren<{
  align?: StorybookStoryAlign;
  gap?: StorybookVariantGap;
}>;

/** Vertical stack of variant rows — left-aligned by default. */
export function StorybookVariantCatalog({
  align = 'start',
  gap = 'lg',
  children
}: StorybookVariantCatalogProps) {
  return (
    <View
      style={{
        alignItems: resolveStoryAlign(align),
        alignSelf: resolveStoryAlign(align),
        gap: resolveVariantGap(gap)
      }}
    >
      {children}
    </View>
  );
}

type StorybookVariantRowProps = PropsWithChildren<{
  gap?: StorybookVariantGap;
}>;

export function StorybookVariantRow({ gap = 'lg', children }: StorybookVariantRowProps) {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: resolveVariantGap(gap)
      }}
    >
      {children}
    </View>
  );
}

type StorybookVariantCellProps = PropsWithChildren<{
  /** Horizontal alignment — start (left), center, or end (right). */
  align?: StorybookStoryAlign;
  columnWidth?: number;
  /** Fill parent width — used by grid items so align works within a column. */
  fill?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
  /** Fixed width for leading labels — omit when labels vary in length. */
  labelWidth?: number;
}>;

function resolveCellWidth(columnWidth?: number, fill?: boolean) {
  if (columnWidth) {
    return columnWidth;
  }

  if (fill) {
    return '100%';
  }

  return undefined;
}

/** Label + component slot. Omits stretch — safe for Button, Badge, etc. */
export function StorybookVariantCell({
  align = 'start',
  columnWidth,
  fill,
  label,
  labelPosition = 'leading',
  labelWidth,
  children
}: StorybookVariantCellProps) {
  const t = useTheme();
  const crossAlign = resolveStoryAlign(align);
  const cellWidth = resolveCellWidth(columnWidth, fill);

  if (labelPosition === 'below') {
    return (
      <View
        style={{
          gap: theme.space['400'],
          ...(cellWidth ? { width: cellWidth } : {})
        }}
      >
        <View style={{ alignItems: crossAlign, alignSelf: fill ? 'stretch' : undefined }}>
          {children}
        </View>
        {label ? <StorybookVariantLabel align={align}>{label}</StorybookVariantLabel> : null}
      </View>
    );
  }

  if (label) {
    return (
      <View
        style={{
          alignItems: 'center',
          alignSelf: crossAlign,
          flexDirection: 'row',
          gap: theme.space['800'],
          justifyContent: columnWidth ? resolveVariantJustify(align) : undefined,
          ...(columnWidth ? { width: columnWidth } : {})
        }}
      >
        <Text
          style={[
            t.typography.labelS,
            {
              color: t.color.text.neutral.secondary,
              ...(labelWidth ? { width: labelWidth } : {})
            }
          ]}
        >
          {label}
        </Text>
        <StorybookShrinkWrap align={align}>{children}</StorybookShrinkWrap>
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: crossAlign,
        ...(cellWidth ? { width: cellWidth } : {})
      }}
    >
      <StorybookShrinkWrap align={align}>{children}</StorybookShrinkWrap>
    </View>
  );
}

type StorybookVariantGridProps = PropsWithChildren<{
  align?: StorybookStoryAlign;
  columnWidth?: number;
  columns: number;
  gap?: StorybookVariantGap;
}>;

/** Flex-wrap grid — works on web and native Storybook. */
export function StorybookVariantGrid({
  align = 'start',
  columnWidth,
  columns,
  gap = 'lg',
  children
}: StorybookVariantGridProps) {
  const gapPx = resolveVariantGap(gap);
  const items = Children.toArray(children);
  const rows: ReactNode[][] = [];

  for (let index = 0; index < items.length; index += columns) {
    rows.push(items.slice(index, index + columns));
  }

  const itemStyle = columnWidth ? { width: columnWidth } : { flex: 1, minWidth: 0 };
  const gridWidth = columnWidth
    ? columns * columnWidth + (columns - 1) * gapPx
    : undefined;

  return (
    <View
      style={{
        alignSelf: resolveStoryAlign(align),
        gap: gapPx,
        width: gridWidth ?? '100%'
      }}
    >
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row', gap: gapPx }}>
          {row.map((child, columnIndex) => (
            <View key={columnIndex} style={itemStyle}>
              {child}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

type StorybookVariantGridItemProps = PropsWithChildren<{
  align?: StorybookStoryAlign;
  label?: string;
  labelPosition?: LabelPosition;
}>;

export function StorybookVariantGridItem({
  align = 'start',
  label,
  labelPosition = 'below',
  children
}: StorybookVariantGridItemProps) {
  return (
    <View style={{ width: '100%' }}>
      <StorybookVariantCell
        align={align}
        fill
        label={label}
        labelPosition={labelPosition}
      >
        {children}
      </StorybookVariantCell>
    </View>
  );
}
