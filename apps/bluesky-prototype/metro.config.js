const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);
const defaultResolveRequest = config.resolver.resolveRequest;
const designSystemFontsPath = path.resolve(
  workspaceRoot,
  'packages/design-system/src/theme/fonts.ts'
);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules')
];
config.resolver.extraNodeModules = {
  '@greenstand/design-system': path.resolve(workspaceRoot, 'packages/design-system/src'),
  react: path.resolve(workspaceRoot, 'node_modules/react'),
  'react-native': path.resolve(workspaceRoot, 'node_modules/react-native')
};
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === '@greenstand/design-system/theme/fonts' ||
    (moduleName === './fonts' &&
      context.originModulePath.endsWith('packages/design-system/src/theme/index.ts'))
  ) {
    return {
      filePath: designSystemFontsPath,
      type: 'sourceFile'
    };
  }

  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
