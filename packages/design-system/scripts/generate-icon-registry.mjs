/**
 * Generates src/components/Icon/icons.ts from Figma icon frame titles.
 * Run after adding icons to the Figma "Icons" frame: node 12663:7261
 */
import { writeFileSync } from 'node:fs';

/** Figma symbol name → @mdi/js export. Closest MDI match when exact name differs. */
const MDI_MAP = {
  'notifications-none': 'mdiBellOutline',
  history: 'mdiHistory',
  'cloud-check-variant': 'mdiCloudCheckVariant',
  'cloud-check-variant-outline': 'mdiCloudCheckVariantOutline',
  'image-outline': 'mdiImageOutline',
  'message-bubble-outline': 'mdiCommentOutline',
  'message-text-outline': 'mdiMessageTextOutline',
  'message-outline': 'mdiMessageOutline',
  'content-copy': 'mdiContentCopy',
  edit: 'mdiPencil',
  'chat-help': 'mdiChatQuestionOutline',
  arrow: 'mdiArrowRight',
  'counterclockwise-arrows': 'mdiBackupRestore',
  'help-circle-outline': 'mdiHelpCircleOutline',
  'my-location': 'mdiCrosshairsGps',
  'arrow-expand': 'mdiArrowExpand',
  'list-box-outline': 'mdiListBoxOutline',
  'trash-can-outline': 'mdiTrashCanOutline',
  clock: 'mdiClock',
  close: 'mdiClose',
  'bell-outline': 'mdiBellOutline',
  'heart-outline': 'mdiHeartOutline',
  magnify: 'mdiMagnify',
  'arrow-up': 'mdiArrowUp',
  'arrow-down': 'mdiArrowDown',
  'arrow-left': 'mdiArrowLeft',
  'arrow-right': 'mdiArrowRight',
  'chevron-left': 'mdiChevronLeft',
  add: 'mdiPlus',
  'swap-horizontal': 'mdiSwapHorizontal',
  menu: 'mdiMenu',
  'calendar-outline': 'mdiCalendarOutline',
  'information-outline': 'mdiInformationOutline',
  'clock-outline': 'mdiClockOutline',
  'email-outline': 'mdiEmailOutline',
  github: 'mdiGithub',
  facebook: 'mdiFacebook',
  whatsapp: 'mdiWhatsapp',
  'eye-outline': 'mdiEyeOutline',
  'eye-off-outline': 'mdiEyeOffOutline',
  'filter-outline': 'mdiFilterOutline',
  'check-circle-outline': 'mdiCheckCircleOutline',
  'cloud-upload-outline': 'mdiCloudUploadOutline',
  'cloud-off-outline': 'mdiCloudOffOutline',
  'cloud-download-outline': 'mdiCloudDownloadOutline',
  'pine-tree-variant-outline': 'mdiPineTreeVariantOutline',
  'map-outline': 'mdiMapOutline',
  web: 'mdiWeb',
  login: 'mdiLogin',
  logout: 'mdiLogout',
  'account-outline': 'mdiAccountOutline',
  'home-outline': 'mdiHomeOutline',
  home: 'mdiHome',
  'wallet-outline': 'mdiWalletOutline',
  wallet: 'mdiWallet',
  bell: 'mdiBell',
  'cog-outline': 'mdiCogOutline',
  cog: 'mdiCog',
  'camera-outline': 'mdiCameraOutline',
  camera: 'mdiCamera',
  'pine-tree-variant': 'mdiPineTreeVariant',
  'cloud-upload': 'mdiCloudUpload',
  'people-outline': 'mdiAccountGroupOutline',
  people: 'mdiAccountGroup',
  'progress-upload': 'mdiProgressUpload',
  pause: 'mdiPause',
  check: 'mdiCheck',
  'chevron-up': 'mdiChevronUp',
  'chevron-down': 'mdiChevronDown',
  'chevron-right': 'mdiChevronRight',
  refresh: 'mdiRefresh',
  'check-circle': 'mdiCheckCircle',
  error: 'mdiAlertCircle',
  'error-outline': 'mdiAlertCircleOutline',
  information: 'mdiInformation',
  password: 'mdiFormTextboxPassword',
  'password-outline': 'mdiLockOutline',
  'close-circle': 'mdiCloseCircle',
  'coins-outline': 'mdiCashMultiple',
  'external-link': 'mdiOpenInNew',
  alert: 'mdiAlert',
  'verified-user': 'mdiShieldAccount',
  'keyboard-voice': 'mdiMicrophoneOutline'
};

/** Non-MDI icons from Figma — paths live in Icon/custom.ts (online, offline). */
const CUSTOM_MAP = {
  online: { source: 'ic:outline-wifi' },
  offline: { source: 'wordpress:offline' }
};

const mdiImports = [...new Set(Object.values(MDI_MAP))].sort();
const mdiKeys = Object.keys(MDI_MAP).sort();
const customKeys = Object.keys(CUSTOM_MAP).sort();

const lines = [
  '/**',
  ' * Icon registry — generated from Figma frame "Icons" (12663:7261).',
  ' * Keys match the icon title suffix (e.g. mdi:close → "close").',
  ' * Regenerate: node scripts/generate-icon-registry.mjs',
  ' */',
  `import { ${mdiImports.join(', ')} } from '@mdi/js';`,
  "import { customIcons } from './custom';",
  '',
  'export const mdiIcons = {',
  ...mdiKeys.map((key) => `  '${key}': ${MDI_MAP[key]},`),
  '} as const;',
  '',
  'export const icons = {',
  ...mdiKeys.map((key) => `  '${key}': ${MDI_MAP[key]},`),
  ...customKeys.map((key) => `  '${key}': customIcons['${key}'],`),
  '} as const;',
  '',
  'export type MdiIconName = keyof typeof mdiIcons;',
  'export type CustomIconName = keyof typeof customIcons;',
  'export type IconName = keyof typeof icons;',
  ''
];

writeFileSync('src/components/Icon/icons.ts', lines.join('\n'));
console.log(`✔ icons.ts — ${mdiKeys.length} MDI + ${customKeys.length} custom`);
