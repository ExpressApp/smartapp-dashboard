---
title: Кеширование статики
---

1. Первым шагом необходимо добавить новые зависимости в **devDependencies**.

```
"generate-json-webpack-plugin": "^2.0.0",
"react-app-rewired": "^2.2.1",
"zip-webpack-plugin": "^4.0.1",
```

2. Вторым шагом необходимо обновить **build-скрипт**.

```
"build": "react-app-rewired build"
```

3. Третьим шагом необходимо создать **smartapp-manifest.json** файл в корне проекта и скопировать в него код, представленный ниже.

```json
{
  "manifestVersion": "1.0.0",
  "smartAppVersion": "==filled automatically==",
  "bundlePath": "==filled automatically==",
  "changeLog": "Кеширование контента и статики"
}
```

- `manifestVersion` - константа (обязательно 1.0.0);
- `smartAppVersion` - текущая версия SmartApp в формате [**semver**](https://semver.org/lang/ru/); при обновлении данного параметра клиент скачивает новый bundle;
- `bundlePath` - путь к архиву со статикой SmartApp Frontend;
- `changeLog` - описание изменений в текущей версии SmartApp; данное описание будет выведено пользователю.

4. Четвертым шагом необходимо создать **config-overrides.js** файл в корне проекта и скопировать в него код, представленный ниже, для корректного использования библиотек, установленных на первом шаге.

```javascript
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
```
