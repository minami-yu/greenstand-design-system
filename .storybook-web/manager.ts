import { addons } from '@storybook/manager-api';
import { storybookTheme } from './storybookTheme';
import { theme } from '../src/theme/tokens';

addons.setConfig({
  panelPosition: 'bottom',
  theme: storybookTheme
});

// Storybook's theme API has no token for sidebar tree icons — override via DOM CSS.
const sidebarIconColor = theme.color.icon.neutral.tertiary;
const sidebarIconColorSelected = theme.color.icon.neutral.inverse;

const style = document.createElement('style');
style.textContent = `
  #storybook-explorer-tree .sidebar-item svg {
    color: ${sidebarIconColor};
  }

  #storybook-explorer-tree .sidebar-item[data-selected='true'] svg {
    color: ${sidebarIconColorSelected};
  }

  #storybook-explorer-tree .sidebar-item[data-selected='true'] a {
    color: ${sidebarIconColorSelected} !important;
  }
`;

document.head.appendChild(style);
