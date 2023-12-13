import { createAction } from 'redux-actions'

export const SET_MAIN_LOADER = 'SET_MAIN_LOADER'
export const SET_SYNC_LOADER = 'SET_SYNC_LOADER'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION'

export const setMainLoader = createAction(SET_MAIN_LOADER, (mainLoader: boolean) => mainLoader)
export const setSyncLoader = createAction(SET_SYNC_LOADER, (syncLoader: boolean) => syncLoader)
export const setNotification = createAction(SET_NOTIFICATION, (
  { isOpen, type }: { isOpen: boolean; type: string }) => ({ isOpen, type })
)
export const resetNotification = createAction(RESET_NOTIFICATION)

export type setMainLoaderActionType = ReturnType<typeof setMainLoader>
export type setSyncLoaderActionType = ReturnType<typeof setSyncLoader>
export type setNotificationActionType = ReturnType<typeof setNotification>