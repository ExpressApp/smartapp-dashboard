import { all, put, takeEvery, select, delay } from 'redux-saga/effects'
import {
  Bridge as bridge,
  ready,
  getChats,
  searchCorporatePhonebook,
  openSmartApp,
  openGroupChat,
  openContactCard,
  subscribeClientEvents,
  getLayoutType,
  getConnectionStatus,
} from '@expressms/smartapp-sdk'
import { SubscriptionEventType } from '@expressms/smartapp-sdk/build/main/types'
import {
  INIT_APP,
  FETCH_DASHBOARD_ITEMS,
  SEARCH_FOR_NEW_DASHBOARD_ITEMS,
  ADD_ITEM_TO_DASHBOARD,
  REMOVE_ITEM_FROM_DASHBOARD,
  CHANGE_DASHBOARD_ITEMS_ORDER,
  OPEN_SMART_APP,
  OPEN_GROUP_CHAT,
  OPEN_CONTACT_CARD,
  RESET_DASHBOARD_STATE,
  setDashboardItems,
  setFoundItemsForDashboard,
  resetFoundItemsForDashboard,
  updateItemsOnDashboard,
  searchForNewDashboardItemsActionType,
  addItemToDashboardActionType,
  removeItemFromDashboardActionType,
  changeDashboardItemsOrderActionType,
  openSmartAppActionType,
  openGroupChatActionType,
  openContactCardActionType,
} from '../actions/dashboard'
import { resetNotification, setConnectionStatus, setLayoutType, setMainLoader, setNotification, setSearchLoader, setSyncLoader } from '../actions/ui'
import { getDashboardItems } from '../selectors/dashboard'
import { getIsWebPlatform } from '../selectors/ui'
import { generateContactUserHuid, generateNextOrderValue, isChatType, isContactType, isEmpty, isServiceType, isStatusConnected } from '../../helpers'
import {
  MAX_SECTION_ITEMS,
  METHODS,
  MIN_SEARCH_LOADER_DISPLAY_TIME,
  NO_INTERNET_CONNECTION,
  ROUTES_PATH,
  SECTION_TYPE,
  STATUS_OK,
  STATUS_SUCCESS,
} from '../../constants/constants'
import { GeneratorFunction } from '../../types/sagas'
import { ChatState, ContactState, DashboardItemTypes, ServiceState } from '../../types/reducers'
import history from '../router'

export function* initAppSaga(): GeneratorFunction {
  try {
    const isWebPlatform = yield select(getIsWebPlatform)
    const { services, chats, contacts } = yield select(getDashboardItems)
    const { isDataNull } = isEmpty({ services, chats, contacts })

    isDataNull ? yield put(setMainLoader(true)) : yield put(setSyncLoader(true))
    yield ready()

    const responseConnectionStatus = yield getConnectionStatus()
    const connectionStatus = yield responseConnectionStatus?.payload?.connectionStatus

    yield put(setConnectionStatus(connectionStatus))
    yield subscribeClientEvents({ eventType: SubscriptionEventType.CONNECTION_STATUS })

    if (isStatusConnected(connectionStatus)) {
      yield fetchDashboardItemsSaga()
    } else {
      yield put(setNotification({ isOpen: true, type: NO_INTERNET_CONNECTION }))
    }

    if (isWebPlatform) {
      yield requestLayoutTypeSaga()
      yield subscribeClientEvents({ eventType: SubscriptionEventType.LAYOUT_TYPE })
    }
  } catch (e) {
    console.error('initAppSaga error: ', e)
  } finally {
    yield put(setMainLoader(false))
    yield put(setSyncLoader(false))
  }
}

export function* requestLayoutTypeSaga(): GeneratorFunction {
  try {
    const response = yield getLayoutType()
    const result = yield response?.payload?.layoutType

    if (result) yield put(setLayoutType(result))
  } catch (e) {
    console.error('requestLayoutTypeSaga error: ', e)
  }
}

export function* fetchDashboardItemsSaga(): GeneratorFunction {
  try {
    const response = yield bridge?.sendBotEvent({
      method: METHODS.getDashboard,
      params: {},
    })
    const responseStatus = response?.payload?.status
    const responseResult = response?.payload?.result

    if (responseStatus === STATUS_OK) {
      const services = responseResult?.services || []
      const chats = responseResult?.chats || []
      const contacts = responseResult?.contacts || []

      yield put(setDashboardItems({ services, chats, contacts }))
    }
  } catch (e) {
    console.error('fetchDashboardItemsSaga error: ', e)
  }
}

export function* searchForNewDashboardItemsSaga({ payload: querySearch }: searchForNewDashboardItemsActionType): GeneratorFunction {
  let startTime = 0

  try {
    startTime = performance.now()
    yield put(setSearchLoader(true))

    const servicesResponse = yield bridge?.sendBotEvent({
      method: METHODS.getServices,
      params: { querySearch },
    })
    const services = [...(servicesResponse?.payload?.result?.services || [])]

    const chatsResponse = yield getChats({ filter: querySearch })
    const chats = [...(chatsResponse?.payload?.chats || [])]

    const contactsResponse = yield searchCorporatePhonebook({ filter: querySearch })
    const contacts = [...(contactsResponse?.payload?.corpPhonebookEntries || []), ...(contactsResponse?.payload?.trustSearchEntries || [])]

    yield put(setFoundItemsForDashboard({ services, chats, contacts }))
  } catch (e) {
    console.error('searchForNewDashboardItemsSaga error: ', e)
  } finally {
    const endTime = performance.now()
    const loaderDisplayTime = endTime - startTime

    loaderDisplayTime < MIN_SEARCH_LOADER_DISPLAY_TIME && (yield delay(MIN_SEARCH_LOADER_DISPLAY_TIME - loaderDisplayTime))
    yield put(setSearchLoader(false))
  }
}

export function* addItemToDashboardSaga({ payload: { entityType, entity } }: addItemToDashboardActionType): GeneratorFunction {
  try {
    yield put(setMainLoader(true))

    const { services = [], chats = [], contacts = [] } = yield select(getDashboardItems)
    const isServices = isServiceType(entityType)
    const isChats = isChatType(entityType)
    const isContacts = isContactType(entityType)

    if (isServices && services.length === MAX_SECTION_ITEMS) {
      yield put(setNotification({ isOpen: true, type: SECTION_TYPE.services }))
      return
    }

    if (isChats && chats.length === MAX_SECTION_ITEMS) {
      yield put(setNotification({ isOpen: true, type: SECTION_TYPE.chats }))
      return
    }

    if (isContacts && contacts.length === MAX_SECTION_ITEMS) {
      yield put(setNotification({ isOpen: true, type: SECTION_TYPE.contacts }))
      return
    }

    const orderValue = generateNextOrderValue({ entityType, services, chats, contacts })

    const response = yield bridge?.sendBotEvent({
      method: METHODS.postDashboard,
      params: { entityType, entity },
    })

    if (response?.payload?.result === STATUS_SUCCESS) {
      const entitiesType = `${entityType}s` as DashboardItemTypes
      yield put(updateItemsOnDashboard({ entity: { ...entity, orderValue }, entityType: entitiesType }))
    }
  } catch (e) {
    console.error('addItemToDashboardSaga error: ', e)
  } finally {
    yield put(setMainLoader(false))
  }
}

export function* removeItemFromDashboardSaga({ payload: { entityType, entityId } }: removeItemFromDashboardActionType): GeneratorFunction {
  try {
    yield put(setMainLoader(true))

    let { services = [], chats = [], contacts = [] } = yield select(getDashboardItems)

    if (isServiceType(entityType)) {
      services = [...services.filter(({ smartappHuid }: ServiceState) => smartappHuid !== entityId)]
    } else if (isChatType(entityType)) {
      chats = [...chats.filter(({ groupChatId }: ChatState) => groupChatId !== entityId)]
    } else {
      contacts = [...contacts.filter((contact: ContactState) => generateContactUserHuid(contact) !== entityId)]
    }

    const response = yield bridge?.sendBotEvent({
      method: METHODS.deleteDashboard,
      params: { entityType, entityId },
    })

    if (response?.payload?.result === STATUS_SUCCESS) {
      yield put(setDashboardItems({ services, chats, contacts }))
    }
  } catch (e) {
    console.error('removeItemFromDashboardSaga error: ', e)
  } finally {
    yield put(setMainLoader(false))
  }
}

export function* changeDashboardItemsOrderSaga({ payload: { entityType, entities } }: changeDashboardItemsOrderActionType): GeneratorFunction {
  try {
    yield put(setMainLoader(true))

    let { services, chats, contacts } = yield select(getDashboardItems)
    let entitiesOrder

    if (isServiceType(entityType)) {
      services = [...entities]
      entitiesOrder = entities.map(({ smartappHuid: id, orderValue }) => ({ id, orderValue }))
    } else if (isChatType(entityType)) {
      chats = [...entities]
      entitiesOrder = entities.map(({ groupChatId: id, orderValue }) => ({ id, orderValue }))
    } else {
      contacts = [...entities]
      entitiesOrder = entities.map((entity) => ({ id: generateContactUserHuid(entity as ContactState), orderValue: entity.orderValue }))
    }

    const response = yield bridge?.sendBotEvent({
      method: METHODS.patchDashboardOrdering,
      params: { entityType, entitiesOrder },
    })

    if (response?.payload?.result === STATUS_SUCCESS) {
      yield put(setDashboardItems({ services, chats, contacts }))
    }
  } catch (e) {
    console.error('changeDashboardItemsOrderSaga error: ', e)
  } finally {
    yield put(setMainLoader(false))
  }
}

export function* openSmartAppSaga({ payload: appId }: openSmartAppActionType): GeneratorFunction {
  try {
    yield openSmartApp({ appId })
  } catch (e) {
    console.error('openSmartAppSaga error: ', e)
  }
}

export function* openGroupChatSaga({ payload: groupChatId }: openGroupChatActionType): GeneratorFunction {
  try {
    yield openGroupChat({ groupChatId })
  } catch (e) {
    console.error('openGroupChatSaga error: ', e)
  }
}

export function* openContactCardSaga({ payload: userHuid }: openContactCardActionType): GeneratorFunction {
  try {
    yield openContactCard({ userHuid })
  } catch (e) {
    console.error('openContactCardSaga error: ', e)
  }
}

export function* resetDashboardStateSaga(): GeneratorFunction {
  try {
    yield put(setMainLoader(true))
    yield put(setSyncLoader(false))
    yield put(setSearchLoader(false))
    yield put(resetNotification())
    yield put(setDashboardItems({ services: null, chats: null, contacts: null }))
    yield put(resetFoundItemsForDashboard())
    history.push(ROUTES_PATH.dashboard)
    yield fetchDashboardItemsSaga()
  } catch (e) {
    console.error('resetDashboardStateSaga error: ', e)
  } finally {
    yield put(setMainLoader(false))
  }
}

export function* rootDashboardSaga() {
  yield all([
    takeEvery(INIT_APP, initAppSaga),
    takeEvery(FETCH_DASHBOARD_ITEMS, fetchDashboardItemsSaga),
    takeEvery(SEARCH_FOR_NEW_DASHBOARD_ITEMS, searchForNewDashboardItemsSaga),
    takeEvery(ADD_ITEM_TO_DASHBOARD, addItemToDashboardSaga),
    takeEvery(REMOVE_ITEM_FROM_DASHBOARD, removeItemFromDashboardSaga),
    takeEvery(CHANGE_DASHBOARD_ITEMS_ORDER, changeDashboardItemsOrderSaga),
    takeEvery(OPEN_SMART_APP, openSmartAppSaga),
    takeEvery(OPEN_GROUP_CHAT, openGroupChatSaga),
    takeEvery(OPEN_CONTACT_CARD, openContactCardSaga),
    takeEvery(RESET_DASHBOARD_STATE, resetDashboardStateSaga),
  ])
}
