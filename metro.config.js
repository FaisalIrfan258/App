const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure mp3 files are treated as assets, not source code
const assetExts = config.resolver.assetExts.filter((ext) => ext !== 'mp3');
const sourceExts = config.resolver.sourceExts.filter((ext) => ext !== 'mp3');

config.resolver.assetExts = [...assetExts, 'mp3', 'm4a', 'wav', 'aac'];
config.resolver.sourceExts = sourceExts;

module.exports = config;
