import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, theme, useTheme } from '@greenstand/design-system';
import { HomeScreen } from '../screens/HomeScreen';
import {
  CaptureCameraScreen,
  CaptureSelectOrganizationScreen,
  CaptureSelectUserScreen,
  type CaptureOrganization,
  type CaptureUser
} from '../screens/capture/CaptureFlowScreens';
import {
  TREETRACKER_NAVBAR_HEIGHT,
  TreetrackerNavbar
} from '../components/TreetrackerNavbar';

type RouteName = 'login' | 'onboarding' | 'home' | 'capture-user' | 'capture-organization' | 'capture-camera';

function PlaceholderScreen({
  route,
  onNavigate
}: {
  route: Exclude<RouteName, 'home'>;
  onNavigate: (route: RouteName) => void;
}) {
  const t = useTheme();
  const title = route === 'login' ? 'Login / Sign Up' : 'Onboarding';
  const nextRoute = route === 'login' ? 'onboarding' : 'home';

  return (
    <View style={[styles.placeholder, { backgroundColor: t.color.background.neutral.default }]}>
      <View
        style={[
          styles.placeholderPanel,
          {
            backgroundColor: t.color.fill.neutral.surface,
            borderColor: t.color.border.neutral.subtle
          }
        ]}
      >
        <Text style={[t.typography.headingS, { color: t.color.text.neutral.primary }]}>
          {title}
        </Text>
        <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary }]}>
          Placeholder route for the portfolio prototype flow.
        </Text>
        <Button
          label={route === 'login' ? 'Start onboarding' : 'Go to Home'}
          onPress={() => onNavigate(nextRoute)}
        />
        <Pressable accessibilityRole="button" onPress={() => onNavigate('home')}>
          <Text style={[t.typography.labelM, { color: t.color.text.brand.default }]}>
            Preview Home directly
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export function AppNavigator() {
  const insets = useSafeAreaInsets();
  const [route, setRoute] = useState<RouteName>('home');
  const [selectedUser, setSelectedUser] = useState<CaptureUser | undefined>();
  const [selectedOrganization, setSelectedOrganization] = useState<CaptureOrganization | undefined>();
  const showWebPhoneFrame = Platform.OS === 'web';
  const navbarBottomPadding = showWebPhoneFrame ? undefined : insets.bottom;
  const navbarHeight = TREETRACKER_NAVBAR_HEIGHT - theme.space['400'] + (navbarBottomPadding ?? theme.space['400']);

  if (route === 'home') {
    return (
      <View style={styles.screenShell}>
        <HomeScreen bottomInset={navbarHeight} />
        <View style={styles.navbarLayer}>
          <View style={[styles.navbarFrame, showWebPhoneFrame ? styles.webNavbarFrame : undefined]}>
            <TreetrackerNavbar
              bottomPadding={navbarBottomPadding}
              onCameraPress={() => setRoute('capture-user')}
              onDemoReset={() => setRoute('login')}
            />
          </View>
        </View>
      </View>
    );
  }

  if (route === 'capture-user') {
    return (
      <CaptureSelectUserScreen
        onBack={() => setRoute('home')}
        onSelectUser={(user) => {
          setSelectedUser(user);
          setRoute('capture-organization');
        }}
      />
    );
  }

  if (route === 'capture-organization') {
    const openCamera = (organization?: CaptureOrganization) => {
      setSelectedOrganization(organization);
      setRoute('capture-camera');
    };

    return (
      <CaptureSelectOrganizationScreen
        onBack={() => setRoute('capture-user')}
        onContinueWithoutOrganization={() => openCamera(undefined)}
        onSelectOrganization={openCamera}
      />
    );
  }

  if (route === 'capture-camera') {
    return (
      <CaptureCameraScreen
        onBack={() => setRoute('capture-organization')}
        onDone={() => setRoute('home')}
        selectedUser={selectedUser}
      />
    );
  }

  return <PlaceholderScreen onNavigate={setRoute} route={route} />;
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: theme.space['400']
  },
  placeholderPanel: {
    borderRadius: theme.radius.md,
    borderWidth: theme.border.sm,
    gap: theme.space['400'],
    maxWidth: 360,
    padding: theme.space['400'],
    width: '100%'
  },
  screenShell: {
    flex: 1
  },
  navbarLayer: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0
  },
  navbarFrame: {
    width: '100%'
  },
  webNavbarFrame: {
    maxWidth: 360
  }
});
