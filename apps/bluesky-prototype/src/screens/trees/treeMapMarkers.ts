// Normalized mock positions from Figma 16456:117388, relative to the basemap width.
// These are preview data, not live geographic coordinates.
export const treeMapPoints = [
  { id: 'map-tree-0', treeId: 51, x: 139 / 360, y: 152 / 360 },
  { id: 'map-tree-1', treeId: 52, x: 146 / 360, y: 165 / 360 },
  { id: 'map-tree-2', treeId: 53, x: 142 / 360, y: 157 / 360 },
  { id: 'map-tree-3', treeId: 54, x: 106 / 360, y: 240 / 360 },
  { id: 'map-tree-4', treeId: 55, x: 141 / 360, y: 260 / 360 },
  { id: 'map-tree-5', treeId: 51, x: 131 / 360, y: 240 / 360 },
  { id: 'map-tree-6', treeId: 52, x: 116 / 360, y: 196 / 360 },
  { id: 'map-tree-7', treeId: 53, x: 122 / 360, y: 196 / 360 },
  { id: 'map-tree-8', treeId: 54, x: 122 / 360, y: 205 / 360 },
  { id: 'map-tree-9', treeId: 55, x: 126 / 360, y: 205 / 360 },
  { id: 'map-tree-10', treeId: 51, x: 126 / 360, y: 209 / 360 },
  { id: 'map-tree-11', treeId: 52, x: 130 / 360, y: 209 / 360 },
  { id: 'map-tree-12', treeId: 53, x: 130 / 360, y: 213 / 360 },
  { id: 'map-tree-13', treeId: 54, x: 135 / 360, y: 213 / 360 },
  { id: 'map-tree-14', treeId: 55, x: 121 / 360, y: 204 / 360 },
  { id: 'map-tree-15', treeId: 51, x: 152 / 360, y: 161 / 360 },
  { id: 'map-tree-16', treeId: 52, x: 109 / 360, y: 219 / 360 },
  { id: 'map-tree-17', treeId: 53, x: 127 / 360, y: 213 / 360 },
  { id: 'map-tree-18', treeId: 54, x: 139 / 360, y: 213 / 360 },
  { id: 'map-tree-19', treeId: 55, x: 139 / 360, y: 221 / 360 },
  { id: 'map-tree-20', treeId: 51, x: 116 / 360, y: 205 / 360 },
  { id: 'map-tree-21', treeId: 52, x: 116 / 360, y: 237 / 360 },
  { id: 'map-tree-22', treeId: 53, x: 116 / 360, y: 248 / 360 },
  { id: 'map-tree-23', treeId: 54, x: 129 / 360, y: 248 / 360 },
  { id: 'map-tree-24', treeId: 55, x: 123 / 360, y: 235 / 360 },
  { id: 'map-tree-25', treeId: 51, x: 135 / 360, y: 235 / 360 },
  { id: 'map-tree-26', treeId: 52, x: 135 / 360, y: 243 / 360 },
  { id: 'map-tree-27', treeId: 53, x: 140 / 360, y: 243 / 360 },
  { id: 'map-tree-28', treeId: 54, x: 140 / 360, y: 236 / 360 },
  { id: 'map-tree-29', treeId: 55, x: 129 / 360, y: 231 / 360 },
  { id: 'map-tree-30', treeId: 51, x: 117 / 360, y: 231 / 360 },
  { id: 'map-tree-31', treeId: 52, x: 106 / 360, y: 231 / 360 },
  { id: 'map-tree-32', treeId: 53, x: 102 / 360, y: 231 / 360 },
  { id: 'map-tree-33', treeId: 54, x: 102 / 360, y: 237 / 360 },
  { id: 'map-tree-34', treeId: 55, x: 113 / 360, y: 237 / 360 },
  { id: 'map-tree-35', treeId: 51, x: 135 / 360, y: 249 / 360 },
  { id: 'map-tree-36', treeId: 52, x: 154 / 360, y: 156 / 360 },
  { id: 'map-tree-37', treeId: 53, x: 144 / 360, y: 156 / 360 }
] as const;

export const treeMapLocation = { x: 46 / 360, y: 206 / 360 };
export type TreeMapViewport = { width: number; height: number };
export type TreeMapCoordinate = { latitude: number; longitude: number };
export type TreeMapRegion = TreeMapCoordinate & { latitudeDelta: number; longitudeDelta: number };
type Point = { x: number; y: number };
export const currentTreeMapLocation = { latitude: -0.9528, longitude: 36.6008 };

/** Place the location and mock grove in the reference positions on a live map. */
export function createTreeMapRegion(viewport: TreeMapViewport): TreeMapRegion {
  const longitudeDelta = 0.025;
  const latitudeDelta = longitudeDelta * viewport.height / viewport.width;
  return {
    latitude: currentTreeMapLocation.latitude + (treeMapLocation.y * viewport.width / viewport.height - 0.5) * latitudeDelta,
    longitude: currentTreeMapLocation.longitude + (0.5 - treeMapLocation.x) * longitudeDelta,
    latitudeDelta,
    longitudeDelta
  };
}

export function treeMapPointToCoordinate(point: Point, viewport: TreeMapViewport, region: TreeMapRegion): TreeMapCoordinate {
  return {
    latitude: region.latitude + (0.5 - point.y * viewport.width / viewport.height) * region.latitudeDelta,
    longitude: region.longitude + (point.x - 0.5) * region.longitudeDelta
  };
}

/** Approximate the unrotated map projection near the equator for prototype tags. */
export function projectTreeMapCoordinate(point: TreeMapCoordinate, viewport: TreeMapViewport, region: TreeMapRegion): Point {
  return {
    x: ((point.longitude - region.longitude) / region.longitudeDelta + 0.5) * viewport.width,
    y: ((region.latitude - point.latitude) / region.latitudeDelta + 0.5) * viewport.height
  };
}

export function getTreeMapTagType(pointId: string, selectedPointId?: string): 'small' | 'focus' {
  return pointId === selectedPointId ? 'focus' : 'small';
}
