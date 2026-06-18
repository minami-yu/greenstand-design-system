import type { PropsWithChildren } from 'react';
import { View, type FlexAlignType } from 'react-native';

export type StorybookStoryAlign = 'start' | 'center' | 'end' | 'left' | 'right';

export function resolveStoryAlign(align: StorybookStoryAlign): FlexAlignType {
  switch (align) {
    case 'center':
      return 'center';
    case 'end':
    case 'right':
      return 'flex-end';
    default:
      return 'flex-start';
  }
}

type StorybookStoryShellProps = PropsWithChildren<{
  /** Prevents the global stretch decorator from widening intrinsic-size components. */
  align?: StorybookStoryAlign;
}>;

/** Thin wrapper for Playground and single-component stories. */
export function StorybookStoryShell({
  align = 'start',
  children
}: StorybookStoryShellProps) {
  return <View style={{ alignSelf: resolveStoryAlign(align) }}>{children}</View>;
}
