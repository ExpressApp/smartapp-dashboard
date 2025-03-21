import { ChatState, ContactState, ServiceState } from './reducers'

export interface DashboardItem {
  id: string
  appId?: string
  smartappHuid?: string
  groupChatId?: string
  userHuid?: string
  orderValue: number
  name: string
  avatar: string | null
  description?: string
  company?: string | null
  companyPosition?: string | null
  contacts?: TContact[]
  isAlreadyAdded: boolean
}

export type TSection = {
  name: string
  type: string
  items: DashboardItem[]
}

export type TContact = { userHuid: string; contact: string }
export type TIsEmpty = { services: ServiceState[] | null; chats: ChatState[] | null; contacts: ContactState[] | null }
export type TReorderItems = { items: DashboardItem[]; startIndex: number; endIndex: number }
export type TGenerateNextOrderValue = { entityType: string; services: ServiceState[]; chats: ChatState[]; contacts: ContactState[] }
