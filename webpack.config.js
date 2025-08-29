const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add polyfills for better browser compatibility
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
  };

  // Add core-js polyfills for better browser compatibility
  config.entry = {
    ...config.entry,
    polyfills: 'core-js/stable'
  };

  // Force hash routing for web
  if (config.output && config.output.publicPath) {
    config.output.publicPath = './';
  }

  // Add hash routing support
  config.output = {
    ...config.output,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  };

  // Force hash routing by modifying expo-router configuration
  if (config.plugins) {
    config.plugins.forEach(plugin => {
      if (plugin.constructor.name === 'DefinePlugin') {
        // Override expo-router to use hash routing
        plugin.definitions = {
          ...plugin.definitions,
          'process.env.EXPO_ROUTER_APP_ROOT': JSON.stringify('./app'),
          'process.env.EXPO_ROUTER_USE_HASH': JSON.stringify('true'),
        };
      }
    });
  }

  // Add environment variable for hash routing
  config.plugins.push(
    new (require('webpack').DefinePlugin)({
      'process.env.EXPO_ROUTER_USE_HASH': JSON.stringify('true'),
      'process.env.EXPO_ROUTER_MODE': JSON.stringify('hash'),
    })
  );

  return config;
};
