import { RouterState } from 'connected-react-router'

export interface AppEvent {
  ref?: string | null
  type: string
  payload: any
  files: any[] | null
}

export interface UiState {
  mainLoader: boolean
  syncLoader: boolean
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
  name: string
  avatar: string | null
  company: string | null
  companyPosition: string | null
  contacts: Array<{ userHuid: string }>
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