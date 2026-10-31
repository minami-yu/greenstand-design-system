# Component registry

Shared components live in `packages/design-system/src/components` and are exported through `@greenstand/design-system`. Product components live in `apps/bluesky-prototype/src/components`.

This registry records recently introduced components; the package public API lists the other existing shared components.

| Component | Ownership | Figma | Notes |
| --- | --- | --- | --- |
| LogoutDialog | Prototype component | 14528:47592, 13871:14685 | Settings sign-out confirmation composed from shared Dialog and Button. Live network state selects online/offline copy; cancel preserves the session and confirm invokes logout. |
| NotificationsSheet | Prototype component | 17738:126457 | Home header notification sheet, shared BottomSheetModal and ListItem with compact unread badges and truncated labels. Static review updates; close, backdrop, and swipe dismissal. |
| DetailRow | Shared design system | 13505:19413 | Content-width label, flexible right-aligned value slot, optional divider. Plain text or custom children; stories and MDX included. |
| TreeDetailScreen / TreeDetailContent | Prototype screen | 15597:105291 | Reusable detail content with shared DetailRow, verification, and a 200 px map preview. Full-list rows and the Home upload queue open the full page; map tags and rows in the map’s tree-list sheet reuse the content in a modal sheet while the original map list sheet is hidden; closing details restores the list at its previous position. |
| Banner | Shared design system | 13401:17827 | Warning, error, success, info, and neutral tones with contained and full-width treatments. |
| Chip | Shared design system | 13488:27188 | Medium/large pills, surface/brand fills with outlines, icon/avatar/text-only leading slots, arrow/close indicators, and controlled selection. Stories and MDX include variant, selection, and removal examples. |
| ListItem | Shared design system | 13103:14197 | md/lg rows with icon.md leading icons and default/destructive tones; leading artwork and eight trailing options. Stories and MDX include left, right, size, and selection examples. |
| SettingsScreen | Prototype screen | 14881:103941 | User menu composed from TopNavigation, ListItem, Divider, and the existing app navbar. |
| UploadScreen | Prototype screen | 14881:103744 | Upload preferences composed from TopNavigation and large ListItems with switches. Session state lives in the app navigator. |
| TreeTag | Shared design system | 15492:97968 | Transparent md/lg/xl illustration; optional md/lg background tiles. |
| SimpleTreeTag | Shared design system | 16453:104930 | default, small, focus, number. The native 12 px small dot uses border.md and elevation.md. Number badge follows labelS and space 150/050; the prototype map uses small tags and focus for the selected location. Empty Figma large variant excluded. |

| TreesScreen | Prototype screen | 16456:117388 | Map preview and searchable tree list, local filters, detail sheet; Trees navbar destination. A visual-only location control follows the sheet with a space-400 gap. |
| TreesMapPreview | Prototype component | 16456:117388 | Full-width live native basemap beneath the bottom sheet, with two tree-dot groups inspired by Figma density and position. Native pan/pinch zoom keeps overlay tags aligned; tags always use small, with focus only for the selected tag. Map taps open Tree #52 in a second modal details sheet; rows in the map’s list sheet open their matching tree in that modal and focus its tag. The original list sheet stays mounted but is hidden, non-interactive, and excluded from accessibility while details are open; closing details restores its scroll and drag position; the detail sheet opens at 60%, snaps between 32%/60%/92% like the map list sheet, and includes a close button. Its transparent backdrop leaves the map undimmed while preserving outside-tap dismissal. Close, backdrop, a pull below the collapsed height, and system back dismiss only details. Full-list rows retain the full detail page. |
| SearchField | Shared design system | 15631:119064 | Controlled search with optional voice action. |
| IconButton | Shared design system | 12687:8039, 16456:116708 | Explicit xs/sm/md sizes with 16/18/28 px icons and accessible touch targets. Map/list switches use sm inside a negative-100 right-margin wrapper. |
| ToggleButton | Shared design system | 15630:114466 | Controlled icon toggle, optional selected icon and count badge; 36 px circle in a 48 px target. Shared map/list filter trigger reflects applied filter choices. Stories and MDX included. |
| CurrentLocationTag | Shared design system | 16463:119994 | Original direction cone and location dot artwork. |

| TreeFilters | Prototype component | 15620:111793 | Map/list filter sheet composed from shared Chip, Divider, DsLink, Button, SearchField, and BottomSheetModal. Draft multi-selection and searchable planter directory scroll above persistent Reset/Apply footer actions. |
| TextField | Shared design system | 15580:104710, 15580:104711 | Labeled text input, focus outline, optional clear action, native keyboard props. Stories and MDX included. |
| Tabs | Shared design system | 15574:101201 | Controlled equal-width tabs with active underline and accessible selected state. Stories and MDX included. |
| UsersScreen / UserDetailScreen | Prototype screens | 15566:98713, 15574:99516 | Searchable session user directory, summary metrics and map, profile information, capture entry point. |
| AddUserFlow / UserPhotoScreen | Prototype screens | 15580:104705, 15580:104751, 15580:104759, 15965:100608, 16144:96839, 15580:104804 | Name, organization selection, photo guide, capture, and retake/confirmation. Native Expo camera and labeled web demo. |
| Select | Shared design system | 15906:75014 (Select instance) | Labeled option trigger with optional avatar, placeholder, disabled and expanded states; caller owns the picker. |
| ImageGroup | Shared design system | 16122:74573 | Up to three overlapping photo tiles with an overflow count. |
| CaptureReview / CaptureComplete | Prototype screens | 15906:75014, 15953:99478 | Per-photo organization/note review, discard/save, persistent local capture records, and session-count completion returning home. |
| DuplicateCaptureSheet | Prototype component | 15906:75473 | Simulated duplicate warning on the third successful capture in a camera session. Compares an earlier photo and the current capture; discard returns to camera, continue opens confirmation and notes. Uses shared BottomSheetModal, Icon, and Button. |
| Snackbar | Shared design system | 16771:120281 | Inverse feedback surface with status icon; caller controls placement and visibility. |
| Home upload flow | Prototype logic | 16767:119624, 16771:120082 | Seven-second simulated upload with progress, Stop/resume, empty queue and completion dialog. |
| UploadInterruptionSheet | Prototype component | 16773:120328, 16801:120616 | Stop and connection-loss acknowledgements using shared BottomSheetModal and Button; retains upload progress for retry. |

| AvatarCard | Shared design system | 15492:80118 | Avatar/button visuals, configurable icon, outlined/plain states, and two-line labels. Capture selection add actions reuse the button visual. |

| UploadSuccessSheet | Prototype component | 17680:123204 | Upload success acknowledgement using shared BottomSheetModal, Icon, and Button; remains visible until dismissed. |
| UploadOnlineReminderSheet | Prototype component | 16131:75034 | Reconnection prompt with shared BottomSheetModal, online Icon, queue thumbnails and remaining count. Upload resumes pending photos; Not now preserves them. Honors the upload reminder preference. |
| UploadPreviewTile | Prototype component | Home upload preview / 16131:75034 | Reuses the Home square photo crop, lightweight thumbnail and overflow count treatment in both Home and the upload reminder. |

| Dialog | Shared design system | 13396:15406 | Inline card or centered modal, optional close action, custom content, responsive scrolling; stories and MDX included. |
| PointerDialog | Shared design system | 16009:39300 | Up/down pointers with left/center/right alignment or measured offset; composes Dialog. Stories and MDX included. |
| HomeOnboarding | Prototype component | 16052:26462, 16052:26264, 16052:26066, 16052:23890, 16052:23690 | Five-step tour over home after adding a user; measured camera, upload, and users highlights; local Figma illustration assets. |

| AuthFlow / AuthHelpSheet | Prototype screens | 14345:37626, 14337:13596, 14345:36244, 14345:36355, 14345:37473, 13692:46588, 14539:22801, 14542:68134, 14157:70113, 13623:30863, 13710:48586, 14525:16996 | Logout splash, WhatsApp/email contact entry, searchable country picker, timed verification, instruction carousel, help and contact copying. Reuses AddUserFlow in signup mode for name, organization and selfie. Session-only returning-account login; new accounts start with an empty upload queue and the welcome tour. |

| Card | Shared design system | 17819:129286 | Rounded neutral surface with a flexible content slot, token padding and gap. Stories and MDX included. |
| HomeScreen card layout | Prototype screen | 16724:89711, 17823:129976, 17823:130225, 16767:119624 | Impact and upload sections compose Card, Banner, Button and ProgressBar; pending, empty, offline and uploading states use the existing upload controller. |

| BottomSheet / BottomSheetModal | Shared design system | Existing BottomSheet component | Modal presentation supports optional showBackdrop (default true), opt-in snapPoints as available-height fractions and initialSnapIndex; header drag expands/collapses, upward body drags expand to the maximum snap height before scrolling in the same gesture, and pulls below the lowest snap dismiss. Content-driven sheets retain their existing behavior. Stories and MDX included. |
