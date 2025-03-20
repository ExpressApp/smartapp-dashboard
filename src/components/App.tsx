import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import { useQuery } from '@expressms/smartapp-sdk'
import { useDispatch } from 'react-redux'
import { LOCATION_CHANGE } from 'connected-react-router'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Dashboard from './dashboard/Dashboard'
import AddToDashboard from './add-to-dashboard/AddToDashboard'
import Settings from './settings/Settings'
import Notification from './notification/Notification'
import { initApp } from '../redux/actions/dashboard'
import { setPlatform, setTheme } from '../redux/actions/ui'
import history from '../redux/router'
import { PLATFORMS, ROUTES_PATH } from '../constants/constants'
import { APP_LANGUAGES, APP_LANGUAGES_TYPE, changeLanguage } from '../core/i18n'

const App = () => {
  const dispatch = useDispatch()
  const { theme, platform, locale } = useQuery()

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

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
      dispatch(setTheme(theme))
    }
  }, [dispatch, theme])

  useEffect(() => {
    dispatch(setPlatform(platform as PLATFORMS))
  }, [dispatch, platform])

  useEffect(() => {
    changeLanguage((locale || APP_LANGUAGES.ru) as APP_LANGUAGES_TYPE)
  }, [locale])

  return (
    <>
      <Router navigator={history} location={historyState.location} navigationType={historyState.action}>
        <Routes>
          <Route path={ROUTES_PATH.dashboard} element={<Dashboard />} />
          <Route path={`/${ROUTES_PATH.add}`} element={<AddToDashboard />} />
          <Route path={`/${ROUTES_PATH.settings}`} element={<Settings />} />
        </Routes>
      </Router>
      <Notification />
    </>
  )
}

export default App
