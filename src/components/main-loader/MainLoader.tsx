import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '@expressms/smartapp-ui'
import { getMainLoader, getTheme } from '../../redux/selectors/ui'
import './MainLoader.scss'

const MainLoader = () => {
  const mainLoader = useSelector(getMainLoader)
  const theme = useSelector(getTheme)

  return <Loader isLoader={mainLoader} theme={theme} backgroundColor="var(--color-bg-blackout-transparent)" />
}

export default MainLoader
