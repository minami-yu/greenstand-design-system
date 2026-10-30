import { useState } from 'react';
import { Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { BottomSheetModal, ListItem, theme, useTheme } from '@greenstand/design-system';

export function AuthHelpSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const t = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState('');
  const copy = async (value: string) => {
    try { await Clipboard.setStringAsync(value); setFeedback('Copied to clipboard.'); }
    catch { setFeedback('Could not copy. Touch and hold the contact text to copy it.'); }
  };
  return <BottomSheetModal visible={visible} title="Need help?" onClose={onClose}>
    <View style={{ gap: theme.space['1200'] }}>
      <View style={{ gap: theme.space['200'] }}>
        <Text accessibilityRole="header" style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>FAQs</Text>
        <ListItem label="I cannot receive the message." showDivider={false} trailingElement="icon" trailingIcon={expanded ? 'chevron-up' : 'chevron-down'} accessibilityState={{ expanded }} onPress={() => setExpanded(value => !value)} />
        {expanded ? <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>Check your country code and contact details, then try Resend message. For email, check your spam folder. In this prototype, verification completes automatically after about eight seconds; no message is sent.</Text> : null}
      </View>
      <View style={{ gap: theme.space['300'] }}>
        <Text accessibilityRole="header" style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>Contact us</Text>
        <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>Still need help? Contact us on WhatsApp or by Email.</Text>
        <View>
          <ListItem size="md" label="info@greenstand.org" leadingElement="icon" leadingIcon="email-outline" trailingElement="icon" trailingIcon="content-copy" showDivider={false} accessibilityLabel="Copy info@greenstand.org" onPress={() => void copy('info@greenstand.org')} />
          <ListItem size="md" label="+1(333)-333-3333" leadingElement="icon" leadingIcon="whatsapp" trailingElement="icon" trailingIcon="content-copy" showDivider={false} accessibilityLabel="Copy prototype WhatsApp number" onPress={() => void copy('+13333333333')} />
        </View>
        {feedback ? <Text accessibilityLiveRegion="polite" selectable style={[t.typography.paragraphS, { color: t.color.text.neutral.secondary }]}>{feedback}</Text> : null}
      </View>
    </View>
  </BottomSheetModal>;
}
