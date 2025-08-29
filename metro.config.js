const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable hash routing for web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Add hash routing support
if (process.env.EXPO_PUBLIC_PLATFORM === 'web') {
  config.resolver.alias = {
    ...config.resolver.alias,
    'react-native': 'react-native-web',
  };
}

module.exports = config;
