const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'ts', 'tsx'],
  },
};

module.exports = mergeConfig(
  defaultConfig,
  wrapWithReanimatedMetroConfig(config),
);
