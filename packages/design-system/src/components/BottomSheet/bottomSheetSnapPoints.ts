export function getBottomSheetSnapHeights(points: readonly number[] | undefined, availableHeight: number): number[] {
  if (!points || availableHeight <= 0) return [];
  return [...new Set(points
    .filter(point => Number.isFinite(point) && point > 0)
    .map(point => Math.min(point, 1) * availableHeight))]
    .sort((a, b) => a - b);
}

export function getBottomSheetDragPosition(startHeight: number, dragY: number, heights: readonly number[]) {
  const minimum = heights[0] ?? startHeight;
  const maximum = heights[heights.length - 1] ?? startHeight;
  const desired = startHeight - dragY;
  return {
    height: Math.min(maximum, Math.max(minimum, desired)),
    offset: Math.max(0, minimum - desired)
  };
}

export function getNearestBottomSheetSnapHeight(projectedHeight: number, heights: readonly number[]): number {
  return heights.reduce((nearest, height) =>
    Math.abs(height - projectedHeight) < Math.abs(nearest - projectedHeight) ? height : nearest,
  heights[0] ?? 0);
}
