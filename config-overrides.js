const ZipPlugin = require('zip-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const packageJson = require('./package.json')
const smartAppManifestJson = require('./smartapp-manifest.json')

module.exports = function (config, webpackEnv) {
  const isEnvProduction = webpackEnv === 'production'

  if (!isEnvProduction) return config

  config.plugins = [
    ...config.plugins,
    new GenerateJsonPlugin('smartapp-manifest.json', {
      ...smartAppManifestJson,
      smartAppVersion: packageJson.version,
      bundlePath: `/bundle-${packageJson.version}.zip`,
    }),
    new ZipPlugin({
      filename: `bundle-${packageJson.version}.zip`,
    }),
  ]

  return config
}