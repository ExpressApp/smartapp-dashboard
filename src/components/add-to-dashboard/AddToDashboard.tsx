import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '@expressms/smartapp-ui'
import { isNull } from 'lodash'
import Header from '../header/Header'
import Section from './section/Section'
import Notification from '../notification/Notification'
import NoResultsFound from '../no-results-found/NoResultsFound'
import { ReactComponent as Search } from '../../assets/icons/search.svg'
import { resetFoundItemsForDashboard, searchForNewDashboardItems } from '../../redux/actions/dashboard'
import { resetNotification } from '../../redux/actions/ui'
import { getDashboardItemsIds, getFoundItemsForDashboard } from '../../redux/selectors/dashboard'
import { getNotification } from '../../redux/selectors/ui'
import { SECTION_NAME, SECTION_TYPE, ROUTES_PATH } from '../../constants/constants'
import { getServicesArray, getChatsArray, getContactsArray, isEmpty } from '../../helpers'
import './AddToDashboard.scss'

const AddToDashboard = () => {
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { servicesIds, chatsIds, contactsIds } = useSelector(getDashboardItemsIds)
  const { services, chats, contacts } = useSelector(getFoundItemsForDashboard)
  const { isOpen: isShowNotification, type } = useSelector(getNotification)

  const showHelpText = searchValue.length > 0 && searchValue.length < 3
  const { isDataEmpty, isServicesEmpty, isChatsEmpty, isContactsEmpty } = isEmpty(services, chats, contacts)

  const handleSearchClick = () => {
    searchValue.length >= 3 && dispatch(searchForNewDashboardItems(searchValue))
  }
  
  useEffect(() => () => {
    dispatch(resetFoundItemsForDashboard())
  }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isShowNotification) {
        dispatch(resetNotification())
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [dispatch, isShowNotification])

  return (
    <div className="wrapper wrapper__light-background">
      <Header title="Добавить на дашборд" isBack onClickBack={() => navigate(ROUTES_PATH.dashboard)} />
      <div className="search">
        <Input defaultValue={searchValue} placeholder="Сервисы, чаты, контакты" onChange={(value) => setSearchValue(value)} />
        <Search style={{ color: searchValue === '' ? 'rgba(17, 17, 17, 0.2)' : 'rgba(71, 153, 227, 1)' }} onClick={handleSearchClick} />
        {showHelpText && <div className="search__help-text">Введите запрос от 3 символов</div>}
      </div>
      {isDataEmpty ? (
        <NoResultsFound />
      ) : (
        <>
          {!isNull(services) && !isServicesEmpty && (
            <Section name={SECTION_NAME.services} type={SECTION_TYPE.services} items={getServicesArray(services, servicesIds)} />
          )}
          {!isNull(chats) && !isChatsEmpty && (
            <Section name={SECTION_NAME.chats} type={SECTION_TYPE.chats} items={getChatsArray(chats, chatsIds)} />
          )}
          {!isNull(contacts) && !isContactsEmpty && (
            <Section name={SECTION_NAME.contacts} type={SECTION_TYPE.contacts} items={getContactsArray(contacts, contactsIds)} />
          )}
        </>
      )}
      <Notification isOpen={isShowNotification} type={type} />
    </div>
  )
}

export default AddToDashboard