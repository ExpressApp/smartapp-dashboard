import React from 'react'
import { isNull } from 'lodash'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ScrollBar } from '@expressms/smartapp-ui'
import Header from '../header/Header'
import Section from './section/Section'
import EmptyDashboard from '../empty-dashboard/EmptyDashboard'
import { getDashboardItems } from '../../redux/selectors/dashboard'
import { languageKeys } from '../../core/i18n/locales'
import { SECTION_TYPE, ROUTES_PATH, TEXT_SIZE } from '../../constants/constants'
import { generateChatsArray, generateContactsArray, generateServicesArray, isEmpty } from '../../helpers'
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import './Dashboard.scss'

const { myDashboard, servicesSection, chatsSection, contactsSection } = languageKeys

const Dashboard = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { services, chats, contacts } = useSelector(getDashboardItems)

  const { isDataEmpty, isServicesEmpty, isChatsEmpty, isContactsEmpty } = isEmpty({ services, chats, contacts })

  return (
    <div className={classNames('wrapper', { 'wrapper__light-background': isDataEmpty })}>
      <Header
        title={t(myDashboard)}
        textSize={TEXT_SIZE.major}
        additionalIcons={[
          { icon: <AddIcon />, onClick: () => navigate(ROUTES_PATH.add) },
          { icon: <SettingsIcon />, onClick: () => navigate(ROUTES_PATH.settings) },
        ]}
      />
      {isDataEmpty ? (
        <EmptyDashboard />
      ) : (
        <ScrollBar
          content={
            <div className="dashboard">
              {!isNull(services) && !isServicesEmpty && (
                <Section name={t(servicesSection)} type={SECTION_TYPE.services} items={generateServicesArray(services)} />
              )}
              {!isNull(chats) && !isChatsEmpty && <Section name={t(chatsSection)} type={SECTION_TYPE.chats} items={generateChatsArray(chats)} />}
              {!isNull(contacts) && !isContactsEmpty && (
                <Section name={t(contactsSection)} type={SECTION_TYPE.contacts} items={generateContactsArray(contacts)} />
              )}
            </div>
          }
        />
      )}
    </div>
  )
}

export default Dashboard
