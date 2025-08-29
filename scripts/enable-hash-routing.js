#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Enabling hash routing...');

// Update package.json scripts
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add environment variables to build scripts
packageJson.scripts['build:web'] = 'EXPO_ROUTER_USE_HASH=true EXPO_ROUTER_MODE=hash expo export --platform web';
packageJson.scripts['build:web:prod'] = 'EXPO_ROUTER_USE_HASH=true EXPO_ROUTER_MODE=hash expo export --platform web --output-dir dist';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json scripts');

// Create .env.local file
const envContent = `# Force hash routing
EXPO_ROUTER_USE_HASH=true
EXPO_ROUTER_MODE=hash
EXPO_ROUTER_APP_ROOT=./app

# Web configuration
EXPO_PUBLIC_PLATFORM=web
`;

const envPath = path.join(__dirname, '..', '.env.local');
fs.writeFileSync(envPath, envContent);
console.log('✅ Created .env.local file');

// Update webpack config
const webpackPath = path.join(__dirname, '..', 'webpack.config.js');
let webpackConfig = fs.readFileSync(webpackPath, 'utf8');

// Add hash routing environment variables
if (!webpackConfig.includes('EXPO_ROUTER_USE_HASH')) {
  const envPlugin = `
  // Add environment variable for hash routing
  config.plugins.push(
    new (require('webpack').DefinePlugin)({
      'process.env.EXPO_ROUTER_USE_HASH': JSON.stringify('true'),
      'process.env.EXPO_ROUTER_MODE': JSON.stringify('hash'),
    })
  );
`;

  webpackConfig = webpackConfig.replace(
    'return config;',
    `${envPlugin}\n  return config;`
  );

  fs.writeFileSync(webpackPath, webpackConfig);
  console.log('✅ Updated webpack.config.js');
}

console.log('\n🎉 Hash routing enabled successfully!');
console.log('\nNext steps:');
console.log('1. Run: yarn install');
console.log('2. Run: yarn build:web');
console.log('3. Check that URLs contain # symbols');
console.log('\nNote: You may need to clear cache with: expo start --clear');
