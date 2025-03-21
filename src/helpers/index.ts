import { persistStore } from 'redux-persist'
import { isEmpty as _isEmpty, isArray, maxBy, isNull } from 'lodash'
import { configureStore } from '../redux/configureStore'
import { CONNECTION_STATUS, NO_INTERNET_CONNECTION, ORDER_VALUE_FIELD, SECTION_TYPE } from '../constants/constants'
import { ServiceState, ChatState, ContactState } from '../types/reducers'
import { DashboardItem, TGenerateNextOrderValue, TIsEmpty, TReorderItems } from '../types/types'

export const isNoInternetConnectionType = (type: string) => type === NO_INTERNET_CONNECTION
export const isServiceType = (type: string) => type === SECTION_TYPE.services
export const isChatType = (type: string) => type === SECTION_TYPE.chats
export const isContactType = (type: string) => type === SECTION_TYPE.contacts

export const isStatusConnected = (status: CONNECTION_STATUS) => status === CONNECTION_STATUS.connected

// "contacts" array may be empty
export const generateContactUserHuid = ({ userHuid, contacts }: ContactState) => contacts[0]?.userHuid || userHuid

export const generateServicesArray = (services: ServiceState[], addedServicesIds: string[] = []): DashboardItem[] =>
  services.map((service) => {
    const { smartappHuid: id } = service
    return { ...service, id, isAlreadyAdded: addedServicesIds.includes(id) }
  })

export const generateChatsArray = (chats: ChatState[], addedChatsIds: string[] = []): DashboardItem[] =>
  chats.map((chat) => {
    const { groupChatId: id } = chat
    return { ...chat, id, isAlreadyAdded: addedChatsIds.includes(id) }
  })

export const generateContactsArray = (contacts: ContactState[], addedContactsIds: string[] = []): DashboardItem[] =>
  contacts.map((contact) => {
    const { name: contactName, contacts, company, companyPosition } = contact
    const id = generateContactUserHuid(contact)
    const description = isNull(companyPosition) || isNull(company) ? '' : `${companyPosition}, ${company}`
    // "contacts" array may be empty
    const name = contactName || contacts[0]?.contact

    return { ...contact, id, userHuid: id, name, description, isAlreadyAdded: addedContactsIds.includes(id) }
  })

export const isEmpty = ({ services, chats, contacts }: TIsEmpty) => {
  const isServicesEmpty = isArray(services) && _isEmpty(services)
  const isChatsEmpty = isArray(chats) && _isEmpty(chats)
  const isContactsEmpty = isArray(contacts) && _isEmpty(contacts)

  return {
    isServicesEmpty,
    isChatsEmpty,
    isContactsEmpty,
    isDataEmpty: isServicesEmpty && isChatsEmpty && isContactsEmpty,
    isDataNull: isNull(services) && isNull(chats) && isNull(contacts),
  }
}

const findMaxOrderValue = (items: (ServiceState | ChatState | ContactState)[]) => maxBy(items, ORDER_VALUE_FIELD)?.orderValue || 0

export const generateNextOrderValue = ({ entityType, services, chats, contacts }: TGenerateNextOrderValue) => {
  let maxOrderValue = 0

  if (isServiceType(entityType)) maxOrderValue = findMaxOrderValue(services)
  if (isChatType(entityType)) maxOrderValue = findMaxOrderValue(chats)
  if (isContactType(entityType)) maxOrderValue = findMaxOrderValue(contacts)

  return maxOrderValue + 1
}

export const reorderItems = ({ items, startIndex, endIndex }: TReorderItems) => {
  const result = Array.from(items)

  result.forEach((item, index) => {
    if (startIndex > endIndex && index < startIndex && index >= endIndex) {
      item.orderValue = item.orderValue + 1
    } else if (startIndex < endIndex && index > startIndex && index <= endIndex) {
      item.orderValue = item.orderValue - 1
    }
  })

  const [removed] = result.splice(startIndex, 1)

  removed.orderValue = endIndex + 1
  result.splice(endIndex, 0, removed)

  return result
}

export const store = configureStore()
export const persistor = persistStore(store)
