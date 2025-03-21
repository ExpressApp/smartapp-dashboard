import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { SyncLoader as SUISyncLoader } from '@expressms/smartapp-ui'
import { getSyncLoader, getTheme } from '../../redux/selectors/ui'
import { languageKeys } from '../../core/i18n/locales'
import './SyncLoader.scss'

const { syncText } = languageKeys

const SyncLoader = () => {
  const { t } = useTranslation()
  const syncLoader = useSelector(getSyncLoader)
  const theme = useSelector(getTheme)

  return <SUISyncLoader isLoading={syncLoader} theme={theme} text={t(syncText)} />
}

export default SyncLoader
