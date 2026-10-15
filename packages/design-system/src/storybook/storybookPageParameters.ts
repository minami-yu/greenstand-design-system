/** Full-width docs shell for foundation/guide MDX pages — not component Canvas embeds. */
export const storybookPageParameters = {
  controls: { disable: true },
  docsPage: true
} as const;

/** Docs Code panel — enable on Playground stories only (global default is off). */
export const storybookPlaygroundParameters = {
  docs: { codePanel: true }
} as const;
