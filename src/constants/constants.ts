export const MAX_SECTION_ITEMS = 9
export const MIN_QUERY_LENGTH = 3
export const MIN_SEARCH_LOADER_DISPLAY_TIME = 2000
export const NUMBER_OF_SKELETONS = 2
export const NUMBER_OF_CONTACTS_SKELETONS = 3
export const CONTACTS_SECTION_INDEX = 2
export const SKELETON_HEIGHT = 20
export const CIRCLE_SKELETON_SIZE = 32

export const STATUS_OK = 'ok'
export const STATUS_SUCCESS = 'success'
export const SEARCH_FIELD_TYPE = 'search'
export const EMPTY_INPUT_HINT = ''
export const ORDER_VALUE_FIELD = 'orderValue'
export const NO_INTERNET_CONNECTION = 'noInternetConnection'

export enum PLATFORMS {
  web = 'web',
  ios = 'ios',
  android = 'android',
}

export enum LAYOUT_TYPES {
  full = 'full',
  half = 'half',
  minimal = 'minimal',
}

export enum CONNECTION_STATUS {
  connected = 'connected',
  disconnected = 'disconnected',
}

export enum THEMES {
  dark = 'dark',
  default = 'default',
}

export enum AVATAR_SIZE {
  small = 'small',
  normal = 'normal',
}

export const AVATAR_SIZE_VALUE: { [key: string]: 32 | 48 } = {
  [AVATAR_SIZE.small]: 32,
  [AVATAR_SIZE.normal]: 48,
}

export enum TEXT_SIZE {
  small = 'small',
  major = 'major',
}

export enum SECTION_TYPE {
  services = 'service',
  chats = 'chat',
  contacts = 'contact',
}

export enum ROUTES_PATH {
  dashboard = '/',
  add = 'add',
  settings = 'settings',
}

export enum METHODS {
  getDashboard = 'dashboard.get',
  getServices = 'services.get',
  postDashboard = 'dashboard.post',
  deleteDashboard = 'dashboard.delete',
  patchDashboardOrdering = 'dashboard_ordering.patch',
  backPressed = 'back_pressed',
  cleanCache = 'clean_cache',
  layoutType = 'layout_type',
  connectionStatus = 'connection_status',
}
