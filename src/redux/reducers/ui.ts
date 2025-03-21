import { handleActions } from 'redux-actions'
import { UiState } from '../../types/reducers'
import {
  RESET_NOTIFICATION,
  SET_CONNECTION_STATUS,
  SET_LAYOUT_TYPE,
  SET_MAIN_LOADER,
  SET_NOTIFICATION,
  SET_PLATFORM,
  SET_SEARCH_LOADER,
  SET_SYNC_LOADER,
  SET_THEME,
  setConnectionStatusActionType,
  setLayoutTypeActionType,
  setMainLoaderActionType,
  setNotificationActionType,
  setPlatformActionType,
  setSearchLoaderActionType,
  setSyncLoaderActionType,
  setThemeActionType,
} from '../actions/ui'
import { CONNECTION_STATUS, LAYOUT_TYPES, PLATFORMS } from '../../constants/constants'

const initialState: UiState = {
  platform: PLATFORMS.web,
  theme: '',
  layoutType: LAYOUT_TYPES.minimal,
  connectionStatus: CONNECTION_STATUS.connected,
  mainLoader: false,
  syncLoader: false,
  searchLoader: false,
  notification: {
    isOpen: false,
    type: '',
  },
}

const reducers = {
  [SET_PLATFORM]: (state: UiState, { payload: platform }: setPlatformActionType): UiState => ({
    ...state,
    platform,
  }),
  [SET_THEME]: (state: UiState, { payload: theme }: setThemeActionType): UiState => ({
    ...state,
    theme,
  }),
  [SET_LAYOUT_TYPE]: (state: UiState, { payload: layoutType }: setLayoutTypeActionType): UiState => ({
    ...state,
    layoutType,
  }),
  [SET_CONNECTION_STATUS]: (state: UiState, { payload: connectionStatus }: setConnectionStatusActionType): UiState => ({
    ...state,
    connectionStatus,
  }),
  [SET_MAIN_LOADER]: (state: UiState, { payload: mainLoader }: setMainLoaderActionType): UiState => ({
    ...state,
    mainLoader,
  }),
  [SET_SYNC_LOADER]: (state: UiState, { payload: syncLoader }: setSyncLoaderActionType): UiState => ({
    ...state,
    syncLoader,
  }),
  [SET_SEARCH_LOADER]: (state: UiState, { payload: searchLoader }: setSearchLoaderActionType): UiState => ({
    ...state,
    searchLoader,
  }),
  [SET_NOTIFICATION]: (state: UiState, { payload: notification }: setNotificationActionType): UiState => ({
    ...state,
    notification,
  }),
  [RESET_NOTIFICATION]: (state: UiState): UiState => ({
    ...state,
    notification: {
      isOpen: false,
      type: '',
    },
  }),
}

export const ui = handleActions<UiState, any>(reducers, initialState)
