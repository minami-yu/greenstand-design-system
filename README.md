# greenstand-design-system

Greenstand's React Native + Expo design system monorepo. The shared package contains reusable UI components, themes, tokens, and Storybook documentation. Product apps live under `apps/` and consume the design system locally through npm workspaces.

## Architecture

```text
apps/
  bluesky-prototype/       Expo app that imports @greenstand/design-system
packages/
  design-system/           Shared RN component library, tokens, fonts, Storybook
    src/components/        Badge, Button, CheckInput, Divider, Icon, ProgressBar, RadioGroup, Spinner, Switch
    src/theme/             Tokens, ThemeProvider, useTheme, fonts, shadows
    src/storybook/         MDX docs, token catalogs, Storybook-only UI
    tokens/                W3C DTCG token source files
.github/workflows/        GitHub Pages deployment for Storybook
```

The design system package is private and local-only. Apps import it as:

```ts
import { Button, ThemeProvider, theme, useTheme } from '@greenstand/design-system';
```

## Setup

```bash
npm install
npm run build-tokens
```

Use npm from the repository root so workspace links are installed correctly. Do not publish `@greenstand/design-system` to npm.

## Scripts

| Command | What it does |
|---|---|
| `npm run build-tokens` | Compiles `packages/design-system/tokens/` into `packages/design-system/src/theme/tokens.ts`. |
| `npm run storybook` | Starts the on-device Expo Storybook for the design system. |
| `npm run storybook:web` | Starts desktop Storybook at [localhost:6006](http://localhost:6006). |
| `npm run storybook:web:build` | Builds static Storybook to `packages/design-system/storybook-static/`. |
| `npm run prototype` | Starts the blue-sky prototype with Expo. |
| `npm run prototype:web` | Starts the prototype on Expo Web. |
| `npm run prototype:web:build` | Exports the prototype web build to `apps/bluesky-prototype/dist/`. |
| `npm run typecheck` | Runs TypeScript checks for workspaces that define `typecheck`. |

## Design System Package

`packages/design-system` exports the public API from `src/index.ts`:

- Components: `Badge`, `Button`, `CheckInput`, `Divider`, `Icon`, `ProgressBar`, `RadioGroup`, `Spinner`, `Switch`
- Theme utilities: `ThemeProvider`, `useTheme`, `useAppFonts`, `getShadow`
- Tokens: `theme`, `themes`, `typographies`, and related token types
- Icon metadata: `icons`, `IconName`, and icon color helpers

Component internals continue to use `src/theme/tokens.ts` as the source of truth for colors, spacing, typography, radius, border, icon sizes, shadows, and other design values.

## Token Workflow

Token sources live in `packages/design-system/tokens/`.

- `tokens/variables/` is the Figma / Token Studio export. Do not hand-edit these files.
- `tokens/styles/typography.json` and `tokens/styles/elevation.json` are hand-maintained W3C DTCG style files.
- `packages/design-system/src/theme/tokens.ts` is generated. Do not edit it by hand.

After changing token JSON or `packages/design-system/build.js`, run:

```bash
npm run build-tokens
```

## Storybook

Storybook remains part of the design-system workspace.

| Environment | Command | Config |
|---|---|---|
| On-device Expo Storybook | `npm run storybook` | `packages/design-system/.storybook/` |
| Desktop web Storybook | `npm run storybook:web` | `packages/design-system/.storybook-web/` |

The existing GitHub Pages deployment is preserved at:

[https://minami-yu.github.io/greenstand-design-system/](https://minami-yu.github.io/greenstand-design-system/)

On pushes to `main`, `.github/workflows/deploy-storybook.yml` runs `npm ci`, builds Storybook, and uploads `packages/design-system/storybook-static/` to GitHub Pages. In repository settings, Pages should use **GitHub Actions** as the source.

## Blue-Sky Prototype

The prototype app lives in `apps/bluesky-prototype`.

```bash
npm run prototype       # Expo / Expo Go entry
npm run prototype:web   # Browser dev server
npm run prototype:web:build
```

The app uses Expo SDK 51, React Native, TypeScript, and shared components from `@greenstand/design-system`. Product screens and app-specific logic stay inside `apps/bluesky-prototype/src/`.

## Vercel Deployment

The prototype is prepared for Vercel with `apps/bluesky-prototype/vercel.json`.

Recommended Vercel project settings:

| Setting | Value |
|---|---|
| Framework preset | Other |
| Root directory | `apps/bluesky-prototype` |
| Install command | `cd ../.. && npm ci` |
| Build command | `cd ../.. && npm run prototype:web:build` |
| Output directory | `dist` |

This keeps the prototype deployment independent from GitHub Pages Storybook. A deployment URL is only available after connecting the repository to Vercel and running a successful deployment.
