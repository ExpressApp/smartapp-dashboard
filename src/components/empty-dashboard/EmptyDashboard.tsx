import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@expressms/smartapp-ui'
import { languageKeys } from '../../core/i18n/locales'
import { ROUTES_PATH } from '../../constants/constants'
import './EmptyDashboard.scss'

const { dashboardIsEmpty, goToAdd } = languageKeys

const EmptyDashboard = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGoToAdd = () => navigate(`/${ROUTES_PATH.add}`)

  return (
    <div className="empty-dashboard">
      <div className="empty-dashboard__text">{t(dashboardIsEmpty)}</div>
      <Button title={t(goToAdd)} onClick={handleGoToAdd} />
    </div>
  )
}

export default EmptyDashboard
