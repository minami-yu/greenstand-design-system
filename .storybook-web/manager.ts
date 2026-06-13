import { addons } from '@storybook/manager-api';
import { storybookTheme } from './storybookTheme';
import { theme } from '../src/theme/tokens';

addons.setConfig({
  theme: storybookTheme
});

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
`;

document.head.appendChild(style);
