import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import type { IconColor } from '../Icon/resolveIconColor';
import { theme, type ThemeMode, type themes } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

export type BannerTone = 'warning' | 'error' | 'success' | 'info' | 'neutral';

export type BannerProps = Omit<PressableProps, 'children'> & {
  fullWidth?: boolean;
  leadingIcon?: IconName;
  message: string;
  showTrailingIcon?: boolean;
  title?: string;
  tone?: BannerTone;
};

type ThemeTokens = (typeof themes)[ThemeMode];

const leadingIcons: Record<BannerTone, IconName> = {
  warning: 'alert',
  error: 'error',
  success: 'check-circle',
  info: 'information',
  neutral: 'offline'
};

function getBannerColors(t: ThemeTokens, tone: BannerTone, fullWidth: boolean) {
  if (!fullWidth) {
    const backgroundColor = {
      warning: t.color.fill.warning.default,
      error: t.color.fill.error.subtle,
      success: t.color.fill.success.subtle,
      info: t.color.fill.info.default,
      neutral: t.color.fill.neutral.default
    }[tone];
    const iconColor: IconColor = tone === 'neutral' ? 'neutral.primary' : `${tone}.default`;
    return { backgroundColor, iconColor, textColor: t.color.text.neutral.primary };
  }

  const backgroundColor = {
    warning: t.color.fill.warning.emphasis,
    error: t.color.fill.error.emphasis,
    success: t.color.fill.success.emphasis,
    info: t.color.fill.info.emphasis,
    neutral: t.color.fill.neutral.inverse
  }[tone];
  const iconColor: IconColor = tone === 'neutral' ? 'neutral.inverse' : `${tone}.onEmphasis`;
  const textColor = tone === 'neutral'
    ? t.color.text.neutral.inverse
    : t.color.text[tone].onEmphasis;
  return { backgroundColor, iconColor, textColor };
}

export function Banner({
  accessibilityLabel,
  fullWidth = false,
  leadingIcon,
  message,
  onPress,
  showTrailingIcon = true,
  style,
  title,
  tone = 'warning',
  ...props
}: BannerProps) {
  const t = useTheme();
  const colors = getBannerColors(t, tone, fullWidth);

  return (
    <Pressable
      {...props}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={state => [
        styles.banner,
        fullWidth ? styles.fullWidth : styles.contained,
        { backgroundColor: colors.backgroundColor },
        typeof style === 'function' ? style(state) : style
      ]}
    >
      <View style={styles.leadingIcon}>
        <Icon color={colors.iconColor} name={leadingIcon ?? leadingIcons[tone]} size="md" />
      </View>
      <View style={styles.content}>
        {title ? <Text style={[t.typography.labelMStrong, { color: colors.textColor }]}>{title}</Text> : null}
        <Text style={[t.typography.paragraphS, { color: colors.textColor }]}>{message}</Text>
      </View>
      {showTrailingIcon ? <Icon color={colors.iconColor} name="chevron-right" size="md" /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: theme.space['200'],
    width: '100%'
  },
  contained: {
    borderRadius: theme.radius.md,
    padding: theme.space['300']
  },
  content: {
    flex: 1,
    gap: theme.space['050'],
    justifyContent: 'center',
    minWidth: theme.size['0']
  },
  fullWidth: {
    borderRadius: theme.radius.none,
    paddingHorizontal: theme.space['400'],
    paddingVertical: theme.space['300']
  },
  leadingIcon: {
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  }
});
