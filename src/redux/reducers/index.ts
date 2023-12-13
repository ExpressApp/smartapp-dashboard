import { connectRouter } from 'connected-react-router'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import historyRouter from '../router'
import { ui } from './ui'
import { dashboard } from './dashboard'
import { ApplicationState } from '../../types/reducers'

const dashboardPersistConfig = {
  key: 'dashboard',
  storage,
  whitelist: ['services', 'chats', 'contacts'],
  blacklist: ['searchResults'],
}

const rootReducer = combineReducers<ApplicationState>({
  ui,
  router: connectRouter(historyRouter),
  dashboard: persistReducer(dashboardPersistConfig, dashboard) as any,
})

export default rootReducer