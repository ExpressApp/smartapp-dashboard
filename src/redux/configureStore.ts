import { applyMiddleware, createStore, Store, AnyAction } from 'redux'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import historyRouter from './router'
import { ApplicationState } from '../types/reducers'

export function configureStore(initialState?: ApplicationState): Store<ApplicationState> {
  const sagaMiddleware = createSagaMiddleware()
  const routerMiddleware = createRouterMiddleware(historyRouter)

  // create store
  const store: Store<ApplicationState> = createStore<ApplicationState, AnyAction, any, any>(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware))
  )

  sagaMiddleware
    .run(rootSaga)
    .toPromise()
    .catch((e) => console.error('Saga error', e))

  return store
}