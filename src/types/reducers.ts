import { RouterState } from 'connected-react-router'
import { CONNECTION_STATUS, LAYOUT_TYPES, PLATFORMS } from '../constants/constants'
import { DashboardItem, TContact } from './types'

export interface AppEvent {
  ref?: string | null
  type: string
  payload: any
  files: any[] | null
}

export interface UiState {
  platform: PLATFORMS
  theme: string
  layoutType: LAYOUT_TYPES
  connectionStatus: CONNECTION_STATUS
  mainLoader: boolean
  syncLoader: boolean
  searchLoader: boolean
  notification: {
    isOpen: boolean
    type: string
  }
}

export interface ServiceState {
  appId: string
  smartappHuid: string
  name: string
  avatar: string | null
  orderValue: number
}

export interface ChatState {
  groupChatId: string
  name: string
  avatar: string | null
  orderValue: number
}

export interface ContactState {
  userHuid: string
  name: string | null
  avatar: string | null
  company: string | null
  companyPosition: string | null
  contacts: TContact[]
  orderValue: number
}

export interface DashboardItems {
  services: ServiceState[] | null
  chats: ChatState[] | null
  contacts: ContactState[] | null
}

export interface DashboardState {
  services: ServiceState[] | null
  chats: ChatState[] | null
  contacts: ContactState[] | null
  searchResults: {
    services: ServiceState[] | null
    chats: ChatState[] | null
    contacts: ContactState[] | null
  }
}

export interface ApplicationState {
  ui: UiState
  router: RouterState
  dashboard: DashboardState
}

export type DashboardItemTypes = 'services' | 'chats' | 'contacts'

export type TSetFoundItemsForDashboard = {
  services: ServiceState[] | null
  chats: ChatState[] | null
  contacts: ContactState[] | null
}

export type TAddItemToDashboard = { entity: DashboardItem; entityType: string }
export type TUpdateItemsOnDashboard = { entity: DashboardItem; entityType: DashboardItemTypes }
export type TRemoveItemFromDashboard = { entityId: string; entityType: string }
export type TChangeDashboardItemsOrder = { entityType: string; entities: DashboardItem[] }
export type TSetNotification = { isOpen: boolean; type: string }
