import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StorybookStoryShell,
  StorybookVariantCatalog,
  StorybookVariantCell,
  StorybookVariantRow
} from '../../storybook/ui';
import {
  storybookDocsArgTypesInclude,
  storybookQuotedUnion
} from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { BottomSheet, type BottomSheetProps } from './BottomSheet';
import { BottomSheetModal } from './BottomSheetModal';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const titleAlignOptions = ['left', 'center'] as const;

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  args: {
    bottomPadding: 0,
    modal: false,
    showCloseButton: true,
    showHandle: true,
    showTitle: true,
    title: 'Lost connection',
    titleAlign: 'center'
  },
  argTypes: {
    bottomPadding: {
      control: { type: 'number', min: 0 },
      description: 'Optional inset override for previews. Automatic device inset and space[400] minimum clearance always apply.',
      table: { type: { summary: 'number' } }
    },
    modal: {
      control: 'boolean',
      description: 'Shows the sheet inside the neutral overlay treatment from the modal variant.',
      table: { type: { summary: 'boolean' } }
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Shows the trailing close icon button in the header.',
      table: { type: { summary: 'boolean' } }
    },
    showHandle: {
      control: 'boolean',
      description: 'Shows the centered drag handle.',
      table: { type: { summary: 'boolean' } }
    },
    showTitle: {
      control: 'boolean',
      description: 'Shows the heading slot.',
      table: { type: { summary: 'boolean' } }
    },
    title: {
      control: 'text',
      description: 'Heading text.',
      table: { type: { summary: 'string' } }
    },
    titleAlign: {
      control: 'select',
      description: 'Heading alignment variant.',
      options: titleAlignOptions,
      table: { type: { summary: storybookQuotedUnion(titleAlignOptions) } }
    },
    children: {
      control: false,
      description: 'Scrollable or static body content supplied by the app.',
      table: { type: { summary: 'ReactNode' } }
    },
    footer: {
      control: false,
      description: 'Persistent actions below the scrolling body and above the bottom safe area.',
      table: { type: { summary: 'ReactNode' } }
    },
    onClose: {
      control: false,
      description: 'Called when the close button is pressed.',
      table: { type: { summary: 'PressableProps["onPress"]' } }
    }
  },
  parameters: storybookDocsArgTypesInclude([
    'bottomPadding',
    'title',
    'titleAlign',
    'modal',
    'showTitle',
    'showHandle',
    'showCloseButton',
    'children',
    'footer',
    'onClose'
  ])
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    showTitle: false
  },

  parameters: storybookPlaygroundParameters,

  render: (args) => (
    <StorybookStoryShell align="center">
      <BottomSheetPreview {...args} />
    </StorybookStoryShell>
  )
};

export const AnimatedModal: Story = {
  render: (args) => <AnimatedExample {...args} />
};

export const StickyFooter: Story = {
  render: (args) => <StickyFooterExample {...args} />
};

function StickyFooterExample(args: BottomSheetProps) {
  const t = useTheme();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  return <StorybookStoryShell align="center">
    <Button label="Show scrollable sheet" onPress={() => setVisible(true)} />
    <BottomSheetModal {...args} visible={visible} onClose={() => setVisible(false)} title="Filter" titleAlign="left" showTitle
      footer={<View style={{ flexDirection: 'row', gap: theme.space['200'] }}>
        <Button label="Reset" variant="tertiary" style={{ flex: 1 }} onPress={() => setCount(0)} />
        <Button label={`Apply (${count})`} style={{ flex: 1 }} onPress={() => setVisible(false)} />
      </View>}>
      <View style={{ gap: theme.space['400'] }}>
        {Array.from({ length: 20 }, (_, index) => <View key={index} style={{ gap: theme.space['200'] }}>
          <Text style={[t.typography.labelM, { color: t.color.text.neutral.primary }]}>Filter group {index + 1}</Text>
          <Button label="Select option" variant="secondary" onPress={() => setCount(value => value + 1)} />
        </View>)}
      </View>
    </BottomSheetModal>
  </StorybookStoryShell>;
}

function AnimatedExample(args: BottomSheetProps) {
  const [visible, setVisible] = useState(false);
  return (
    <StorybookStoryShell align="center">
      <Button label="Show bottom sheet" onPress={() => setVisible(true)} />
      <BottomSheetModal {...args} visible={visible} onClose={() => setVisible(false)} showTitle={false}>
        <PreviewContent showTitle title={args.title ?? 'Lost connection'} titleAlign="center" onDismiss={() => setVisible(false)} />
      </BottomSheetModal>
    </StorybookStoryShell>
  );
}

export const Variants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="center">
      <StorybookVariantCatalog align="center" gap="lg">
        <StorybookVariantRow gap="md">
          <StorybookVariantCell label="Left title" labelPosition="below">
            <BottomSheetPreview titleAlign="left" />
          </StorybookVariantCell>
          <StorybookVariantCell label="Modal left title" labelPosition="below">
            <BottomSheetPreview modal titleAlign="left" />
          </StorybookVariantCell>
        </StorybookVariantRow>
        <StorybookVariantRow gap="md">
          <StorybookVariantCell label="Center title" labelPosition="below">
            <BottomSheetPreview titleAlign="center" />
          </StorybookVariantCell>
          <StorybookVariantCell label="Modal center title" labelPosition="below">
            <BottomSheetPreview modal titleAlign="center" />
          </StorybookVariantCell>
        </StorybookVariantRow>
      </StorybookVariantCatalog>
    </StorybookStoryShell>
  )
};

function BottomSheetPreview({
  modal = false,
  showTitle = true,
  title = 'Lost connection',
  titleAlign = 'center',
  onClose,
  ...props
}: BottomSheetProps) {
  const t = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <View
      style={[
        styles.preview,
        {
          backgroundColor: t.color.background.neutral.base,
          borderColor: t.color.border.neutral.default
        }
      ]}
    >
      <View style={styles.phoneContent}>
        <Text style={[t.typography.labelM, { color: t.color.text.neutral.primary }]}>9:41</Text>
        <Text style={[t.typography.headingM, { color: t.color.text.neutral.primary }]}>My trees</Text>
        <View style={[styles.uploadSummary, { backgroundColor: t.color.fill.brand.subtle }]}>
          <Icon name="progress-upload" size="lg" />
          <Text style={[t.typography.labelM, { color: t.color.text.neutral.primary }]}>12 waiting to upload</Text>
        </View>
        <Button label="Upload" leadingIcon="cloud-upload-outline" onPress={() => setOpen(true)} />
      </View>
      {open ? (
        <View pointerEvents="box-none" style={styles.sheetLayer}>
          <BottomSheet
            {...props}
            modal={modal}
            showTitle={showTitle}
            title={title}
            titleAlign={titleAlign}
            onClose={(event) => { setOpen(false); onClose?.(event); }}
          >
            <PreviewContent showTitle={!showTitle} title={title} titleAlign={titleAlign} onDismiss={() => setOpen(false)} />
          </BottomSheet>
        </View>
      ) : null}
    </View>
  );
}

function PreviewContent({ showTitle, title, titleAlign, onDismiss }: {
  showTitle: boolean;
  title: string;
  titleAlign: BottomSheetProps['titleAlign'];
  onDismiss: () => void;
}) {
  const t = useTheme();

  return (
    <View style={styles.previewContent}>
      <Icon name="offline" size="3xl" color="neutral.tertiary" />
      {showTitle ? <Text accessibilityRole="header" style={[t.typography.headingM, { color: t.color.text.neutral.primary, textAlign: titleAlign, width: '100%' }]}>{title}</Text> : null}
      <Text style={[t.typography.paragraphM, styles.previewText, { color: t.color.text.neutral.secondary }]}>
        Try uploading again when you're back online.
      </Text>
      <Button label="Got it" leadingIcon="check" onPress={onDismiss} style={styles.confirmButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    height: 720,
    maxWidth: '100%',
    borderWidth: theme.border.sm,
    borderRadius: theme.radius.xl,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: 360
  },
  previewContent: {
    alignItems: 'center',
    gap: theme.space['400'],
    paddingTop: theme.space['200'],
    width: '100%'
  },
  confirmButton: {
    alignSelf: 'stretch',
    marginTop: theme.space['800']
  },
  phoneContent: {
    flex: 1,
    padding: theme.space['400'],
    gap: theme.space['600']
  },
  uploadSummary: {
    padding: theme.space['400'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space['200']
  },
  sheetLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
  },
  previewText: {
    textAlign: 'center'
  }
});
