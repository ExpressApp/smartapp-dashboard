import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import { History } from 'history'
import { useDispatch } from 'react-redux'
import { LOCATION_CHANGE } from 'connected-react-router'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'reactjs-popup/dist/index.css'
import Dashboard from './dashboard/Dashboard'
import AddToDashboard from './add-to-dashboard/AddToDashboard'
import Settings from './settings/Settings'
import { initApp } from '../redux/actions/dashboard'
import { ROUTES_PATH } from '../constants/constants'

const App = ({ history }: { history: History }) => {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)
  const [historyState, setHistoryState] = useState({
    action: history.action,
    location: history.location,
  })

  useLayoutEffect(() => {
    history.listen(({ action, location }) => {
      setHistoryState({ action, location })
      dispatch({ type: LOCATION_CHANGE, payload: location.pathname })
    })
    /* eslint-disable-next-line */
  }, [])

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true)
      dispatch(initApp())
    }
  }, [dispatch, isLoaded])

  return (
    <Router navigator={history} location={historyState.location} navigationType={historyState.action}>
      <Routes>
        <Route path={ROUTES_PATH.dashboard} element={<Dashboard />} />
        <Route path={`/${ROUTES_PATH.add}`} element={<AddToDashboard />} />
        <Route path={`/${ROUTES_PATH.settings}`} element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App