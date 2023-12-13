import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '@expressms/smartapp-ui'
import { getMainLoader } from '../../redux/selectors/ui'
import { ApplicationState } from '../../types/reducers'
import './MainLoader.scss'

const MainLoader = () => {
  const mainLoader = useSelector<ApplicationState, boolean>(getMainLoader)

  if (!mainLoader) {
    return null
  }

  return <Loader isLoader />
}

export default MainLoader