import { Easing } from 'react-native';

export type CubicBezier = readonly [number, number, number, number];

export function getMotionEasing([x1, y1, x2, y2]: CubicBezier) {
  return Easing.bezier(x1, y1, x2, y2);
}

export function getMotionCssEasing(easing: CubicBezier): string {
  return `cubic-bezier(${easing.join(', ')})`;
}
