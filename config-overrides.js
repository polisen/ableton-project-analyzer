const {
  override,
  addWebpackPlugin,
  addWebpackAlias,
  enableEslintTypescript,
  // adjustWorkbox
} = require('customize-cra');
const path = require('path');
const WorkerPlugin = require('worker-plugin');

module.exports = override(
  (config) => ({
    ...config,
    output: {
      ...config.output,
      globalObject: 'this',
    },
  }),
  // enableEslintTypescript(),
  addWebpackPlugin(new WorkerPlugin()),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src/'),
  }),
);
