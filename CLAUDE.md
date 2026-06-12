# Design System Workspace Memory & Guardrails

This project translates standard W3C Design Tokens via Style Dictionary v4 and utilizes Storybook React Native v8.

## Critical Commands & Build Scripts
- `npm run build-tokens` : Executes Style Dictionary compiler to deep-merge files in `tokens/` and rebuild `src/theme/tokens.ts`.
- `npm run start`        : Boots up the normal Expo application view.
- `npm run storybook`    : Activates the conditional cross-env flag to open the Storybook UI environment.

> CRITICAL RUN RULE: Whenever you modify ANY `.json` files inside the `tokens/` folder, or modify the `build.js` pipeline file, you MUST immediately execute `npm run build-tokens` afterward to keep the compiled TypeScript types synchronized.

## Token & Architecture Principles
- Source Folder: All raw design token inputs live inside `tokens/` as modular files. We strictly use the W3C Design Token Community Group format ($value and $type properties). Do not strip these out.
- DO NOT TOUCH MANUALLY: The target destination file `src/theme/tokens.ts` is entirely managed by Style Dictionary. Never modify this file by hand.
- Layout Sizing System: `space` utilizes an explicit step scale mapped to a /4 multiplier grid framework. Token keys are flat strings/integers ("0", "1", "2", "4", "6", "8"). `radius`, `blur`, and `depth` utilize explicit literal integer scales or clean semantic t-shirt strings ("xs", "sm", "md").
- Component Architecture: `<Box />` handles structural layout execution. It strictly intercepts style assignments through type-safe props limited to `keyof typeof theme.space` and `keyof typeof theme.radius`. Use array compositions instead of raw inline styles inside primitive wrappers to protect mobile hardware frame-rates.
