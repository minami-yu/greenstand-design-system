import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { CurrentLocationTag, SimpleTreeTag, theme } from '@greenstand/design-system';
import {
  createTreeMapRegion, currentTreeMapLocation, getTreeMapTagType, projectTreeMapCoordinate,
  treeMapPoints, treeMapPointToCoordinate, type TreeMapRegion
} from '../screens/trees/treeMapMarkers';

type TreesMapPreviewProps = {
  treeIds?: readonly number[];
  selectedPointId?: string;
  onTreePress: (pointId: string) => void;
  onMapPress?: () => void;
};

/** Live basemap with prototype tree groups inspired by Figma's density and placement. */
export function TreesMapPreview({ treeIds, selectedPointId, onTreePress, onMapPress }: TreesMapPreviewProps) {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  return <View style={styles.map} onLayout={event => {
    const { width, height } = event.nativeEvent.layout;
    setViewport(previous => previous.width === width && previous.height === height ? previous : { width, height });
  }}>
    {viewport.width > 0 && viewport.height > 0 && <LiveTreeMap viewport={viewport} treeIds={treeIds} selectedPointId={selectedPointId} onTreePress={onTreePress} onMapPress={onMapPress} />}
  </View>;
}

function LiveTreeMap({ viewport, treeIds, selectedPointId, onTreePress, onMapPress }: TreesMapPreviewProps & { viewport: { width: number; height: number } }) {
  const initialRegion = useMemo(() => createTreeMapRegion(viewport), [viewport]);
  const [region, setRegion] = useState<TreeMapRegion>(initialRegion);
  const coordinates = useMemo(() => treeMapPoints.map(point => treeMapPointToCoordinate(point, viewport, initialRegion)), [viewport, initialRegion]);
  const points = treeIds ? treeMapPoints.filter(point => treeIds.includes(point.treeId)) : treeMapPoints;
  // Render the focused pin last so nearby dots cannot cover it.
  const orderedPoints = [...points.filter(point => point.id !== selectedPointId), ...points.filter(point => point.id === selectedPointId)];
  const location = projectTreeMapCoordinate(currentTreeMapLocation, viewport, region);
  return <>
    <MapView style={StyleSheet.absoluteFill} initialRegion={initialRegion} onRegionChange={setRegion} onRegionChangeComplete={setRegion}
      onPress={onMapPress} rotateEnabled={false} pitchEnabled={false} accessibilityLabel="Interactive map near Kijabe Forest showing planted trees" />
    <View collapsable={false} pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {orderedPoints.map(point => {
        const coordinate = coordinates[treeMapPoints.indexOf(point)];
        const position = projectTreeMapCoordinate(coordinate, viewport, region);
        const type = getTreeMapTagType(point.id, selectedPointId);
        return <Pressable key={point.id} accessibilityRole="button" accessibilityLabel="Open Tree #52" accessibilityState={{ selected: type === 'focus', expanded: type === 'focus' }} onPress={() => onTreePress(point.id)}
          style={[styles.markerTarget, { left: position.x - theme.size['1100'] / 2, top: position.y - (type === 'focus' ? theme.size['1000'] : theme.size['1100'] / 2) }]}>
          <SimpleTreeTag type={type} />
        </Pressable>;
      })}
      <CurrentLocationTag accessibilityLabel="Current location" pointerEvents="none"
        style={{ position: 'absolute', left: location.x - theme.icon.md / 2, top: location.y - theme.size['1000'] }} />
    </View>
  </>;
}

const styles = StyleSheet.create({
  map: { flex: 1, width: '100%', overflow: 'hidden' },
  markerTarget: { position: 'absolute', alignItems: 'center', justifyContent: 'center', width: theme.size['1100'], height: theme.size['1100'] }
});
