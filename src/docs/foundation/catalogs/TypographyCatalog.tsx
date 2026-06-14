import { Fragment, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { theme, typographies, type TypographyMode } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import {
  InlineCode,
  SbTable,
  SbTableCell,
  SbTableGroupRow,
  SbTableRow,
  sbTypography,
  type SbTableColumn,
  type TokenCatalogEntry
} from '../../ui';

type TypographyCatalogProps = {
  entries: TokenCatalogEntry[];
};

type TypographyStyle = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  lineHeight?: number;
};

const modes = ['mobile', 'desktop'] as const satisfies TypographyMode[];

function getTypographyStyle(mode: TypographyMode, name: string): TypographyStyle | undefined {
  const style = typographies[mode][name as keyof (typeof typographies)[typeof mode]];
  return typeof style === 'object' && !Array.isArray(style) ? style : undefined;
}

function getFontWeight(style: TypographyStyle | undefined) {
  if (style?.fontWeight) return String(style.fontWeight);

  const family = style?.fontFamily ?? '';
  const numericWeight = family.match(/_(\d{3})/)?.[1];
  if (numericWeight) return numericWeight;

  if (family.includes('Bold')) return '700';
  if (family.includes('SemiBold')) return '600';
  if (family.includes('Medium')) return '500';
  if (family.includes('Regular')) return '400';
  if (family.includes('Light')) return '300';

  return '—';
}

function formatPx(value: number | undefined) {
  return typeof value === 'number' ? `${value}px` : '—';
}

const typographyColumnFlex = {
  preview: 38,
  tokenName: 34,
  fontWeight: 10,
  fontSize: 9,
  lineHeight: 9
} as const;

const typographyTableColumns = [
  { label: 'Preview', flex: typographyColumnFlex.preview },
  { label: 'Token name', flex: typographyColumnFlex.tokenName },
  { label: 'Font weight', flex: typographyColumnFlex.fontWeight },
  { label: 'Font size', flex: typographyColumnFlex.fontSize },
  { label: 'Line height', flex: typographyColumnFlex.lineHeight }
] satisfies SbTableColumn[];

const typographyUsageColumnFlex = {
  tokenName: 33,
  description: 67
} as const;

const typographyUsageTableColumns = [
  { label: 'Token name', flex: typographyUsageColumnFlex.tokenName },
  { label: 'Description', flex: typographyUsageColumnFlex.description }
] satisfies SbTableColumn[];

const typographyGroups = [
  { label: 'Heading', prefix: 'heading-' },
  { label: 'Paragraph', prefix: 'paragraph-' },
  { label: 'Label', prefix: 'label-' },
  { label: 'Numeric', prefix: 'numeric-' }
] as const;

function TypographyModeSelect({
  mode,
  onChange
}: {
  mode: TypographyMode;
  onChange: (mode: TypographyMode) => void;
}) {
  const t = useTheme();

  return (
    <View
      style={{
        alignSelf: 'flex-end',
        backgroundColor: t.color.background.neutral.subtle,
        borderColor: t.color.border.neutral.subtle,
        borderRadius: theme.radius.sm,
        borderWidth: theme.stroke.sm,
        flexDirection: 'row',
        overflow: 'hidden'
      }}
    >
      {modes.map((option) => {
        const selected = option === mode;

        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option)}
            style={{
              backgroundColor: selected
                ? t.color.background.neutral.default
                : t.color.background.neutral.subtle,
              minWidth: 96,
              paddingHorizontal: theme.space['300'],
              paddingVertical: theme.space['200']
            }}
          >
            <Text
              style={[
                sbTypography['label-m-strong'],
                {
                  color: selected
                    ? t.color.text.neutral.primary
                    : t.color.text.neutral.secondary,
                  textAlign: 'center'
                }
              ]}
            >
              {option === 'mobile' ? 'Mobile' : 'Desktop'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function TypographyCatalog({ entries }: TypographyCatalogProps) {
  const [mode, setMode] = useState<TypographyMode>('mobile');
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['400'], width: '100%' }}>
      <TypographyModeSelect mode={mode} onChange={setMode} />

      <SbTable columns={typographyTableColumns} minWidth="lg">
        {typographyGroups.map((group) => {
          const groupEntries = entries.filter((entry) => entry.name.startsWith(group.prefix));

          return (
            <Fragment key={group.label}>
              <SbTableGroupRow label={group.label} />
              {groupEntries.map((entry) => {
                const style = getTypographyStyle(mode, entry.name);
                const sample = entry.name.startsWith('numeric-') ? '123456790' : 'This is Greenstand.';

                return (
                  <SbTableRow key={entry.name}>
                    <SbTableCell flex={typographyColumnFlex.preview}>
                      {style ? (
                        <Text style={[style, { color: t.color.text.neutral.primary }]}>{sample}</Text>
                      ) : (
                        <Text style={[sbTypography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
                          —
                        </Text>
                      )}
                    </SbTableCell>
                    <SbTableCell flex={typographyColumnFlex.tokenName} justifyContent="center">
                      <InlineCode size="mono-body-m">{`typography.${entry.name}`}</InlineCode>
                    </SbTableCell>
                    <SbTableCell flex={typographyColumnFlex.fontWeight} justifyContent="center">
                      <Text style={[sbTypography['paragraph-s'], { color: t.color.text.neutral.primary }]}>
                        {getFontWeight(style)}
                      </Text>
                    </SbTableCell>
                    <SbTableCell flex={typographyColumnFlex.fontSize} justifyContent="center">
                      <Text style={[sbTypography['paragraph-s'], { color: t.color.text.neutral.primary }]}>
                        {formatPx(style?.fontSize)}
                      </Text>
                    </SbTableCell>
                    <SbTableCell flex={typographyColumnFlex.lineHeight} justifyContent="center">
                      <Text style={[sbTypography['paragraph-s'], { color: t.color.text.neutral.primary }]}>
                        {formatPx(style?.lineHeight)}
                      </Text>
                    </SbTableCell>
                  </SbTableRow>
                );
              })}
            </Fragment>
          );
        })}
      </SbTable>
    </View>
  );
}

export function TypographyUsageTable({ entries }: TypographyCatalogProps) {
  const t = useTheme();

  return (
    <SbTable columns={typographyUsageTableColumns}>
      {entries.map((entry) => (
        <SbTableRow key={entry.name}>
          <SbTableCell flex={typographyUsageColumnFlex.tokenName} justifyContent="center">
            <InlineCode size="mono-body-m">{`typography.${entry.name}`}</InlineCode>
          </SbTableCell>
          <SbTableCell flex={typographyUsageColumnFlex.description} justifyContent="center">
            <Text style={[sbTypography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
              {entry.description ?? '—'}
            </Text>
          </SbTableCell>
        </SbTableRow>
      ))}
    </SbTable>
  );
}
