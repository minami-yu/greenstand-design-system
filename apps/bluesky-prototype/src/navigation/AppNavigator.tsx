import { lazy, Suspense, useRef, useState, type ComponentRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@greenstand/design-system';
import { AccountScreen, SettingsScreen } from '../screens/SettingsScreen';
import { UploadScreen } from '../screens/UploadScreen';
import { UsersScreen } from '../screens/users/UsersScreen';
import { UserDetailScreen } from '../screens/users/UserDetailScreen';
import { AddUserFlow } from '../screens/users/AddUserFlow';
import { initialUsers, type PrototypeUser } from '../screens/users/userData';
import { usePrototypeUpload } from '../hooks/usePrototypeUpload';
import { UploadSuccessSheet } from '../components/upload/UploadSuccessSheet';
import { UploadInterruptionSheet } from '../components/upload/UploadInterruptionSheet';
import { HomeOnboarding, type OnboardingAnchor } from '../components/onboarding/HomeOnboarding';
import { AuthFlow } from '../screens/auth/AuthFlow';
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

// The native map module must not load until its destination is opened.
const TreesScreen = lazy(() => import('../screens/TreesScreen').then(module => ({ default: module.TreesScreen })));

type RouteName = 'users' | 'user-detail' | 'add-user' | 'login' | 'home' | 'trees' | 'settings' | 'account' | 'upload' | 'capture-user' | 'capture-organization' | 'capture-camera';

export function AppNavigator() {
  const insets = useSafeAreaInsets();
  const accounts = useRef<Record<string, PrototypeUser>>({});
  const [newAccount, setNewAccount] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  const [navbarAnchor, setNavbarAnchor] = useState<OnboardingAnchor>();
  const [uploadAnchor, setUploadAnchor] = useState<OnboardingAnchor>();
  const navbarRef = useRef<ComponentRef<typeof View>>(null);
  const [users, setUsers] = useState<PrototypeUser[]>(initialUsers);
  const [detailUser, setDetailUser] = useState<PrototypeUser>(initialUsers[0]);
  const [addUserReturn, setAddUserReturn] = useState<'users' | 'capture-user'>('users');
  const upload = usePrototypeUpload();
  const [automaticallyUpload, setAutomaticallyUpload] = useState(true);
  const [remindToUpload, setRemindToUpload] = useState(true);
  const [route, setRoute] = useState<RouteName>('home');
  const [selectedUser, setSelectedUser] = useState<CaptureUser | undefined>();
  const [selectedOrganization, setSelectedOrganization] = useState<CaptureOrganization | undefined>();
  const showWebPhoneFrame = Platform.OS === 'web';
  const navbarBottomPadding = showWebPhoneFrame ? undefined : insets.bottom;
  const navbarHeight = TREETRACKER_NAVBAR_HEIGHT - theme.space['400'] + (navbarBottomPadding ?? theme.space['400']);

  if (route === 'login') return <AuthFlow accounts={accounts.current} onComplete={(user, key, isNew) => {
    accounts.current[key] = user;
    setUsers(previous => isNew ? [user] : previous.some(item => item.id === user.id) ? previous : [user]);
    setSelectedUser(user);
    setNewAccount(true);
    setOnboarding(isNew);
    setRoute('home');
  }} />;

  if (route === 'add-user') return <AddUserFlow onCancel={() => setRoute(addUserReturn)} onComplete={user => {
    setUsers(previous => [...previous, user]);
    setSelectedUser(user);
    setOnboarding(true);
    setRoute('home');
  }} />;

  if (route === 'user-detail') return <UserDetailScreen key={detailUser.id} user={detailUser} onBack={() => setRoute('users')} onCapture={() => { setSelectedUser(detailUser); setRoute('capture-organization'); }} />;

  if (route === 'upload') {
    return <UploadScreen
      onBack={() => setRoute('settings')}
      automaticallyUpload={automaticallyUpload}
      remindToUpload={remindToUpload}
      onAutomaticallyUploadChange={setAutomaticallyUpload}
      onRemindToUploadChange={setRemindToUpload}
    />;
  }

  if (route === 'users' || route === 'home' || route === 'trees' || route === 'settings' || route === 'account') {
    return (
      <View style={styles.screenShell}>
        {route === 'users' && <UsersScreen users={users} bottomInset={navbarHeight} onAdd={() => { setAddUserReturn('users'); setRoute('add-user'); }} onSelect={user => { setDetailUser(user); setRoute('user-detail'); }} />}
        {route === 'trees' && <Suspense fallback={null}><TreesScreen bottomInset={navbarHeight} /></Suspense>}
        {route === 'home' && <HomeScreen offline={upload.offline} emptyQueue={newAccount} onboarding={onboarding} onUploadAnchor={setUploadAnchor} bottomInset={navbarHeight} uploaded={upload.uploaded} uploadProgress={upload.progress} uploading={upload.running} onUpload={newAccount ? undefined : upload.start} onStopUpload={upload.stop} />}
        {route === 'settings' && <SettingsScreen bottomInset={navbarHeight}
          onAccount={() => setRoute('account')}
          onUpload={() => setRoute('upload')}
          onLogout={() => {
            setOnboarding(false);
            setSelectedUser(undefined);
            setSelectedOrganization(undefined);
            upload.reset();
            setAutomaticallyUpload(true);
            setRemindToUpload(true);
            setRoute('login');
          }} />}
        {route === 'account' && <AccountScreen onBack={() => setRoute('settings')} />}
        <UploadSuccessSheet visible={upload.showCompletion} onClose={upload.dismissCompletion} />
        <UploadInterruptionSheet reason={upload.interruption} onClose={upload.dismissInterruption} />
        <View style={styles.navbarLayer}>
          <View ref={navbarRef} onLayout={() => navbarRef.current?.measureInWindow((x, y, width, height) => setNavbarAnchor({ x, y, width, height }))} style={[styles.navbarFrame, showWebPhoneFrame ? styles.webNavbarFrame : undefined]}>
            <TreetrackerNavbar
              activeItem={route === 'users' ? 'people' : route === 'home' ? 'home' : route === 'trees' ? 'trees' : 'settings'}
              bottomPadding={navbarBottomPadding}
              onCameraPress={() => setRoute('capture-user')}
              onSettingsPress={() => setRoute('settings')}
              onHomePress={() => setRoute('home')}
              onTreesPress={() => setRoute('trees')}
              onUsersPress={() => setRoute('users')}
            />
          </View>
        </View>
        {route === 'home' && onboarding && navbarAnchor ? <HomeOnboarding navbar={navbarAnchor} uploadButton={uploadAnchor} onComplete={() => setOnboarding(false)} /> : null}
      </View>
    );
  }

  if (route === 'capture-user') {
    return (
      <CaptureSelectUserScreen
        users={users}
        onAddUser={() => { setAddUserReturn('capture-user'); setRoute('add-user'); }}
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
        selectedOrganization={selectedOrganization}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
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
