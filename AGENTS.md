# Codex Repository Instructions
This project is an isolated Expo React Native design system sandbox. It translates W3C Design Tokens through Style Dictionary v4 and renders components in Storybook React Native v8.


## Commands
- `npm run build-tokens`: Compile token JSON from `tokens/` into `src/theme/tokens.ts`.
- `npm run start`: Start the normal Expo application view.
- `npm run storybook`: Start Expo with Storybook enabled via `STORYBOOK_ENABLED=true`.
- `npm run storybook:web`: Desktop web Storybook at localhost:6006.
- `npm run storybook:web:build`: Build deployable static Storybook to `storybook-static/`.


## Required Token Workflow
Whenever you modify any `.json` file inside `tokens/`, or modify `build.js`, immediately run:
```bash
npm run build-tokens
```
If dependencies are not installed, state that the command could not run and that `npm install` is required first.

### Token source layout
- `tokens/variables/` — Figma variable export (Token Studio). **Do not hand-edit.** Replace via Token Studio export (see README).
- `tokens/styles/typography.json` — Hand-maintained W3C DTCG text styles. Update manually when Figma text styles change.
- `tokens/styles/elevation.json` — Hand-maintained W3C DTCG elevation shadows. Update manually when Figma shadow styles change.


## Design System Implementation Rules
### Source of truth
- `src/theme/tokens.ts` is the source of truth for all design values in components.
- Tokens are generated from Figma (`tokens/variables/` + `tokens/styles/`) through Style Dictionary (`build.js`).
- Never hardcode colors, spacing, typography, radius, shadows, border, blur, depth, or sizing values in components.
- If a required token does not exist, report the missing token before implementation.
- Never recreate values from Figma measurements if a token exists.
- Never manually edit `src/theme/tokens.ts`.

### Figma MCP usage
- Use Figma MCP to inspect component structure, hierarchy, variants, and layout.
- Do **not** use raw Figma color, spacing, typography, or sizing values directly in code.
- Always map Figma variables to tokens from `src/theme/tokens.ts`.
- Prefer variable-to-token mapping over visual approximation.

### Token usage in components
Import from the compiled theme and theme helpers:
```ts
import { theme } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { getShadow } from '../theme/getShadow';
```
**Colors (mode-aware)** — use `useTheme()` so light/dark works:
```tsx
const t = useTheme();
backgroundColor: t.color.background.neutral.surface
color: t.color.text.neutral.primary
borderColor: t.color.border.neutral.subtle
```

**Layout (mode-independent)** — use `theme` or `<Box />` props:
```tsx
<Box p="400" gap="200" radius="md" />
padding: theme.space['400']
borderRadius: theme.radius.md
borderWidth: theme.border.sm
```

**Typography** — spread composite sets (already RN-ready: font variants, absolute line heights):
```tsx
<Text style={[t.typography['heading-m'], { color: t.color.text.neutral.primary }]} />
```

**Shadows** — use the adapter, not raw elevation arrays:
```tsx
style={getShadow(t.elevation.sm)}
```

**Fonts** — gate app/story rendering on `useAppFonts()` from `src/theme/fonts.ts`.

Never use:
```ts
backgroundColor: '#FF6600'
padding: 16
borderRadius: 8
fontSize: 14
```

### Token namespaces (current shape)
- `theme.color.*` — semantic colors (`fill`, `text`, `border`, `icon`, `shadow`, `background`) + `color.palette.*` for raw ramps
- `theme.typography.*` — composite text styles (`heading-m`, `label-m`, …) + `family` / `weight` / `size` primitives
- `theme.space`, `theme.radius`, `theme.border`, `theme.icon`, `theme.blur`, `theme.depth`, `theme.elevation`
- `themes.light` / `themes.dark` — color modes (`useTheme()`)
- `typographies.mobile` / `typographies.desktop` — device typography classes

Space keys use the Figma scale (`"100"`, `"200"`, `"400"`, `"n200"`, …), not `"md"` / `"lg"`.

### Component development
- Create reusable React Native components in `src/components/<Name>/`.
- Use TypeScript.
- Follow existing patterns (`Box`, `Card`).
- Ship a `.stories.tsx` (CSF) for every component so both Storybooks pick it up.
- Use `<Box />` for structural layout; type spacing/radius props as `keyof typeof theme.space` and `keyof typeof theme.radius`.
- Expose variants through props when appropriate.
- Keep all styling token-driven.
- Reuse existing components whenever possible.
- Use only web-compatible RN primitives (`View`, `Text`, `StyleSheet`, etc.) so web Storybook works.
- Prefer React Native array style composition inside primitives.

### Accessibility
When implementing components, consider accessibility requirements by default.

- Add appropriate `accessibilityRole` for interactive components.
- Add `accessibilityLabel` when the purpose of a component is not clear from visible content, such as icon-only buttons.
- Add `accessibilityState` when a component communicates state, such as disabled, selected, checked, or expanded.
- Ensure components remain compatible with VoiceOver (iOS) and TalkBack (Android).
- Verify touch targets meet accessibility guidelines.

### Missing tokens
If a design requires a value that does not exist in `src/theme/tokens.ts`:
1. Stop implementation.
2. Report the missing token.
3. Suggest a token name and category (semantic color, space step, typography set, etc.).
4. Wait for confirmation before introducing new values in `tokens/styles/typography.json`, `tokens/styles/elevation.json`, or requesting a Figma variable export.

### Expected workflow
1. Inspect the component in Figma via MCP.
2. Identify mapped tokens from `src/theme/tokens.ts`.
3. Generate the React Native component.
4. Generate TypeScript props.
5. Add a Storybook story.
6. Report any unmapped variables or design system gaps.



## Storybook
Two environments share `src/components/**/*.stories.tsx`:

| Environment | Command |
|---|---|
| On-device | `npm run storybook` |
| Desktop web | `npm run storybook:web` |

Keep decorators defined once in `.storybook/preview.tsx` (web re-exports it).

### Storybook docs UI (`src/storybook/ui/`)

Storybook-only React Native helpers for MDX docs and token catalogs live in **`src/storybook/ui/`**. Import from the barrel (`../ui`) or a specific file.

- **Folder:** `src/storybook/ui/` — Storybook-only; never under `src/components/`.
- **Files & exports:** use a `Storybook` prefix (`StorybookTokenCatalog.tsx`, `StorybookInlineCode`, …).
- **Utilities:** use a `storybook` prefix (`storybookTable`, `storybookRnTypography`, …).
- Do not import these into app components — docs/catalog UI only.



## Dependency constraints
Do not bump independently — Expo SDK 51 compatibility:
- `react-native@0.74.5`
- `react-native-reanimated@~3.10.1`, `react-native-gesture-handler@~2.16.1`, `@gorhom/bottom-sheet@^4`
- Storybook packages on the same 8.6.x line

If npm fails with ERESOLVE, pin compatible versions in one install pass — never use `--force` or `--legacy-peer-deps`.

## Verification
After code changes, run the narrowest relevant check:
- Token/build changes → `npm run build-tokens`
- Component changes → `npm run storybook:web:build` or start Storybook/Expo when dependencies are available
