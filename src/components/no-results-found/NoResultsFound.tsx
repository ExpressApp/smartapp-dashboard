import React from 'react'
import { useTranslation } from 'react-i18next'
import { languageKeys } from '../../core/i18n/locales'
import './NoResultsFound.scss'

const { noResultsFound, fixRequestAndTryAgain } = languageKeys

const NoResultsFound = () => {
  const { t } = useTranslation()

  return (
    <div className="no-results">
      <div>{t(noResultsFound)}</div>
      <div>{t(fixRequestAndTryAgain)}</div>
    </div>
  )
}

export default NoResultsFound
