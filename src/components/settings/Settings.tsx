import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../header/Header'
import Section from './section/Section'
import EmptyDashboard from '../empty-dashboard/EmptyDashboard'
import { getDashboardItems } from '../../redux/selectors/dashboard'
import { SECTION_NAME, SECTION_TYPE, ROUTES_PATH } from '../../constants/constants'
import { getServicesArray, getChatsArray, getContactsArray, isEmpty } from '../../helpers'
import './Settings.scss'

const Settings = () => {
  const navigate = useNavigate()
  const { services, chats, contacts } = useSelector(getDashboardItems)
  const { isDataEmpty } = isEmpty(services, chats, contacts)

  return (
    <div className="wrapper wrapper__light-background">
      <Header title="Настройки" isBack onClickBack={() => navigate(ROUTES_PATH.dashboard)} />
      {isDataEmpty ? (
        <EmptyDashboard />
      ) : (
        <>
          <Section name={SECTION_NAME.services} type={SECTION_TYPE.services} items={getServicesArray(services || [])} />
          <Section name={SECTION_NAME.chats} type={SECTION_TYPE.chats} items={getChatsArray(chats || [])} />
          <Section name={SECTION_NAME.contacts} type={SECTION_TYPE.contacts} items={getContactsArray(contacts || [])} />
        </>
      )}
    </div>
  )
}

export default Settings