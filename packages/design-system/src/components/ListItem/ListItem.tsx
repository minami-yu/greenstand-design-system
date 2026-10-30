import type { ReactNode } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View, type ImageSourcePropType, type ImageStyle, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { Avatar } from '../Avatar/Avatar';
import { Badge, type BadgeProps } from '../Badge/Badge';
import { CheckInput } from '../CheckInput/CheckInput';
import { Divider } from '../Divider/Divider';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/icons';
import { RadioButton } from '../RadioGroup/RadioButton';
import { Switch } from '../Switch/Switch';

export type ListItemSize = 'md' | 'lg';
export type ListItemLeadingElement = 'none' | 'icon' | 'avatar' | 'thumbnail';
export type ListItemTrailingElement = 'none' | 'icon' | 'checkInput' | 'radioButton' | 'switch' | 'text' | 'badge' | 'badgeAndText';
export type ListItemProps = Omit<PressableProps, 'children' | 'style' | 'onPress'> & {
  label: string;
  labelNumberOfLines?: number;
  labelAccessory?: ReactNode;
  size?: ListItemSize;
  tone?: 'default' | 'destructive';
  paragraph?: string;
  showParagraph?: boolean;
  showDivider?: boolean;
  leadingElement?: ListItemLeadingElement;
  leadingIcon?: IconName;
  avatarSource?: ImageSourcePropType;
  avatarInitial?: string;
  avatarSize?: 'sm' | 'md';
  thumbnailSource?: ImageSourcePropType;
  thumbnailImageStyle?: StyleProp<ImageStyle>;
  trailingElement?: ListItemTrailingElement;
  trailingIcon?: IconName;
  caption?: string;
  badgeValue?: string;
  badgeType?: BadgeProps['type'];
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  onPress?: PressableProps['onPress'];
  style?: StyleProp<ViewStyle>;
};

/** Figma ListItem: inset divider, optional artwork, and one trailing element. */
export function ListItem({
  label, labelNumberOfLines, labelAccessory, size = 'lg', tone = 'default', paragraph, showParagraph = true, showDivider = true,
  leadingElement = 'none', leadingIcon = 'heart-outline', avatarSource, avatarInitial, avatarSize,
  thumbnailSource, thumbnailImageStyle, trailingElement = 'none', trailingIcon = 'chevron-right',
  caption = 'Caption', badgeValue = '1', badgeType = 'label', selected = false, onSelectedChange,
  onPress, disabled = false, style, accessibilityLabel, accessibilityState, ...props
}: ListItemProps) {
  const t = useTheme();
  // Figma only defines thumbnails on large rows. Never squeeze them into a medium row.
  const large = size === 'lg' || leadingElement === 'thumbnail';
  const control = trailingElement === 'checkInput' || trailingElement === 'radioButton' || trailingElement === 'switch';
  const interactive = control || Boolean(onPress);
  const height = large ? theme.size['1600'] : theme.size['1400'];
  const description = large && showParagraph ? paragraph : undefined;
  const role = control ? (trailingElement === 'checkInput' ? 'checkbox' : trailingElement === 'radioButton' ? 'radio' : 'switch') : 'button';
  const requestSelection = () => onSelectedChange?.(trailingElement === 'radioButton' ? true : !selected);
  // RN Web activates non-button roles with Enter, but needs an explicit Space handler.
  const keyboardProps: Pick<PressableProps, 'onKeyDown'> = Platform.OS === 'web' && control ? {
    onKeyDown: (event) => {
      if (event.nativeEvent.key === ' ' || event.nativeEvent.key === 'Spacebar') {
        event.preventDefault();
        if (!disabled && !event.nativeEvent.repeat) requestSelection();
      }
    }
  } : {};
  const captionStyle = [t.typography.labelS, { color: t.color.text.neutral.tertiary, textAlign: 'right' as const }];

  let trailing;
  switch (trailingElement) {
    case 'icon':
      trailing = <View style={styles.chevronSlot}><Icon name={trailingIcon} color="neutral.tertiary" size="md" style={styles.chevron} /></View>;
      break;
    case 'checkInput':
      trailing = <CheckInput selected={selected} disabled={disabled} accessible={false} focusable={false} tabIndex={-1} style={styles.controlTouchTarget} />;
      break;
    case 'radioButton':
      trailing = <RadioButton hideLabel selected={selected} disabled={disabled} accessible={false} focusable={false} tabIndex={-1} style={styles.controlTouchTarget} />;
      break;
    case 'switch':
      trailing = <Switch toggled={selected} disabled={disabled} accessible={false} focusable={false} tabIndex={-1} />;
      break;
    case 'text':
      trailing = <Text style={[captionStyle, styles.caption]}>{caption}</Text>;
      break;
    case 'badge':
      trailing = <Badge size="lg" type={badgeType} value={badgeValue} style={badgeType === 'dot' ? styles.notificationDot : undefined} />;
      break;
    case 'badgeAndText':
      trailing = <View style={[styles.badgeText, { gap: large ? theme.space['200'] : theme.space['100'] }]}>
        {showParagraph && <Text style={captionStyle}>{caption}</Text>}
        <Badge size={large ? 'lg' : 'md'} value={badgeValue} />
      </View>;
      break;
  }

  const content = <>
    {leadingElement !== 'none' && <View aria-hidden accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[
      styles.artwork,
      { paddingRight: theme.space['300'] },
      leadingElement === 'icon' && { paddingLeft: theme.space['100'] }
    ]}>
      {leadingElement === 'icon' && <Icon name={leadingIcon} size={large ? 'md' : 'lg'} color={disabled ? 'neutral.disabled' : tone === 'destructive' ? 'error.default' : 'neutral.primary'} />}
      {leadingElement === 'avatar' && <Avatar source={avatarSource} initial={avatarInitial ?? label} size={avatarSize ?? (large ? 'md' : 'sm')} />}
      {leadingElement === 'thumbnail' && <View style={[styles.thumbnail, { overflow: 'hidden' }]}><Image source={thumbnailSource} resizeMode={thumbnailImageStyle ? "stretch" : "cover"} style={[{ width: '100%', height: '100%' }, thumbnailImageStyle]} /></View>}
    </View>}
    <View style={styles.contentRow}>
      <View style={[styles.content, { minHeight: height }, trailingElement === 'none' && styles.noTrailing]}>
        <View style={[styles.text, { gap: large ? theme.space['050'] : theme.space['0'] }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.space['100'] }}><Text numberOfLines={labelNumberOfLines} style={[t.typography.labelM, labelNumberOfLines ? { flexShrink: 1 } : undefined, { color: disabled ? t.color.text.neutral.disabled : tone === 'destructive' ? t.color.text.error.default : t.color.text.neutral.primary }]}>{label}</Text>{labelAccessory}</View>
          {description ? <Text style={[t.typography.paragraphS, { color: disabled ? t.color.text.neutral.disabled : t.color.text.neutral.secondary }]}>{description}</Text> : null}
        </View>
        {trailing && <View
          pointerEvents={control ? 'none' : undefined}
          aria-hidden={control || undefined}
          accessibilityElementsHidden={control}
          importantForAccessibility={control ? 'no-hide-descendants' : 'auto'}
          style={[
            styles.trailing,
            (trailingElement === 'switch' || trailingElement === 'badge' || trailingElement === 'badgeAndText') && styles.paddedTrailing,
            trailingElement === 'icon' && { paddingLeft: theme.space['200'] },
            trailingElement === 'text' && { paddingRight: theme.space['200'] }
          ]}>{trailing}</View>}
      </View>
      {showDivider && <Divider style={styles.divider} />}
    </View>
  </>;

  if (!interactive) {
    return <View {...props} accessibilityLabel={accessibilityLabel} style={[styles.root, style]}>{content}</View>;
  }
  return <Pressable {...props} {...keyboardProps}
    accessibilityRole={role}
    aria-checked={control ? selected : undefined}
    aria-disabled={Boolean(disabled)}
    accessibilityLabel={accessibilityLabel ?? [label, description].filter(Boolean).join(', ')}
    accessibilityState={{ ...accessibilityState, disabled: Boolean(disabled), ...(control ? { checked: selected } : {}) }}
    disabled={disabled}
    onPress={event => {
      if (control) requestSelection();
      else onPress?.(event);
    }}
    style={[styles.root, style]}>
    {content}
  </Pressable>;
}

const styles = StyleSheet.create({
  notificationDot: { width: theme.size['200'], minWidth: theme.size['200'], height: theme.size['200'] },
  root: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' },
  artwork: { flexShrink: 0, justifyContent: 'center', alignSelf: 'stretch' },
  thumbnail: { width: theme.size['1200'], height: theme.size['1200'], borderRadius: theme.radius.sm },
  contentRow: { flex: 1, minWidth: theme.size['0'], alignSelf: 'stretch', justifyContent: 'center' },
  content: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1, minWidth: theme.size['0'], paddingRight: theme.space['100'], justifyContent: 'center' },
  noTrailing: { paddingRight: theme.space['100'] },
  trailing: { flexShrink: 0, alignItems: 'center', justifyContent: 'center' },
  paddedTrailing: { paddingHorizontal: theme.space['200'] },
  caption: { width: theme.size['1400'] },
  badgeText: { width: theme.size['1200'], alignItems: 'flex-end' },
  controlTouchTarget: { width: theme.size['1100'], height: theme.size['1100'] },
  chevronSlot: { width: theme.size['600'], height: theme.size['600'], alignItems: 'center', justifyContent: 'center' },
  chevron: { transform: [{ scale: theme.size['600'] / theme.icon.md }] },
  divider: { position: 'absolute', bottom: theme.space['0'] }
});
