const {
  override,
  overrideDevServer,
  addDecoratorsLegacy,
  disableEsLint,
  addWebpackPlugin,
  addWebpackAlias,
  addWebpackModuleRule,
  watchAll,
  // adjustWorkbox
} = require("customize-cra");
const path = require("path");
const WorkerPlugin = require("worker-plugin");

module.exports = override(
  (config) => ({
    ...config,
    output: {
      ...config.output,
      globalObject: "this",
    },
  }),
  addWebpackPlugin(new WorkerPlugin()),
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src/"),
  })
);
