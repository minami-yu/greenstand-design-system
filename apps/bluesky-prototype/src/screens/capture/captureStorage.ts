import { Directory, File, Paths } from 'expo-file-system';

export type SavedCapture = { id: string; uri: string; note: string; organizationId?: string; userId?: string; capturedAt: string };

/** Copy the camera's temporary photo before acknowledging a successful save. */
export async function saveCapture(capture: SavedCapture): Promise<SavedCapture> {
  const directory = new Directory(Paths.document, 'captures');
  await directory.create({ idempotent: true, intermediates: true });
  const photo = new File(directory, `${capture.id}.jpg`);
  await new File(capture.uri).copy(photo);
  const saved = { ...capture, uri: photo.uri };
  try {
    await new File(directory, `${capture.id}.json`).write(JSON.stringify(saved));
    return saved;
  } catch (error) {
    await photo.delete();
    throw error;
  }
}
