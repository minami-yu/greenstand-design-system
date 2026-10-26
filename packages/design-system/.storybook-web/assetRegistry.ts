import { AssetRegistry } from 'react-native-web';

// Keep react-native-svg and React Native Web images on the same registry.
// The upstream RN 0.88 adapter uses module.exports in an ES module, which
// survives Rollup's CommonJS transform and crashes in the browser.
export const registerAsset = AssetRegistry.registerAsset;
export const getAssetByID = AssetRegistry.getAssetByID;
