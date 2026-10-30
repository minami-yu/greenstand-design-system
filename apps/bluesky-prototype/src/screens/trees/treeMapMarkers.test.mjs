import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  createTreeMapRegion, currentTreeMapLocation, getTreeMapTagType, projectTreeMapCoordinate,
  treeMapPoints, treeMapPointToCoordinate
} from './treeMapMarkers.ts';

// The full background map continues beneath the overlaid bottom sheet.
const viewport = { width: 360, height: 700 };
const visibleHeight = viewport.height * 0.4;
const region = createTreeMapRegion(viewport);
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8);

test('reference tree groups remain visible above the default sheet on the live map', () => {
  assert.equal(treeMapPoints.length, 38);
  for (const point of treeMapPoints) {
    const coordinate = treeMapPointToCoordinate(point, viewport, region);
    const projected = projectTreeMapCoordinate(coordinate, viewport, region);
    near(projected.x, point.x * viewport.width);
    near(projected.y, point.y * viewport.width);
    assert.ok(projected.y > 80 && projected.y < visibleHeight);
  }
  const location = projectTreeMapCoordinate(currentTreeMapLocation, viewport, region);
  near(location.x, 46);
  near(location.y, 206);
});

test('pinching out around the exposed map keeps small tags above the overlaid sheet', () => {
  const focalY = visibleHeight / 2;
  const focalCoordinate = treeMapPointToCoordinate({ x: 0.5, y: focalY / viewport.width }, viewport, region);
  for (const zoomOutFactor of [1, 2, 4, 8, 16]) {
    const latitudeDelta = region.latitudeDelta * zoomOutFactor;
    const zoomedOut = { ...region, latitude: focalCoordinate.latitude + (focalY / viewport.height - 0.5) * latitudeDelta, latitudeDelta, longitudeDelta: region.longitudeDelta * zoomOutFactor };
    for (const point of treeMapPoints) {
      const coordinate = treeMapPointToCoordinate(point, viewport, region);
      const projected = projectTreeMapCoordinate(coordinate, viewport, zoomedOut);
      assert.ok(projected.x > 0 && projected.x < viewport.width);
      assert.ok(projected.y > 80 && projected.y < visibleHeight);
      assert.equal(getTreeMapTagType(point.id), 'small');
    }
  }
});

test('native map zoom changes tag positions around the map center without moving their coordinates', () => {
  const coordinate = treeMapPointToCoordinate(treeMapPoints[0], viewport, region);
  const before = projectTreeMapCoordinate(coordinate, viewport, region);
  const after = projectTreeMapCoordinate(coordinate, viewport, { ...region, latitudeDelta: region.latitudeDelta / 2, longitudeDelta: region.longitudeDelta / 2 });
  near(after.x - viewport.width / 2, (before.x - viewport.width / 2) * 2);
  near(after.y - viewport.height / 2, (before.y - viewport.height / 2) * 2);
});

test('panning moves the tag overlay in the same direction as the basemap', () => {
  const coordinate = treeMapPointToCoordinate(treeMapPoints[0], viewport, region);
  const before = projectTreeMapCoordinate(coordinate, viewport, region);
  const after = projectTreeMapCoordinate(coordinate, viewport, { ...region, longitude: region.longitude + region.longitudeDelta / 4 });
  near(after.x, before.x - viewport.width / 4);
  near(after.y, before.y);
});

test('only the selected map tag uses focus, and closing restores all small tags', () => {
  assert.ok(treeMapPoints.every(point => getTreeMapTagType(point.id) === 'small'));
  const selectedPointId = treeMapPoints[6].id;
  const types = treeMapPoints.map(point => getTreeMapTagType(point.id, selectedPointId));
  assert.equal(types.filter(type => type === 'focus').length, 1);
  assert.equal(types[6], 'focus');
  assert.ok(types.every(type => type === 'small' || type === 'focus'));
  assert.ok(treeMapPoints.every(point => getTreeMapTagType(point.id, undefined) === 'small'));
});

test('filtering keeps distinct map-tag identities even when tags open the same demo tree', () => {
  const filtered = treeMapPoints.filter(point => point.treeId === 52);
  assert.ok(filtered.length > 1);
  const selectedPointId = filtered[0].id;
  assert.equal(filtered.filter(point => getTreeMapTagType(point.id, selectedPointId) === 'focus').length, 1);
});
