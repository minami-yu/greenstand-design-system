import type { SavedCapture } from './captureStorage';

/** CameraView supplies data URIs on web; keep photo and metadata together. */
export async function saveCapture(capture: SavedCapture): Promise<SavedCapture> {
  localStorage.setItem(`greenstand.capture.${capture.id}`, JSON.stringify(capture));
  return capture;
}
