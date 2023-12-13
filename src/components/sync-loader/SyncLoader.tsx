import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as Loader } from '../../assets/icons/loader.svg'
import { getSyncLoader } from '../../redux/selectors/ui'
import { ApplicationState } from '../../types/reducers'
import './SyncLoader.scss'

const SyncLoader = () => {
  const syncLoader = useSelector<ApplicationState, boolean>(getSyncLoader)

  if (!syncLoader) {
    return null
  }

  return (
    <div className="sync-loader">
      <Loader className="sync-loader__icon" />
      <div className="sync-loader__text">Обновление</div>
    </div>
  )
}

export default SyncLoader