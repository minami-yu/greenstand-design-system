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
- `tokens/styles/value.json` — Hand-maintained W3C DTCG text styles and elevation shadows.
- DO NOT TOUCH MANUALLY: `src/theme/tokens.ts` is entirely managed by Style Dictionary.

## Design System Implementation Rules

### Source of truth

- `src/theme/tokens.ts` is the source of truth for all design values in components.
- Never hardcode colors, spacing, typography, radius, shadows, stroke, blur, depth, or sizing values.
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
- `theme.space`, `theme.radius`, `theme.stroke`, `theme.elevation`, `theme.blur`, `theme.depth`
- `useTheme()` for light/dark color modes
- `typographies.mobile` / `typographies.desktop` for device typography

Space keys: `"100"`, `"200"`, `"400"`, `"n200"`, etc. Radius keys: `"xs"`, `"sm"`, `"md"`, `"lg"`.

### Component architecture

- `<Box />` handles structural layout with type-safe `space` / `radius` props.
- Every component ships with a `.stories.tsx` (CSF) for both Storybooks.
- Use array style composition; keep styling token-driven.
- Reuse existing components whenever possible.
- Web-compatible RN primitives only.

### Missing tokens

If a design requires a value not in `src/theme/tokens.ts`:

1. Stop implementation.
2. Report the missing token with suggested name and category.
3. Wait for confirmation before adding to `tokens/styles/value.json` or requesting a Figma export.

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
