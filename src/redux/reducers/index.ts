import { connectRouter } from 'connected-react-router'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import historyRouter from '../router'
import { ui } from './ui'
import { dashboard } from './dashboard'
import { ApplicationState } from '../../types/reducers'
import { getPersistStorage } from '../../utils/encryption'

const dashboardPersistConfig = {
  key: 'dashboardInfo',
  storage: getPersistStorage(),
  whitelist: ['services', 'chats', 'contacts'],
  blacklist: ['searchResults'],
}

const rootReducer = combineReducers<ApplicationState>({
  ui,
  router: connectRouter(historyRouter),
  dashboard: persistReducer(dashboardPersistConfig, dashboard) as any,
})

export default rootReducer
