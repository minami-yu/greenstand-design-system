import { useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNetworkState } from 'expo-network';
import { Banner, BottomSheet, BottomSheetModal, Chip, getShadow, Icon, IconButton, ListItem, SearchField, ToggleButton, theme, useTheme } from '@greenstand/design-system';
import { PrototypeScreenFrame } from '../components/PrototypeScreenFrame';
import { TreeDetailScreen } from './TreeDetailScreen';
import { TreeDetailContent } from './TreeDetailContent';
import { TreeFilters, emptyTreeFilters, matchesTreeFilters, type TreeFiltersValue } from '../components/TreeFilters';
import { TreesMapPreview } from '../components/TreesMapPreview';
import { treeMapPoints } from './trees/treeMapMarkers';

// Screen-local demo data; IDs, map coordinates, and record counts are product data.
const trees = [
  { id: 51, source: require('../../assets/trees/tree-0.png'), status: 'Verified', planter: 'Oluwatobiloba Adeyemi', organization: 'Greenstand' },
  { id: 52, source: require('../../assets/trees/tree-1.png'), status: 'Verified', planter: 'Amara Diallo', organization: 'Kilimanjalo project' },
  { id: 53, source: require('../../assets/trees/tree-2.png'), status: 'Verified', planter: 'Oluwatobiloba Adeyemi', organization: 'Greenstand' },
  { id: 54, source: require('../../assets/trees/tree-3.png'), status: 'Verified', planter: 'Amara Diallo', organization: 'Kilimanjalo project' },
  { id: 55, source: require('../../assets/trees/tree-4.png'), status: 'Verified', planter: 'Oluwatobiloba Adeyemi', organization: 'Greenstand' }
];
// Heights mirror the list sheet’s collapsed, default, and expanded positions.
const treeDetailSnapPoints = [0.32, 0.6, 0.92] as const;

export function TreesScreen({ bottomInset }: { bottomInset: number }) {
  const t = useTheme();
  const networkState = useNetworkState();
  const offline = networkState.isConnected === false || networkState.isInternetReachable === false;
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
  const [selectedListTree, setSelectedListTree] = useState<(typeof trees)[number]>();
  const [mapSelection, setMapSelection] = useState<{ tree: (typeof trees)[number]; pointId?: string; visible: boolean }>();
  const mapDetailsVisible = mapSelection?.visible ?? false;
  const selectedMapPointId = mapDetailsVisible ? mapSelection?.pointId : undefined;
  const [voiceNotice, setVoiceNotice] = useState(false);
  const filtered = useMemo(() => trees.filter(tree => (`Tree #${tree.id} ${tree.planter} ${tree.organization}`).toLowerCase().includes(query.trim().toLowerCase()) && matchesTreeFilters(tree, filters)), [query, filters]);
  const filterCount = Object.values(filters).reduce((count, values) => count + values.length, 0);
  const active = query.trim() !== '' || filterCount > 0;
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
  const closeMapDetails = () => {
    // Retain the content until the modal's dismissal animation completes.
    setMapSelection(previous => previous ? { ...previous, visible: false } : previous);
  };
  const selectMapTree = (pointId: string) => {
    setMapSelection({ tree: trees[1], pointId, visible: true });
  };
  const selectListTree = (tree: (typeof trees)[number]) => {
    if (listMode) {
      setSelectedListTree(tree);
      return;
    }
    setMapSelection({ tree, pointId: treeMapPoints.find(point => point.treeId === tree.id)?.id, visible: true });
  };
  const changeQuery = (value: string) => {
    setQuery(value);
    setMapSelection(undefined);
  };
  const listContent = <View style={styles.treeContent}>
    <View style={styles.listHeading}>
    <Text accessibilityRole="header" style={[t.typography.headingM, { color: t.color.text.neutral.primary }]}>Planted Trees</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
      <ToggleButton icon="filter-outline" selected={filterCount > 0} badgeValue={String(filterCount)} accessibilityLabel={`Filter trees, ${filterCount} active filters`} accessibilityState={{ expanded: filterOpen }} onPress={openFilters} />
      {(['Status', 'Planter', 'Organization'] as const).map(name => <Chip size="md" key={name} label={filters[name].length ? `${name} (${filters[name].length})` : name} leadingElements="none" selected={filters[name].length > 0} onPress={openFilters} />)}
    </ScrollView>
    </View>
    <Text accessibilityLiveRegion="polite" style={[t.typography.labelS, { color: t.color.text.neutral.tertiary }]}>{offline ? 'Unable to load tree data' : `${active ? filtered.length : 1530} results`}</Text>
    <View>
    {!offline && filtered.map(tree => <ListItem key={tree.id} label={`Tree #${tree.id}`} paragraph="January 18, 2026" labelAccessory={<Icon name="check-circle-outline" size="sm" />} accessibilityLabel={`Tree ${tree.id}, verified, January 18, 2026`} leadingElement="thumbnail" thumbnailSource={tree.source} thumbnailImageStyle={tree.id === 51 ? { width: '102.78%', height: '137.66%', left: '-2.78%', top: '-11.44%' } : tree.id === 52 ? { width: '150.4%', height: '99.98%', left: '-20.06%' } : tree.id === 53 ? { width: '100%', height: '150%', top: '-39.85%' } : tree.id === 55 ? { width: '100.04%', height: '138.73%', left: '0.05%', top: '-22.25%' } : undefined} trailingElement="icon" showDivider={false} onPress={() => selectListTree(tree)} />)}
    {!offline && !filtered.length && <Text style={[t.typography.paragraphM, { color: t.color.text.neutral.secondary, paddingVertical: theme.space['400'] }]}>No trees match your search or filters.</Text>}
    </View>
  </View>;
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
          <SearchField value={query} onChangeText={changeQuery} showAudio={false} variant="default" />
          <View style={styles.viewSwitch}><IconButton icon="map-outline" size="sm" variant="secondary" accessibilityLabel="Show map and trees" onPress={() => setListMode(false)} /></View>
        </View>
        <ScrollView contentContainerStyle={[styles.fullListContent, { paddingBottom: bottomInset }]} showsVerticalScrollIndicator={false}>
          {listContent}
        </ScrollView>
      </View> : <>
        <View style={styles.map}>
          <TreesMapPreview treeIds={active ? filtered.map(tree => tree.id) : undefined} selectedPointId={selectedMapPointId} onTreePress={selectMapTree} onMapPress={mapSelection?.visible ? closeMapDetails : undefined} />
          <View style={[styles.mapTopOverlay, !offline && styles.mapTopOverlayOnline]}>
            {offline ? <Banner fullWidth message="Connect to the internet to load this page." showTrailingIcon={false} title="No Internet" tone="warning" /> : null}
            <View style={styles.mapToolbar}>
              <View style={[styles.searchElevation, { backgroundColor: t.color.fill.neutral.surface }, getShadow(t.elevation.lg)]}>
                <SearchField value={query} onChangeText={changeQuery} onVoicePress={() => setVoiceNotice(true)} variant="surface" />
              </View>
              <View style={styles.viewSwitch}>
                <IconButton icon="list-box-outline" size="sm" variant="surface" accessibilityLabel="Show full tree list" onPress={() => { setMapSelection(undefined); setListMode(true); }} />
              </View>
            </View>
          </View>
          <Animated.View pointerEvents="box-none" style={[styles.locateLayer, { top: Animated.subtract(sheetTop, theme.space['400'] + theme.size['1200']) }]}>
            <IconButton icon="my-location" size="sm" variant="surface" accessibilityLabel="Current location" />
          </Animated.View>
          {/* Keep the list mounted so its drag and scroll positions survive details. */}
          <Animated.View
            accessibilityElementsHidden={mapDetailsVisible}
            importantForAccessibility={mapDetailsVisible ? 'no-hide-descendants' : 'auto'}
            pointerEvents={mapDetailsVisible ? 'none' : 'auto'}
            style={[styles.sheetLayer, { top: sheetTop, opacity: mapDetailsVisible ? 0 : 1 }]}
          >
            <BottomSheet headerGestureHandlers={sheetPan.panHandlers} showCloseButton={false} showTitle={false} bottomPadding={bottomInset} style={styles.sheet} contentStyle={styles.sheetContent}>
              {listContent}
            </BottomSheet>
          </Animated.View>
        </View>
      </>}
    </View>
    <TreeFilters key={filterSession} visible={filterOpen} onClose={() => setFilterOpen(false)} initialValue={filters} onApply={value => { setMapSelection(undefined); setFilters(value); setFilterOpen(false); }} />
    <BottomSheetModal visible={mapDetailsVisible} onClose={closeMapDetails} showBackdrop={false} showCloseButton closeAccessibilityLabel="Close tree details" showTitle={false} snapPoints={treeDetailSnapPoints} initialSnapIndex={1} contentStyle={styles.sheetContent}>
      {mapSelection && <TreeDetailContent source={mapSelection.tree.source} index={mapSelection.tree.id - 52} />}
    </BottomSheetModal>
    {selectedListTree && <TreeDetailScreen visible onBack={() => setSelectedListTree(undefined)} source={selectedListTree.source} index={selectedListTree.id - 52} />}
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
  fullListContent: { paddingHorizontal: theme.layout.marginX, paddingTop: theme.space['400'] },
  mapTopOverlay: { gap: theme.space['400'], left: theme.space['0'], position: 'absolute', right: theme.space['0'], top: theme.space['0'] },
  mapTopOverlayOnline: { paddingTop: theme.space['400'] },
  mapToolbar: { alignItems: 'center', flexDirection: 'row', gap: theme.space['300'], paddingHorizontal: theme.layout.marginX },
  searchElevation: { borderRadius: theme.radius.full, flex: 1, height: theme.size['1200'] },
  viewSwitch: { marginRight: theme.space.n100 },
  locateLayer: { position: 'absolute', right: theme.layout.marginX - theme.space['100'] },
  sheet: { height: '100%' },
  sheetContent: { paddingTop: theme.space['200'] },
  treeContent: { gap: theme.space['200'] },
  listHeading: { gap: theme.space['300'] },
  filterScroll: { marginLeft: theme.space['n100'] },
  filterContent: { flexDirection: 'row', alignItems: 'center', gap: theme.space['200'] }
});
