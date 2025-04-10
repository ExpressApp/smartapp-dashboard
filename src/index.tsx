import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './components/App'
import MainLoader from './components/main-loader/MainLoader'
import { store, persistor } from './helpers'
import './styles/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <MainLoader />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
