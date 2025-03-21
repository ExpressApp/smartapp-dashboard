import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Notification as SUINotification } from '@expressms/smartapp-ui'
import { isEqual, isEmpty } from 'lodash'
import { resetNotification } from '../../redux/actions/ui'
import { getLayoutType, getNotification, getPlatform, getTheme } from '../../redux/selectors/ui'
import { isChatType, isNoInternetConnectionType, isServiceType } from '../../helpers'
import { languageKeys } from '../../core/i18n/locales'
import './Notification.scss'

const { maxNumberOfServicesAdded, maxNumberOfChatsAdded, maxNumberOfContactsAdded, noInternetConnection } = languageKeys

enum NOTIFICATION_TYPES {
  info = 'info',
  warning = 'warning',
}

const Notification = () => {
  const [notificationId, setNotificationId] = useState('')

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const platform = useSelector(getPlatform)
  const theme = useSelector(getTheme)
  const layoutType = useSelector(getLayoutType)
  const { isOpen, type } = useSelector(getNotification)

  const isNoInternetType = isNoInternetConnectionType(type)

  useEffect(() => {
    if (isOpen) setNotificationId(type)
  }, [isOpen, type])

  const generateNotificationTextKey = () => {
    if (isNoInternetType) return noInternetConnection
    if (isServiceType(type)) return maxNumberOfServicesAdded
    return isChatType(type) ? maxNumberOfChatsAdded : maxNumberOfContactsAdded
  }

  const handleCloseNotification = (id?: string) => {
    dispatch(resetNotification())
    isEqual(id, notificationId) && setNotificationId('')
  }

  return (
    <SUINotification
      id={notificationId}
      platform={platform}
      theme={theme}
      layoutType={layoutType}
      isAutoHidden={!isNoInternetType}
      isAllIndefinitelyNeedToBeClosed={isEmpty(type)}
      type={isNoInternetType ? NOTIFICATION_TYPES.warning : NOTIFICATION_TYPES.info}
      text={t(generateNotificationTextKey())}
      onClose={handleCloseNotification}
    />
  )
}

export default Notification
