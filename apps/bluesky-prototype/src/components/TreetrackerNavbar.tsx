import {
  BottomNavigation,
  BOTTOM_NAVIGATION_HEIGHT,
  type IconName
} from '@greenstand/design-system';
import { useEffect, useState } from 'react';

export const TREETRACKER_NAVBAR_HEIGHT = BOTTOM_NAVIGATION_HEIGHT;

type NavItem = {
  icon: IconName;
  id: string;
  label: string;
  selectedIcon?: IconName;
  variant?: 'default' | 'primary';
};

const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'home-outline', selectedIcon: 'home', label: 'Home' },
  { id: 'people', icon: 'people-outline', selectedIcon: 'people', label: 'Users' },
  { id: 'camera', icon: 'camera-outline', selectedIcon: 'camera', label: 'Camera', variant: 'primary' },
  {
    id: 'trees',
    icon: 'pine-tree-variant-outline',
    selectedIcon: 'pine-tree-variant',
    label: 'Trees'
  },
  { id: 'settings', icon: 'cog-outline', selectedIcon: 'cog', label: 'Settings' }
];

type TreetrackerNavbarProps = {
  activeItem?: string;
  bottomPadding?: number;
  onCameraPress?: () => void;
  onSettingsPress?: () => void;
  onTreesPress?: () => void;
  onUsersPress?: () => void;
  onHomePress?: () => void;
};

export function TreetrackerNavbar({
  activeItem = 'home',
  bottomPadding,
  onCameraPress,
  onSettingsPress,
  onHomePress,
  onTreesPress,
  onUsersPress
}: TreetrackerNavbarProps) {
  const [selectedItem, setSelectedItem] = useState(activeItem);

  useEffect(() => {
    setSelectedItem(activeItem);
  }, [activeItem]);

  return (
    <BottomNavigation
      activeItem={selectedItem}
      bottomPadding={bottomPadding}
      items={NAV_ITEMS}
      onItemPress={(item) => {
        if (item.id === 'camera') {
          setSelectedItem(item.id);
          onCameraPress?.();
          return;
        }

        if (item.id === 'home') {
          setSelectedItem(item.id);
          onHomePress?.();
          return;
        }

        if (item.id === 'people') {
          setSelectedItem(item.id);
          onUsersPress?.();
          return;
        }

        if (item.id === 'trees') {
          setSelectedItem(item.id);
          onTreesPress?.();
          return;
        }

        if (item.id === 'settings') {
          setSelectedItem(item.id);
          onSettingsPress?.();
          return;
        }

        setSelectedItem(item.id);
      }}
    />
  );
}
