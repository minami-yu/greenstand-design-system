import { Fragment, useState } from 'react';
import { Text, View } from 'react-native';
import { theme, typographies, type TypographyMode } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import {
  InlineCode,
  StorybookSegmentedToggle,
  StorybookTable,
  StorybookTableCell,
  StorybookTableGroupRow,
  StorybookTableRow,
  storybookRnTypography,
  type StorybookTableColumn,
  type TokenCatalogEntry
} from '../../ui';
import { CatalogThemeProvider } from '../../ui/CatalogThemeProvider';

type TypographyCatalogProps = {
  entries: TokenCatalogEntry[];
};

type TypographyStyle = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  lineHeight?: number;
};

const typographyModeOptions = [
  { accessibilityLabel: 'Mobile typography', label: 'Mobile', value: 'mobile' },
  { accessibilityLabel: 'Desktop typography', label: 'Desktop', value: 'desktop' }
] as const satisfies readonly { accessibilityLabel: string; label: string; value: TypographyMode }[];

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
] satisfies StorybookTableColumn[];

const typographyUsageColumnFlex = {
  tokenName: 33,
  description: 67
} as const;

const typographyUsageTableColumns = [
  { label: 'Token name', flex: typographyUsageColumnFlex.tokenName },
  { label: 'Description', flex: typographyUsageColumnFlex.description }
] satisfies StorybookTableColumn[];

const typographyGroups = [
  { label: 'Heading', prefix: 'heading-' },
  { label: 'Paragraph', prefix: 'paragraph-' },
  { label: 'Label', prefix: 'label-' },
  { label: 'Numeric', prefix: 'numeric-' }
] as const;

export function TypographyCatalog({ entries }: TypographyCatalogProps) {
  return (
    <CatalogThemeProvider>
      <TypographyCatalogView entries={entries} />
    </CatalogThemeProvider>
  );
}

function TypographyCatalogView({ entries }: TypographyCatalogProps) {
  const [mode, setMode] = useState<TypographyMode>('mobile');
  const t = useTheme();

  return (
    <View style={{ gap: theme.space['400'], width: '100%' }}>
      <StorybookSegmentedToggle
        marginTop="0"
        onChange={setMode}
        options={typographyModeOptions}
        value={mode}
      />

      <StorybookTable columns={typographyTableColumns} minWidth="lg">
        {typographyGroups.map((group) => {
          const groupEntries = entries.filter((entry) => entry.name.startsWith(group.prefix));

          return (
            <Fragment key={group.label}>
              <StorybookTableGroupRow label={group.label} />
              {groupEntries.map((entry) => {
                const style = getTypographyStyle(mode, entry.name);
                const sample = entry.name.startsWith('numeric-') ? '123456790' : 'The quick brown fox';

                return (
                  <StorybookTableRow key={entry.name}>
                    <StorybookTableCell flex={typographyColumnFlex.preview}>
                      {style ? (
                        <Text style={[style, { color: t.color.text.neutral.primary }]}>{sample}</Text>
                      ) : (
                        <Text style={[storybookRnTypography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
                          —
                        </Text>
                      )}
                    </StorybookTableCell>
                    <StorybookTableCell flex={typographyColumnFlex.tokenName} justifyContent="center">
                      <InlineCode size="mono-body-s">{`typography.${entry.name}`}</InlineCode>
                    </StorybookTableCell>
                    <StorybookTableCell flex={typographyColumnFlex.fontWeight} justifyContent="center">
                      <Text style={[storybookRnTypography['paragraph-s'], { color: t.color.text.neutral.primary }]}>
                        {getFontWeight(style)}
                      </Text>
                    </StorybookTableCell>
                    <StorybookTableCell flex={typographyColumnFlex.fontSize} justifyContent="center">
                      <Text style={[storybookRnTypography['paragraph-s'], { color: t.color.text.neutral.primary }]}>
                        {formatPx(style?.fontSize)}
                      </Text>
                    </StorybookTableCell>
                    <StorybookTableCell flex={typographyColumnFlex.lineHeight} justifyContent="center">
                      <Text style={[storybookRnTypography['paragraph-s'], { color: t.color.text.neutral.primary }]}>
                        {formatPx(style?.lineHeight)}
                      </Text>
                    </StorybookTableCell>
                  </StorybookTableRow>
                );
              })}
            </Fragment>
          );
        })}
      </StorybookTable>
    </View>
  );
}

export function TypographyUsageTable({ entries }: TypographyCatalogProps) {
  return (
    <CatalogThemeProvider>
      <TypographyUsageTableView entries={entries} />
    </CatalogThemeProvider>
  );
}

function TypographyUsageTableView({ entries }: TypographyCatalogProps) {
  const t = useTheme();

  return (
    <StorybookTable columns={typographyUsageTableColumns}>
      {entries.map((entry) => (
        <StorybookTableRow key={entry.name}>
          <StorybookTableCell flex={typographyUsageColumnFlex.tokenName} justifyContent="center">
            <InlineCode size="mono-body-s">{`typography.${entry.name}`}</InlineCode>
          </StorybookTableCell>
          <StorybookTableCell flex={typographyUsageColumnFlex.description} justifyContent="center">
            <Text style={[storybookRnTypography['paragraph-s'], { color: t.color.text.neutral.secondary }]}>
              {entry.description ?? '—'}
            </Text>
          </StorybookTableCell>
        </StorybookTableRow>
      ))}
    </StorybookTable>
  );
}
