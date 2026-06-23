/**
 * Storybook docs helpers — build ArgTypes table summaries from the same values
 * used in control `options`. Keeps the Type column in sync with Playground selects.
 */
export function storybookQuotedUnion(values: readonly string[]) {
  return values.map((value) => `'${value}'`).join(' | ');
}

/** Limit `<ArgTypes />` to the design-system API (hides Pressable / View inherited props). */
export function storybookDocsArgTypesInclude(include: readonly string[]) {
  return {
    docs: {
      argTypes: {
        include: [...include],
        // `include` filters only — row order follows docgen / component prop field order.
        sort: 'none' as const
      }
    }
  };
}

/** Screen reader name — document on Switch, CheckInput, and Icon `.stories.tsx`. */
export const storybookArgTypeAccessibilityLabel = {
  control: 'text' as const,
  description:
    'Screen reader name. Required when purpose is not clear from visible content (standalone switch/checkbox, meaningful icon). See Accessibility/Overview.',
  table: { type: { summary: 'string' } }
};

/** Optional context announced after the label — rarely needed; see Accessibility/Overview. */
export const storybookArgTypeAccessibilityHint = {
  control: 'text' as const,
  description:
    'Extra context for assistive technologies (e.g. "Double tap to toggle"). See Accessibility/Overview.',
  table: { type: { summary: 'string' } }
};
