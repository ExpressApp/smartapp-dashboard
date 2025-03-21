import { createAction } from 'redux-actions'
import { TSetNotification } from '../../types/reducers'
import { CONNECTION_STATUS, LAYOUT_TYPES, PLATFORMS } from '../../constants/constants'

export const SET_PLATFORM = 'SET_PLATFORM'
export const SET_THEME = 'SET_THEME'
export const SET_LAYOUT_TYPE = 'SET_LAYOUT_TYPE'
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS'
export const SET_MAIN_LOADER = 'SET_MAIN_LOADER'
export const SET_SYNC_LOADER = 'SET_SYNC_LOADER'
export const SET_SEARCH_LOADER = 'SET_SEARCH_LOADER'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION'

export const setPlatform = createAction(SET_PLATFORM, (platform: PLATFORMS) => platform)
export const setTheme = createAction(SET_THEME, (theme: string) => theme)
export const setLayoutType = createAction(SET_LAYOUT_TYPE, (layoutType: LAYOUT_TYPES) => layoutType)
export const setConnectionStatus = createAction(SET_CONNECTION_STATUS, (connectionStatus: CONNECTION_STATUS) => connectionStatus)
export const setMainLoader = createAction(SET_MAIN_LOADER, (mainLoader: boolean) => mainLoader)
export const setSyncLoader = createAction(SET_SYNC_LOADER, (syncLoader: boolean) => syncLoader)
export const setSearchLoader = createAction(SET_SEARCH_LOADER, (searchLoader: boolean) => searchLoader)
export const setNotification = createAction(SET_NOTIFICATION, ({ isOpen, type }: TSetNotification) => ({ isOpen, type }))
export const resetNotification = createAction(RESET_NOTIFICATION)

export type setPlatformActionType = ReturnType<typeof setPlatform>
export type setThemeActionType = ReturnType<typeof setTheme>
export type setLayoutTypeActionType = ReturnType<typeof setLayoutType>
export type setConnectionStatusActionType = ReturnType<typeof setConnectionStatus>
export type setMainLoaderActionType = ReturnType<typeof setMainLoader>
export type setSyncLoaderActionType = ReturnType<typeof setSyncLoader>
export type setSearchLoaderActionType = ReturnType<typeof setSearchLoader>
export type setNotificationActionType = ReturnType<typeof setNotification>
