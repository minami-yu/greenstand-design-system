import { useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNetworkState } from 'expo-network';
import MapView, { Marker, type Region } from 'react-native-maps';
import { Banner, BottomSheet, BottomSheetModal, Chip, CurrentLocationTag, getShadow, Icon, IconButton, ListItem, SearchField, SimpleTreeTag, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../components/PrototypeScreenFrame';
import { TreeDetailContent } from './TreeDetailContent';
import { TreeFilters, emptyTreeFilters, matchesTreeFilters, type TreeFiltersValue } from '../components/TreeFilters';

// Screen-local demo data; IDs, map coordinates, and record counts are product data.
const trees = [
  { id: 51, source: require('../../assets/trees/tree-0.png'), status: 'Verified', planter: 'Oluwatobiloba Adeyemi', organization: 'Greenstand' },
  { id: 52, source: require('../../assets/trees/tree-1.png'), status: 'Verified', planter: 'Amara Diallo', organization: 'Kilimanjalo project' },
  { id: 53, source: require('../../assets/trees/tree-2.png'), status: 'Verified', planter: 'Oluwatobiloba Adeyemi', organization: 'Greenstand' },
  { id: 54, source: require('../../assets/trees/tree-3.png'), status: 'Verified', planter: 'Amara Diallo', organization: 'Kilimanjalo project' },
  { id: 55, source: require('../../assets/trees/tree-4.png'), status: 'Verified', planter: 'Oluwatobiloba Adeyemi', organization: 'Greenstand' }
];
const initialRegion: Region = {
  latitude: -0.949,
  longitude: 36.594,
  latitudeDelta: 0.045,
  longitudeDelta: 0.035
};
const currentLocation = { latitude: -0.9528, longitude: 36.6008 };
const points = [
  { latitude: -0.952, longitude: 36.585 },
  { latitude: -0.9475, longitude: 36.5988 },
  { latitude: -0.9464, longitude: 36.6002 }
] as const;
const clusters = [
  { latitude: -0.9582, longitude: 36.5825, value: '120' },
  { latitude: -0.9502, longitude: 36.5995, value: '58' },
  { latitude: -0.9555, longitude: 36.6035, value: '339' }
] as const;

export function TreesScreen({ bottomInset }: { bottomInset: number }) {
  const t = useTheme();
  const networkState = useNetworkState();
  const offline = networkState.isConnected === false || networkState.isInternetReachable === false;
  const mapRef = useRef<MapView>(null);
  const [query, setQuery] = useState('');
  const [listMode, setListMode] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const sheetTop = useRef(new Animated.Value(0)).current;
  const sheetStart = useRef(0);
  const sheetInitialized = useRef(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterSession, setFilterSession] = useState(0);
  const [filters, setFilters] = useState<TreeFiltersValue>(emptyTreeFilters);
  const openFilters = () => { setFilterSession(value => value + 1); setFilterOpen(true); };
  const [selected, setSelected] = useState<(typeof trees)[number]>();
  const [voiceNotice, setVoiceNotice] = useState(false);
  const filtered = trees.filter(tree => (`Tree #${tree.id} ${tree.planter} ${tree.organization}`).toLowerCase().includes(query.trim().toLowerCase()) && matchesTreeFilters(tree, filters));
  const active = query.trim() !== '' || Object.values(filters).some(value => value.length > 0);
  const expandedSheetTop = screenHeight * 0.08;
  const defaultSheetTop = screenHeight * 0.4;
  const collapsedSheetTop = screenHeight * 0.68;
  const snapSheet = (top: number) => {
    Animated.timing(sheetTop, {
      duration: theme.motion.duration.moderate,
      toValue: top,
      useNativeDriver: false
    }).start();
  };
  const sheetPan = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > theme.space['200'] && Math.abs(gesture.dy) > Math.abs(gesture.dx),
    onPanResponderGrant: () => sheetTop.stopAnimation(value => { sheetStart.current = value; }),
    onPanResponderMove: (_, gesture) => {
      sheetTop.setValue(Math.min(collapsedSheetTop, Math.max(expandedSheetTop, sheetStart.current + gesture.dy)));
    },
    onPanResponderRelease: (_, gesture) => {
      const projectedTop = sheetStart.current + gesture.dy + gesture.vy * theme.size['1200'];
      const snapPoints = [expandedSheetTop, defaultSheetTop, collapsedSheetTop];
      const nearestSnapPoint = snapPoints.reduce((nearest, point) =>
        Math.abs(point - projectedTop) < Math.abs(nearest - projectedTop) ? point : nearest
      );
      snapSheet(nearestSnapPoint);
    },
    onPanResponderTerminate: () => snapSheet(defaultSheetTop)
  }), [collapsedSheetTop, defaultSheetTop, expandedSheetTop, sheetTop]);
  const centerCurrentLocation = () => {
    mapRef.current?.animateToRegion({
      ...currentLocation,
      latitudeDelta: initialRegion.latitudeDelta,
      longitudeDelta: initialRegion.longitudeDelta
    });
  };
  const listContent = <>
    <Text accessibilityRole="header" style={[t.typography.headingM, { color: t.color.text.neutral.primary }]}>Planted Trees</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filterContent}>
      <IconButton icon="filter-outline" variant="subtle" accessibilityLabel="Filter trees" onPress={openFilters} />
      {(['Status', 'Planter', 'Organization'] as const).map(name => <Chip key={name} label={filters[name].length ? `${name} (${filters[name].length})` : name} leadingElements="none" selected={filters[name].length > 0} onPress={openFilters} />)}
    </ScrollView>
    <Text accessibilityLiveRegion="polite" style={[t.typography.labelS, { color: t.color.text.neutral.tertiary }]}>{offline ? 'Unable to load tree data' : `${active ? filtered.length : 1530} results`}</Text>
    {!offline && filtered.map(tree => <ListItem key={tree.id} label={`Tree #${tree.id}`} paragraph="January 18, 2026" labelAccessory={<Icon name="check-circle-outline" size="sm" />} accessibilityLabel={`Tree ${tree.id}, verified, January 18, 2026`} leadingElement="thumbnail" thumbnailSource={tree.source} thumbnailImageStyle={tree.id === 51 ? { width: '102.78%', height: '137.66%', left: '-2.78%', top: '-11.44%' } : tree.id === 52 ? { width: '150.4%', height: '99.98%', left: '-20.06%' } : tree.id === 53 ? { width: '100%', height: '150%', top: '-39.85%' } : tree.id === 55 ? { width: '100.04%', height: '138.73%', left: '0.05%', top: '-22.25%' } : undefined} trailingElement="icon" showDivider={false} onPress={() => setSelected(tree)} />)}
    {!offline && !filtered.length && <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary, paddingVertical: theme.space['400'] }]}>No trees match your search or filters.</Text>}
  </>;
  return <PrototypeScreenFrame>
    <View style={styles.screen} onLayout={event => {
      const nextHeight = event.nativeEvent.layout.height;
      setScreenHeight(nextHeight);
      if (!sheetInitialized.current && nextHeight) {
        sheetInitialized.current = true;
        sheetTop.setValue(nextHeight * 0.4);
      }
    }}>
      {listMode ? <View style={styles.listScreen}>
        {offline ? <Banner fullWidth message="Connect to the internet to load this page." showTrailingIcon={false} title="No Internet" tone="warning" /> : null}
        <View style={styles.listToolbar}>
          <SearchField value={query} onChangeText={setQuery} showAudio={false} variant="default" />
          <IconButton icon="map-outline" variant="secondary" accessibilityLabel="Show map and trees" onPress={() => setListMode(false)} />
        </View>
        <ScrollView contentContainerStyle={[styles.fullListContent, { paddingBottom: bottomInset }]} showsVerticalScrollIndicator={false}>
          {listContent}
        </ScrollView>
      </View> : <>
      <View style={styles.map}>
        <MapView ref={mapRef} style={StyleSheet.absoluteFill} initialRegion={initialRegion} accessibilityLabel="Interactive map near Kijabe Forest showing planted trees">
          {!active && points.map((coordinate, index) => <Marker key={index} coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}><SimpleTreeTag type="small" accessibilityLabel="Tree location" /></Marker>)}
          {!active && clusters.map(cluster => <Marker key={cluster.value} coordinate={cluster} anchor={{ x: 0.5, y: 0.5 }}><SimpleTreeTag type="number" value={cluster.value} /></Marker>)}
          {active && filtered.map((tree) => <Marker key={tree.id} coordinate={points[(tree.id - 51) % points.length]} anchor={{ x: 0.5, y: 0.5 }} onPress={() => setSelected(tree)}><SimpleTreeTag type="small" accessibilityLabel={`Tree ${tree.id}`} /></Marker>)}
          <Marker coordinate={currentLocation} anchor={{ x: 0.5, y: 0.8 }}><CurrentLocationTag accessibilityLabel="Current location" /></Marker>
        </MapView>
        <IconButton icon="my-location" accessibilityLabel="Center on current location" onPress={centerCurrentLocation} style={styles.locate} />
        <View style={[styles.mapTopOverlay, !offline && styles.mapTopOverlayOnline]}>
          {offline ? <Banner fullWidth message="Connect to the internet to load this page." showTrailingIcon={false} title="No Internet" tone="warning" /> : null}
          <View style={styles.mapToolbar}>
            <View style={[styles.searchElevation, { backgroundColor: t.color.fill.neutral.surface }, getShadow(t.elevation.lg)]}>
              <SearchField value={query} onChangeText={setQuery} onVoicePress={() => setVoiceNotice(true)} variant="surface" />
            </View>
            <View style={[styles.iconButtonElevation, { backgroundColor: t.color.fill.neutral.surface }, getShadow(t.elevation.lg)]}>
              <IconButton icon="list-box-outline" variant="surface" accessibilityLabel="Show full tree list" onPress={() => setListMode(true)} />
            </View>
          </View>
        </View>
      </View>
      <Animated.View style={[styles.sheetLayer, { top: sheetTop }]}>
        <BottomSheet headerGestureHandlers={sheetPan.panHandlers} showCloseButton={false} showTitle={false} bottomPadding={bottomInset} style={styles.sheet} contentStyle={styles.sheetContent}>
          {listContent}
        </BottomSheet>
      </Animated.View>
      </>}
    </View>
    <BottomSheetModal visible={filterOpen} onClose={() => setFilterOpen(false)} title="Filter" closeAccessibilityLabel="Close filters without applying">
      <TreeFilters key={filterSession} initialValue={filters} onApply={value => { setFilters(value); setFilterOpen(false); }} />
    </BottomSheetModal>
    <BottomSheetModal visible={Boolean(selected)} onClose={() => setSelected(undefined)} showTitle={false}>
      {selected && <TreeDetailContent source={selected.source} index={selected.id - 52} />}
    </BottomSheetModal>
    <BottomSheetModal visible={voiceNotice} onClose={() => setVoiceNotice(false)} title="Voice search">
      <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.primary }]}>Voice input is not connected in this prototype. Type a tree number or planter name in Search.</Text>
    </BottomSheetModal>
  </PrototypeScreenFrame>;
}
const styles = StyleSheet.create({
  screen: { flex: 1 },
  map: { bottom: theme.space['0'], left: theme.space['0'], overflow: 'hidden', position: 'absolute', right: theme.space['0'], top: theme.space['0'] },
  sheetLayer: { bottom: theme.space['0'], left: theme.space['0'], position: 'absolute', right: theme.space['0'] },
  listScreen: { flex: 1 },
  listToolbar: { flexDirection: 'row', alignItems: 'center', gap: theme.space['300'], paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'] },
  fullListContent: { gap: theme.space['300'], paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'] },
  mapTopOverlay: { gap: theme.space['400'], left: theme.space['0'], position: 'absolute', right: theme.space['0'], top: theme.space['0'] },
  mapTopOverlayOnline: { paddingTop: theme.space['400'] },
  mapToolbar: { alignItems: 'center', flexDirection: 'row', gap: theme.space['300'], paddingHorizontal: theme.layout.marginX },
  searchElevation: { borderRadius: theme.radius.full, flex: 1, height: theme.size['1200'] },
  iconButtonElevation: { borderRadius: theme.radius.full, height: theme.size['1200'], width: theme.size['1200'] },
  locate: { position: 'absolute', right: theme.layout.marginX, bottom: theme.space['400'] },
  sheet: { height: '100%' },
  sheetContent: { paddingTop: theme.space['200'] },
  filters: { marginTop: theme.space['300'], marginBottom: theme.space['200'] },
  filterContent: { flexDirection: 'row', alignItems: 'center', gap: theme.space['200'] }
});
