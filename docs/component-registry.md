# Component registry

Shared components live in `packages/design-system/src/components` and are exported through `@greenstand/design-system`. Product components live in `apps/bluesky-prototype/src/components`.

This registry records recently introduced components; the package public API lists the other existing shared components.

| Component | Ownership | Figma | Notes |
| --- | --- | --- | --- |
| Banner | Shared design system | 13401:17827 | Warning, error, success, info, and neutral tones with contained and full-width treatments. |
| Chip | Shared design system | 13488:27188 | Icon/avatar/text-only leading slots, arrow/close indicators, and controlled selection. Stories and MDX include variant, selection, and removal examples. |
| ListItem | Shared design system | 13103:14197 | md/lg rows with icon.md leading icons and default/destructive tones; leading artwork and eight trailing options. Stories and MDX include left, right, size, and selection examples. |
| SettingsScreen | Prototype screen | 14881:103941 | User menu composed from TopNavigation, ListItem, Divider, and the existing app navbar. |
| UploadScreen | Prototype screen | 14881:103744 | Upload preferences composed from TopNavigation and large ListItems with switches. Session state lives in the app navigator. |
| TreeTag | Shared design system | 15492:97968 | Transparent md/lg/xl illustration; optional md/lg background tiles. |
| SimpleTreeTag | Shared design system | 16453:104930 | default, small, focus, number. Empty Figma large variant excluded. |

| TreesScreen | Prototype screen | 16456:116695 | Map and searchable tree list, local filters, detail sheet; Trees navbar destination. |
| SearchField | Shared design system | 15631:119064 | Controlled search with optional voice action. |
| IconButton | Shared design system | 16456:116708 | Surface and subtle map actions with accessible touch targets. |
| CurrentLocationTag | Shared design system | 16463:119994 | Original direction cone and location dot artwork. |

| TreeFilters | Prototype component | 15620:111793 | Map/list filter sheet composed from shared Chip, Divider, DsLink, Button, SearchField, and BottomSheetModal. Draft multi-selection with Reset, Apply, and searchable planter directory. |
| TextField | Shared design system | 15580:104710, 15580:104711 | Labeled text input, focus outline, optional clear action, native keyboard props. Stories and MDX included. |
| Tabs | Shared design system | 15574:101201 | Controlled equal-width tabs with active underline and accessible selected state. Stories and MDX included. |
| UsersScreen / UserDetailScreen | Prototype screens | 15566:98713, 15574:99516 | Searchable session user directory, summary metrics and map, profile information, capture entry point. |
| AddUserFlow / UserPhotoScreen | Prototype screens | 15580:104705, 15580:104751, 15580:104759, 15965:100608, 16144:96839, 15580:104804 | Name, organization selection, photo guide, capture, and retake/confirmation. Native Expo camera and labeled web demo. |
