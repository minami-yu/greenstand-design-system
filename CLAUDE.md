# Design System Workspace Memory & Guardrails

This project translates standard W3C Design Tokens via Style Dictionary v4 and utilizes Storybook React Native v8.

## Critical Commands & Build Scripts

- `npm run build-tokens` — Executes Style Dictionary compiler to deep-merge files in `tokens/` and rebuild `src/theme/tokens.ts`.
- `npm run start` — Boots up the normal Expo application view.
- `npm run storybook` — On-device Storybook via Expo (`STORYBOOK_ENABLED=true`).
- `npm run storybook:web` — Desktop web Storybook at localhost:6006.
- `npm run storybook:web:build` — Static Storybook build to `storybook-static/`.

> CRITICAL RUN RULE: Whenever you modify ANY `.json` files inside the `tokens/` folder, or modify the `build.js` pipeline file, you MUST immediately execute `npm run build-tokens` afterward to keep the compiled TypeScript types synchronized.

## Token Source Layout

- `tokens/variables/` — Figma variable export (Token Studio). Do not hand-edit; replace via export (see README).
- `tokens/styles/typography.json` — Hand-maintained W3C DTCG text styles.
- `tokens/styles/elevation.json` — Hand-maintained W3C DTCG elevation shadows.
- DO NOT TOUCH MANUALLY: `src/theme/tokens.ts` is entirely managed by Style Dictionary.

## Design System Implementation Rules

### Source of truth

- `src/theme/tokens.ts` is the source of truth for all design values in components.
- Never hardcode colors, spacing, typography, radius, shadows, border, blur, depth, or sizing values.
- If a required token does not exist, report the missing token before implementation.
- Never recreate values from Figma measurements if a token exists.

### Figma MCP usage

- Use Figma MCP to inspect component structure, hierarchy, variants, and layout.
- Do not use raw Figma color, spacing, typography, or sizing values directly.
- Always map Figma variables to tokens from `src/theme/tokens.ts`.
- Prefer variable-to-token mapping over visual approximation.

### Token usage

```tsx
import { theme } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { getShadow } from '../theme/getShadow';

const t = useTheme();

// Colors (mode-aware)
backgroundColor: t.color.background.neutral.surface
color: t.color.text.neutral.primary

// Layout (mode-independent)
<Box p="400" gap="200" radius="md" />
padding: theme.space['400']
borderRadius: theme.radius.md

// Typography (spread composite sets)
<Text style={[t.typography['heading-m'], { color: t.color.text.neutral.primary }]} />

// Shadows
style={getShadow(t.elevation.sm)}
```

Never use raw hex, pixel numbers, or guessed values when a token exists.

### Token namespaces

- `theme.color.*` — semantic colors + `color.palette.*` for raw ramps
- `theme.typography.*` — composite sets (`heading-m`, `label-m`, …)
- `theme.space`, `theme.radius`, `theme.border`, `theme.elevation`, `theme.blur`, `theme.depth`
- `useTheme()` for light/dark color modes
- `typographies.mobile` / `typographies.desktop` for device typography

Space keys: `"100"`, `"200"`, `"400"`, `"n200"`, etc. Radius keys: `"xs"`, `"sm"`, `"md"`, `"lg"`.

### Component architecture

- `<Box />` handles structural layout with type-safe `space` / `radius` props.
- Every component ships with a `.stories.tsx` (CSF) for both Storybooks.
- Use array style composition; keep styling token-driven.
- Reuse existing components whenever possible.
- Web-compatible RN primitives only.

### Accessibility

When implementing components, consider accessibility requirements by default. See Storybook **Accessibility/Overview** for full guidance.

- Set `accessibilityRole` and `accessibilityState` inside design-system components (`switch`, `checkbox`, `button`, `progressbar`, etc.).
- Callers pass `accessibilityLabel` when purpose is not clear from visible content — e.g. standalone Switch/CheckInput, meaningful icons.
- Do not add vague default labels on primitives (except Spinner’s `"Loading"`). Use visible labels in composed patterns (RadioGroup `label`, Button `label`) when possible.
- Document accessibility on **Accessibility/Overview** (source of truth). Only **Switch**, **CheckInput**, and **Icon** also expose `accessibilityLabel` in Storybook ArgTypes.
- Ensure components remain compatible with VoiceOver (iOS) and TalkBack (Android).
- Verify touch targets meet accessibility guidelines (44 × 44 px minimum).

### Missing tokens

If a design requires a value not in `src/theme/tokens.ts`:

1. Stop implementation.
2. Report the missing token with suggested name and category.
3. Wait for confirmation before adding to `tokens/styles/typography.json`, `tokens/styles/elevation.json`, or requesting a Figma export.

### Expected workflow

1. Inspect component in Figma via MCP.
2. Map to tokens in `src/theme/tokens.ts`.
3. Build the React Native component + TypeScript props + Storybook story.
4. Report unmapped variables or gaps.

## Storybook & Dependencies

- Two Storybooks share `src/components/**/*.stories.tsx` (on-device + web).
- Decorators live in `.storybook/preview.tsx` only.
- Pinned for Expo 51: `react-native@0.74.5`, reanimated 3.10, gesture-handler 2.16, bottom-sheet ^4, Storybook 8.6.x.
- Never use `--force` / `--legacy-peer-deps` for ERESOLVE fixes.

### Storybook docs UI (`src/storybook/ui/`)

Storybook-only RN helpers for MDX docs and token catalogs live in **`src/storybook/ui/`**. Import via `../ui` or the barrel `index.ts`.

- **Folder:** `src/storybook/ui/` — Storybook-only; never under `src/components/`.
- **Files & exports:** `Storybook` prefix (`StorybookTokenCatalog.tsx`, `StorybookInlineCode`, …).
- **Utilities:** `storybook` prefix (`storybookTable`, `storybookRnTypography`, …).
- Do not import these into design-system components — docs/catalog UI only.

### Storybook props table (`<ArgTypes />`)

MDX component docs use `<ArgTypes of={ComponentStories} />`. Docgen often shows **`unknown`** in the Type column for imported unions and inherited `PressableProps` / `ViewProps`.

Use helpers from **`src/storybook/storybookArgTypes.ts`** in every component `.stories.tsx` that documents props:

1. **`description`** + **`control`** / **`options`** on each documented prop.
2. **`table.type.summary`** — for `select`/`radio` props, derive from the same options array via `storybookQuotedUnion(options)`. Use plain summaries (`'string'`, `'boolean'`, `'IconName'`) elsewhere.
3. **`parameters: storybookDocsArgTypesInclude([...])`** — list only the design-system API; hides inherited RN props.
4. **Accessibility ArgTypes** — only for **Switch**, **CheckInput**, and **Icon**: add `storybookArgTypeAccessibilityLabel` and include in `storybookDocsArgTypesInclude`. All other components: document accessibility on **Accessibility/Overview** only.

```ts
import {
  storybookArgTypeAccessibilityLabel,
  storybookDocsArgTypesInclude,
  storybookQuotedUnion
} from '../../storybook/storybookArgTypes';

const meta = {
  component: Switch,
  argTypes: {
    toggled: { /* … */ },
    accessibilityLabel: storybookArgTypeAccessibilityLabel
  },
  parameters: storybookDocsArgTypesInclude(['toggled', 'accessibilityLabel'])
} satisfies Meta<typeof Switch>;
```

Do not duplicate `include` in MDX — keep it on the story `meta` only.
