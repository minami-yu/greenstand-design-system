import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getBottomSheetDragPosition, getBottomSheetSnapHeights, getNearestBottomSheetSnapHeight } from './bottomSheetSnapPoints.ts';

const heights = getBottomSheetSnapHeights([0.32, 0.6, 0.92], 800);

test('snap heights match the map list positions and adapt to available screen height', () => {
  assert.deepEqual(heights, [256, 480, 736]);
  assert.deepEqual(getBottomSheetSnapHeights([0.32, 0.6, 0.92], 400), [128, 240, 368]);
});

test('dragging up expands the sheet and snaps to the expanded height', () => {
  const position = getBottomSheetDragPosition(480, -200, heights);
  assert.deepEqual(position, { height: 680, offset: 0 });
  assert.equal(getNearestBottomSheetSnapHeight(position.height, heights), 736);
  assert.deepEqual(getBottomSheetDragPosition(736, -300, heights), { height: 736, offset: 0 });
});

test('dragging down collapses before introducing a dismissal offset', () => {
  const middle = getBottomSheetDragPosition(736, 250, heights);
  assert.equal(getNearestBottomSheetSnapHeight(middle.height, heights), 480);
  const collapsed = getBottomSheetDragPosition(480, 210, heights);
  assert.equal(getNearestBottomSheetSnapHeight(collapsed.height, heights), 256);
  assert.equal(collapsed.offset, 0);
  assert.deepEqual(getBottomSheetDragPosition(256, 100, heights), { height: 256, offset: 100 });
});

test('missing or invalid snap points preserve content-driven mode and values stay within the safe screen', () => {
  assert.deepEqual(getBottomSheetSnapHeights(undefined, 800), []);
  assert.deepEqual(getBottomSheetSnapHeights([0, -1, NaN, Infinity], 800), []);
  assert.deepEqual(getBottomSheetSnapHeights([0.6], 0), []);
  assert.deepEqual(getBottomSheetSnapHeights([0.9, 0.6, 0.6, 2], 800), [480, 720, 800]);
});
