import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ScrollBar } from '@expressms/smartapp-ui'
import classNames from 'classnames'
import Header from '../header/Header'
import Section from './section/Section'
import EmptyDashboard from '../empty-dashboard/EmptyDashboard'
import { getDashboardItems } from '../../redux/selectors/dashboard'
import { languageKeys } from '../../core/i18n/locales'
import { SECTION_TYPE, ROUTES_PATH } from '../../constants/constants'
import { generateServicesArray, generateChatsArray, generateContactsArray, isEmpty } from '../../helpers'
import './Settings.scss'

const { settings, servicesSection, chatsSection, contactsSection } = languageKeys

const Settings = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { services, chats, contacts } = useSelector(getDashboardItems)
  const { isDataEmpty } = isEmpty({ services, chats, contacts })

  const handleClickBack = () => navigate(ROUTES_PATH.dashboard)

  return (
    <div className={classNames('settings', 'wrapper', 'wrapper__light-background')}>
      <Header title={t(settings)} isBack onClickBack={handleClickBack} />
      {isDataEmpty ? (
        <EmptyDashboard />
      ) : (
        <ScrollBar
          content={
            <div className="settings__sections">
              <Section name={t(servicesSection)} type={SECTION_TYPE.services} items={generateServicesArray(services || [])} />
              <Section name={t(chatsSection)} type={SECTION_TYPE.chats} items={generateChatsArray(chats || [])} />
              <Section name={t(contactsSection)} type={SECTION_TYPE.contacts} items={generateContactsArray(contacts || [])} />
            </div>
          }
        />
      )}
    </div>
  )
}

export default Settings
