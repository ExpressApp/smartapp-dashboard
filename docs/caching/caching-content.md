---
title: Кеширование контента
---

**Redux Persist** – это инструмент, который используется для бесшовного сохранения объекта состояния Redux приложения в AsyncStorage.

1. Первым шагом необходимо создать **Persist Store** для сохранения состояния Redux с помощью функции **persistStore**.

```javascript
import { persistStore } from 'redux-persist'
import { configureStore } from '../redux/configureStore'

export const store = configureStore()
export const persistor = persistStore(store)
```

2. Вторым шагом необходимо обернуть корневой компонент приложения с помощью **PersistGate**.

```javascript
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './helpers'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App history={history} />
        <MainLoader />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

3. Следующим шагом необходимо определить конфигурацию **Persist Config**, которую мы передадим в persistStore для настройки сохранения состояния стора.

```javascript
import { getPersistStorage } from '../../utils/encryption'

const dashboardPersistConfig = {
  key: 'dashboardInfo',
  storage: getPersistStorage(),
  whitelist: ['services', 'chats', 'contacts'],
  blacklist: ['searchResults'],
}
```

4. После описания конфигурации Persist Config, ее необходимо передать в **Persist Reducer**.

```typescript
import { persistReducer } from 'redux-persist'

const rootReducer = combineReducers<ApplicationState>({
  ui,
  router: connectRouter(historyRouter),
  dashboard: persistReducer(dashboardPersistConfig, dashboard) as any,
})
```
