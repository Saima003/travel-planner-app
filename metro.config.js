const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable symlinks (useful for monorepos)
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Support .cjs and .mjs files
config.resolver.sourceExts.push('cjs', 'mjs');

// Improve performance with inline requires
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
  inlineRequires: true,
};

module.exports = config;
