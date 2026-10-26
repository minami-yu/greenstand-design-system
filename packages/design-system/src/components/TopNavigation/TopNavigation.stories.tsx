import type { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StorybookNavigationCanvas,
  StorybookNavigationPreviewFrame,
  StorybookStoryShell,
  StorybookVariantCatalog,
  StorybookVariantCell,
  StorybookVariantRow,
  storybookNavigationPreviewWidths,
  type StorybookNavigationPreviewWidth
} from '../../storybook/ui';
import { storybookDocsArgTypesInclude } from '../../storybook/storybookArgTypes';
import { storybookPlaygroundParameters } from '../../storybook/storybookPageParameters';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { TopNavigation, type TopNavigationProps } from './TopNavigation';

type LeftControl = 'back' | 'close' | 'label' | 'logo' | 'treetrackerLogo';
type CenterControl = 'label' | 'labelAvatar' | 'none';
type RightControl = 'info' | 'language' | 'menu' | 'menuInfo' | 'menuLanguage' | 'none' | 'notification';
type LogoVariantControl = 'default' | 'neutral' | 'original' | 'white';
type TreetrackerLogoVariantControl = 'default' | 'white';

type TopNavigationStoryArgs = TopNavigationProps & {
  badgeValue: string;
  centerLabel: string;
  centerVariantType: CenterControl;
  leftLabel: string;
  leftLogoVariant: LogoVariantControl;
  leftTreetrackerLogoVariant: TreetrackerLogoVariantControl;
  leftVariantType: LeftControl;
  previewWidth: StorybookNavigationPreviewWidth;
  rightVariantType: RightControl;
};

const leftVariantExamples: Array<{
  label: string;
  variant: NonNullable<TopNavigationProps['leftVariant']>;
}> = [
  { label: 'Back', variant: { type: 'back', accessibilityLabel: 'Back' } },
  { label: 'Close', variant: { type: 'close', accessibilityLabel: 'Close' } },
  {
    label: 'Greenstand logo',
    variant: { type: 'logo', logoVariant: 'default', accessibilityLabel: 'Greenstand' }
  },
  { label: 'Label', variant: { type: 'label', label: 'Label' } },
  {
    label: 'Treetracker logo',
    variant: {
      type: 'treetrackerLogo',
      logoVariant: 'default',
      accessibilityLabel: 'Treetracker'
    }
  }
];

const centerVariantExamples: Array<{
  label: string;
  variant: NonNullable<TopNavigationProps['centerVariant']>;
}> = [
  { label: 'Label', variant: { type: 'label', label: 'Label' } },
  { label: 'Label + avatar', variant: { type: 'labelAvatar', label: 'Label' } }
];

const rightVariantExamples: Array<{
  label: string;
  variant: NonNullable<TopNavigationProps['rightVariant']>;
}> = [
  { label: 'Menu', variant: { type: 'menu', accessibilityLabel: 'Menu' } },
  { label: 'Info', variant: { type: 'info', accessibilityLabel: 'Info' } },
  { label: 'Language', variant: { type: 'language', accessibilityLabel: 'Language' } },
  { label: 'Menu + info', variant: { type: 'menuInfo' } },
  { label: 'Menu + language', variant: { type: 'menuLanguage' } },
  {
    label: 'Notification',
    variant: { type: 'notification', accessibilityLabel: 'Notifications' }
  }
];

const meta = {
  title: 'Components/TopNavigation',
  component: TopNavigation,
  args: {
    badgeValue: '3',
    centerLabel: 'Label',
    centerVariantType: 'none',
    leftLabel: 'Label',
    leftLogoVariant: 'default',
    leftTreetrackerLogoVariant: 'default',
    leftVariantType: 'logo',
    previewWidth: 360,
    rightVariantType: 'notification'
  },
  argTypes: {
    badgeValue: {
      control: 'text',
      description: 'Badge label for the notification right variant.',
      if: { arg: 'rightVariantType', eq: 'notification' },
      table: { category: 'Playground controls' }
    },
    centerLabel: {
      control: 'text',
      description: 'Label text for center label variants.',
      table: { category: 'Playground controls' }
    },
    centerVariantType: {
      control: 'select',
      description: 'Center variant selector for Playground.',
      options: ['none', 'label', 'labelAvatar'],
      table: { category: 'Playground controls' }
    },
    leftLabel: {
      control: 'text',
      description: 'Label text for the left label variant.',
      if: { arg: 'leftVariantType', eq: 'label' },
      table: { category: 'Playground controls' }
    },
    leftLogoVariant: {
      control: 'select',
      description: 'Greenstand logo variant for the left logo variant.',
      if: { arg: 'leftVariantType', eq: 'logo' },
      options: ['default', 'neutral', 'original', 'white'],
      table: { category: 'Playground controls' }
    },
    leftTreetrackerLogoVariant: {
      control: 'select',
      description: 'Treetracker logo variant for the left Treetracker variant.',
      if: { arg: 'leftVariantType', eq: 'treetrackerLogo' },
      options: ['default', 'white'],
      table: { category: 'Playground controls' }
    },
    leftVariantType: {
      control: 'select',
      description: 'Left variant selector for Playground.',
      options: ['back', 'close', 'logo', 'label', 'treetrackerLogo'],
      table: { category: 'Playground controls' }
    },
    previewWidth: {
      control: 'select',
      description: 'Storybook-only preview frame width.',
      options: storybookNavigationPreviewWidths,
      table: { category: 'Playground controls' }
    },
    rightVariantType: {
      control: 'select',
      description: 'Right variant selector for Playground.',
      options: ['none', 'menu', 'info', 'language', 'menuInfo', 'menuLanguage', 'notification'],
      table: { category: 'Playground controls' }
    },
    leftVariant: {
      description: 'Leading variant: back, close, logo, label, or Treetracker logo.',
      table: { disable: true, type: { summary: 'TopNavigationLeftVariant' } }
    },
    centerVariant: {
      description: 'Center variant: label or label plus avatar.',
      table: { disable: true, type: { summary: 'TopNavigationCenterVariant' } }
    },
    rightVariant: {
      description: 'Trailing variant: menu, info, language, combo actions, or notification.',
      table: { disable: true, type: { summary: 'TopNavigationRightVariant' } }
    }
  },
  parameters: storybookDocsArgTypesInclude([
    'leftVariantType',
    'leftLabel',
    'leftLogoVariant',
    'leftTreetrackerLogoVariant',
    'centerVariantType',
    'centerLabel',
    'rightVariantType',
    'badgeValue'
  ])
} satisfies Meta<TopNavigationStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: storybookPlaygroundParameters,
  render: ({
    badgeValue,
    centerLabel,
    centerVariantType,
    leftLabel,
    leftLogoVariant,
    leftTreetrackerLogoVariant,
    leftVariantType,
    previewWidth,
    rightVariantType
  }) => {
    const leftVariant = resolveLeftVariant({
      leftLabel,
      leftLogoVariant,
      leftTreetrackerLogoVariant,
      leftVariantType
    });
    const centerVariant = resolveCenterVariant({ centerLabel, centerVariantType });
    const rightVariant = resolveRightVariant({ badgeValue, rightVariantType });

    return (
      <StorybookStoryShell align="stretch">
        <StorybookNavigationCanvas>
          <StorybookNavigationPreviewFrame width={previewWidth}>
            <TopNavigation
              centerVariant={centerVariant}
              leftVariant={leftVariant}
              rightVariant={rightVariant}
            />
          </StorybookNavigationPreviewFrame>
        </StorybookNavigationCanvas>
      </StorybookStoryShell>
    );
  }
};

function resolveLeftVariant({
  leftLabel,
  leftLogoVariant,
  leftTreetrackerLogoVariant,
  leftVariantType
}: Pick<
  TopNavigationStoryArgs,
  'leftLabel' | 'leftLogoVariant' | 'leftTreetrackerLogoVariant' | 'leftVariantType'
>): TopNavigationProps['leftVariant'] {
  switch (leftVariantType) {
    case 'back':
      return { type: 'back', accessibilityLabel: 'Back' };
    case 'close':
      return { type: 'close', accessibilityLabel: 'Close' };
    case 'label':
      return { type: 'label', label: leftLabel };
    case 'treetrackerLogo':
      return {
        type: 'treetrackerLogo',
        accessibilityLabel: 'Treetracker',
        logoVariant: leftTreetrackerLogoVariant
      };
    case 'logo':
    default:
      return {
        type: 'logo',
        accessibilityLabel: 'Greenstand',
        logoVariant: leftLogoVariant
      };
  }
}

function resolveCenterVariant({
  centerLabel,
  centerVariantType
}: Pick<TopNavigationStoryArgs, 'centerLabel' | 'centerVariantType'>): TopNavigationProps['centerVariant'] {
  switch (centerVariantType) {
    case 'label':
      return { type: 'label', label: centerLabel };
    case 'labelAvatar':
      return { type: 'labelAvatar', label: centerLabel };
    case 'none':
    default:
      return undefined;
  }
}

function resolveRightVariant({
  badgeValue,
  rightVariantType
}: Pick<TopNavigationStoryArgs, 'badgeValue' | 'rightVariantType'>): TopNavigationProps['rightVariant'] {
  switch (rightVariantType) {
    case 'menu':
      return { type: 'menu', accessibilityLabel: 'Menu' };
    case 'info':
      return { type: 'info', accessibilityLabel: 'Info' };
    case 'language':
      return { type: 'language', accessibilityLabel: 'Language' };
    case 'menuInfo':
      return { type: 'menuInfo' };
    case 'menuLanguage':
      return { type: 'menuLanguage' };
    case 'notification':
      return {
        type: 'notification',
        accessibilityLabel: 'Notifications',
        badgeValue
      };
    case 'none':
    default:
      return undefined;
  }
}

export const HomeHeader: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="stretch">
      <StorybookNavigationCanvas>
        <StorybookNavigationPreviewFrame>
          <TopNavigation
            leftVariant={{
              type: 'logo',
              logoVariant: 'default',
              accessibilityLabel: 'Greenstand'
            }}
            rightVariant={{
              type: 'notification',
              accessibilityLabel: 'Notifications',
              badgeValue: '3'
            }}
          />
        </StorybookNavigationPreviewFrame>
      </StorybookNavigationCanvas>
    </StorybookStoryShell>
  )
};

export const PlatformHeaderPreview: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="stretch">
      <StorybookNavigationCanvas>
        <StorybookVariantRow gap="md">
          <StorybookVariantCell label="Android" labelPosition="below">
            <StorybookNavigationPreviewFrame>
              <PlatformTopNavigationPreview platform="android" />
            </StorybookNavigationPreviewFrame>
          </StorybookVariantCell>
          <StorybookVariantCell label="iOS" labelPosition="below">
            <StorybookNavigationPreviewFrame>
              <PlatformTopNavigationPreview platform="ios" />
            </StorybookNavigationPreviewFrame>
          </StorybookVariantCell>
        </StorybookVariantRow>
      </StorybookNavigationCanvas>
    </StorybookStoryShell>
  )
};

function PlatformTopNavigationPreview({ platform }: { platform: 'android' | 'ios' }) {
  return (
    <View>
      <PlatformChrome platform={platform} />
      <TopNavigation
        leftVariant={{
          type: 'logo',
          logoVariant: 'default',
          accessibilityLabel: 'Greenstand'
        }}
        rightVariant={{
          type: 'notification',
          accessibilityLabel: 'Notifications',
          badgeValue: '3'
        }}
      />
    </View>
  );
}

function PlatformChrome({ platform }: { platform: 'android' | 'ios' }) {
  const t = useTheme();
  const isAndroid = platform === 'android';

  return (
    <View
      style={[
        styles.platformChrome,
        {
          backgroundColor: t.color.fill.neutral.surface,
          height: isAndroid ? theme.size['1000'] : theme.size['1200'] + theme.space['150']
        }
      ]}
    >
      {isAndroid ? (
        <>
          <Text style={[styles.androidTime, { color: t.color.icon.neutral.primary }]}>
            9:30
          </Text>
          <View style={[styles.androidCamera, { backgroundColor: t.color.icon.neutral.primary }]} />
          <StatusLevels />
        </>
      ) : (
        <>
          <View style={styles.iosSide}>
            <Text style={[styles.iosTime, { color: t.color.icon.neutral.primary }]}>
              9:41
            </Text>
          </View>
          <View style={[styles.iosSide, styles.iosLevels]}>
            <StatusLevels />
          </View>
        </>
      )}
    </View>
  );
}

function StatusLevels() {
  const t = useTheme();

  return (
    <View style={styles.statusLevels}>
      <View style={styles.signalBars}>
        <View style={[styles.signalBar, { backgroundColor: t.color.icon.neutral.primary, height: theme.space['100'] }]} />
        <View style={[styles.signalBar, { backgroundColor: t.color.icon.neutral.primary, height: theme.space['150'] }]} />
        <View style={[styles.signalBar, { backgroundColor: t.color.icon.neutral.primary, height: theme.space['200'] }]} />
      </View>
      <View style={[styles.wifiDot, { backgroundColor: t.color.icon.neutral.primary }]} />
      <View style={[styles.battery, { borderColor: t.color.icon.neutral.primary }]}>
        <View style={[styles.batteryFill, { backgroundColor: t.color.icon.neutral.primary }]} />
      </View>
    </View>
  );
}

export const LeftVariants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="stretch">
      <StorybookNavigationCanvas>
        <StorybookVariantCatalog gap="md">
          {leftVariantExamples.map(({ label, variant }) => (
            <StorybookVariantCell key={label} label={label} labelPosition="below">
              <StorybookNavigationPreviewFrame>
                <TopNavigation
                  centerVariant={{ type: 'label', label: 'Label' }}
                  leftVariant={variant}
                  rightVariant={{ type: 'menu', accessibilityLabel: 'Menu' }}
                />
              </StorybookNavigationPreviewFrame>
            </StorybookVariantCell>
          ))}
        </StorybookVariantCatalog>
      </StorybookNavigationCanvas>
    </StorybookStoryShell>
  )
};

export const CenterVariants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="stretch">
      <StorybookNavigationCanvas>
        <StorybookVariantCatalog gap="md">
          {centerVariantExamples.map(({ label, variant }) => (
            <StorybookVariantCell key={label} label={label} labelPosition="below">
              <StorybookNavigationPreviewFrame>
                <TopNavigation
                  centerVariant={variant}
                  leftVariant={{ type: 'back', accessibilityLabel: 'Back' }}
                  rightVariant={{ type: 'menu', accessibilityLabel: 'Menu' }}
                />
              </StorybookNavigationPreviewFrame>
            </StorybookVariantCell>
          ))}
        </StorybookVariantCatalog>
      </StorybookNavigationCanvas>
    </StorybookStoryShell>
  )
};

export const LogoVariants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="stretch">
      <StorybookNavigationCanvas>
        <StorybookVariantRow gap="md">
          <StorybookVariantCell label="Greenstand neutral" labelPosition="below">
            <StorybookNavigationPreviewFrame>
              <TopNavigation
                leftVariant={{
                  type: 'logo',
                  logoVariant: 'neutral',
                  accessibilityLabel: 'Greenstand'
                }}
                rightVariant={{ type: 'menu', accessibilityLabel: 'Menu' }}
              />
            </StorybookNavigationPreviewFrame>
          </StorybookVariantCell>
          <StorybookVariantCell label="Treetracker" labelPosition="below">
            <StorybookNavigationPreviewFrame>
              <TopNavigation
                leftVariant={{
                  type: 'treetrackerLogo',
                  logoVariant: 'default',
                  accessibilityLabel: 'Treetracker'
                }}
                rightVariant={{
                  type: 'notification',
                  accessibilityLabel: 'Notifications'
                }}
              />
            </StorybookNavigationPreviewFrame>
          </StorybookVariantCell>
        </StorybookVariantRow>
      </StorybookNavigationCanvas>
    </StorybookStoryShell>
  )
};

export const RightVariants: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: () => (
    <StorybookStoryShell align="stretch">
      <StorybookNavigationCanvas>
        <StorybookVariantCatalog gap="md">
          {rightVariantExamples.map(({ label, variant }) => (
            <StorybookVariantCell key={label} label={label} labelPosition="below">
              <StorybookNavigationPreviewFrame>
                <TopNavigation
                  centerVariant={{ type: 'label', label: 'Label' }}
                  leftVariant={{ type: 'logo', logoVariant: 'default', accessibilityLabel: 'Greenstand' }}
                  rightVariant={variant}
                />
              </StorybookNavigationPreviewFrame>
            </StorybookVariantCell>
          ))}
        </StorybookVariantCatalog>
      </StorybookNavigationCanvas>
    </StorybookStoryShell>
  )
};

const styles = StyleSheet.create({
  platformChrome: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space['400'],
    position: 'relative',
    width: '100%'
  },
  androidTime: {
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 20
  },
  androidCamera: {
    borderRadius: theme.radius.full,
    height: theme.icon.lg,
    left: '50%',
    marginLeft: theme.space.n300,
    position: 'absolute',
    width: theme.icon.lg
  },
  iosSide: {
    alignItems: 'center',
    height: theme.size['1200'] + theme.space['150'],
    justifyContent: 'center',
    width: 140.5
  },
  iosLevels: {
    alignItems: 'flex-end',
    paddingRight: theme.space['200']
  },
  iosTime: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22
  },
  statusLevels: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space['100']
  },
  signalBars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.space['050'],
    height: theme.space['200']
  },
  signalBar: {
    borderRadius: theme.radius.full,
    width: theme.space['050']
  },
  wifiDot: {
    borderRadius: theme.radius.full,
    height: theme.space['100'],
    width: theme.space['100']
  },
  battery: {
    borderRadius: theme.radius.sm,
    borderWidth: theme.border.sm,
    height: theme.space['200'],
    padding: theme.space['050'],
    width: theme.space['400']
  },
  batteryFill: {
    borderRadius: theme.radius.sm,
    flex: 1,
    width: '70%'
  }
});
