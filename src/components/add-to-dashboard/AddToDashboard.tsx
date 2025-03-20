import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Input, ScrollBar } from '@expressms/smartapp-ui'
import { isNull } from 'lodash'
import classNames from 'classnames'
import Header from '../header/Header'
import Section from './section/Section'
import NoResultsFound from '../no-results-found/NoResultsFound'
import Skeletons from './skeletons/Skeletons'
import { resetFoundItemsForDashboard, searchForNewDashboardItems } from '../../redux/actions/dashboard'
import { getDashboardItemsIds, getFoundItemsForDashboard } from '../../redux/selectors/dashboard'
import { getIsDisconnectedStatus, getSearchLoader } from '../../redux/selectors/ui'
import { languageKeys } from '../../core/i18n/locales'
import { EMPTY_INPUT_HINT, MIN_QUERY_LENGTH, ROUTES_PATH, SEARCH_FIELD_TYPE, SECTION_TYPE } from '../../constants/constants'
import { generateChatsArray, generateContactsArray, generateServicesArray, isEmpty } from '../../helpers'
import './AddToDashboard.scss'

const { entities, enterQuery, addToDashboard, servicesSection, chatsSection, contactsSection } = languageKeys

const AddToDashboard = () => {
  const [searchValue, setSearchValue] = useState('')

  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isDisconnectedStatus = useSelector(getIsDisconnectedStatus)
  const searchLoader = useSelector(getSearchLoader)
  const { servicesIds, chatsIds, contactsIds } = useSelector(getDashboardItemsIds)
  const { services, chats, contacts } = useSelector(getFoundItemsForDashboard)

  const searchValueLength = searchValue.length
  const isEmptySearchValue = searchValueLength === 0
  const isValidSearchValue = searchValueLength >= MIN_QUERY_LENGTH
  const showHelpText = !isEmptySearchValue && !isValidSearchValue
  const { isDataEmpty, isServicesEmpty, isChatsEmpty, isContactsEmpty } = isEmpty({ services, chats, contacts })

  const handleClickBack = () => navigate(ROUTES_PATH.dashboard)
  const handleEnterPress = () => isValidSearchValue && dispatch(searchForNewDashboardItems(searchValue))

  const handleClearClick = () => {
    setSearchValue('')
    dispatch(resetFoundItemsForDashboard())
  }

  useEffect(() => {
    return () => {
      dispatch(resetFoundItemsForDashboard())
    }
  }, [dispatch])

  const renderContent = () => {
    if (searchLoader) return <Skeletons />
    if (isDataEmpty) return <NoResultsFound />

    return (
      <ScrollBar
        content={
          <div className="add-to-dashboard__sections">
            {!isNull(services) && !isServicesEmpty && (
              <Section name={t(servicesSection)} type={SECTION_TYPE.services} items={generateServicesArray(services, servicesIds)} />
            )}
            {!isNull(chats) && !isChatsEmpty && (
              <Section name={t(chatsSection)} type={SECTION_TYPE.chats} items={generateChatsArray(chats, chatsIds)} />
            )}
            {!isNull(contacts) && !isContactsEmpty && (
              <Section name={t(contactsSection)} type={SECTION_TYPE.contacts} items={generateContactsArray(contacts, contactsIds)} />
            )}
          </div>
        }
      />
    )
  }

  return (
    <div className={classNames('add-to-dashboard', 'wrapper', 'wrapper__light-background')}>
      <Header title={t(addToDashboard)} isBack onClickBack={handleClickBack} />
      <div className="add-to-dashboard__search">
        <Input
          disabled={isDisconnectedStatus}
          isSearchable={isEmptySearchValue}
          isClearable={!isEmptySearchValue}
          fieldType={SEARCH_FIELD_TYPE}
          placeholder={t(entities)}
          hint={showHelpText ? t(enterQuery) : EMPTY_INPUT_HINT}
          onChange={setSearchValue}
          onEnterPress={handleEnterPress}
          onClearClick={handleClearClick}
        />
      </div>
      {renderContent()}
    </div>
  )
}

export default AddToDashboard
