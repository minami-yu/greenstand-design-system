/**
 * Custom icon paths for non-MDI Figma symbols.
 * Source titles from Figma Icons frame (12663:7261).
 */
export const customIcons = {
  /** ic:outline-wifi — connected / online indicator */
  online:
    'm1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9m8 8l3 3l3-3a4.237 4.237 0 0 0-6 0m-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13',
  /** wordpress:offline — disconnected / offline indicator */
  offline:
    'm1.366 2.813l.935-.94L13.56 13.187l-.935.94l-4.697-4.72a4.63 4.63 0 0 0-3.244 1.373L3.356 9.447a6.5 6.5 0 0 1 2.926-1.694L4.796 6.26a8.4 8.4 0 0 0-2.767 1.853L.703 6.78a10.4 10.4 0 0 1 2.686-1.933zM15.297 6.78L13.97 8.113a8.43 8.43 0 0 0-6.05-2.486l-1.71-1.72c3.204-.56 6.614.386 9.088 2.873m-5.121 1.113a6.56 6.56 0 0 1 2.468 1.554l-.465.46zm-4.166 4.22l1.99 2l1.99-2a2.8 2.8 0 0 0-3.98 0'
} as const;

/** Non-24×24 viewBoxes for custom icons (MDI and most icons use 0 0 24 24). */
export const customIconViewBoxes: Partial<
  Record<keyof typeof customIcons, string>
> = {
  offline: '0 0 16 16'
};

export type CustomIconName = keyof typeof customIcons;
