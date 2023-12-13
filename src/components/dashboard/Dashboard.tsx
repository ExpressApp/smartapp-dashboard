import React from 'react'
import { isNull } from 'lodash'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../header/Header'
import Section from './section/Section'
import EmptyDashboard from '../empty-dashboard/EmptyDashboard'
import { ReactComponent as Add } from '../../assets/icons/add.svg'
import { ReactComponent as Settings } from '../../assets/icons/settings.svg'
import { getDashboardItems } from '../../redux/selectors/dashboard'
import { SECTION_NAME, SECTION_TYPE, ROUTES_PATH } from '../../constants/constants'
import { getChatsArray, getContactsArray, getServicesArray, isEmpty } from '../../helpers'
import './Dashboard.scss'

const Dashboard = () => {
  const navigate = useNavigate()
  const { services, chats, contacts } = useSelector(getDashboardItems)
  const { isDataEmpty, isServicesEmpty, isChatsEmpty, isContactsEmpty } = isEmpty(services, chats, contacts)

  return (
    <div
      className={
        classNames({
          'wrapper': true,
          'wrapper__light-background': isDataEmpty,
        })
      }
    >
      <Header
        title="Личный дашборд"
        additionalIcons={
          <>
            <Add onClick={() => navigate(ROUTES_PATH.add)} />
            <Settings onClick={() => navigate(ROUTES_PATH.settings)} />
          </>
        }
      />
      {isDataEmpty ? (
        <EmptyDashboard />
      ) : (
        <>
          {!isNull(services) && !isServicesEmpty && (
            <Section name={SECTION_NAME.services} type={SECTION_TYPE.services} items={getServicesArray(services)} />
          )}
          {!isNull(chats) && !isChatsEmpty && (
            <Section name={SECTION_NAME.chats} type={SECTION_TYPE.chats} items={getChatsArray(chats)} />
          )}
          {!isNull(contacts) && !isContactsEmpty && (
            <Section name={SECTION_NAME.contacts} type={SECTION_TYPE.contacts} items={getContactsArray(contacts)} />
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard