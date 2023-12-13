import { handleActions } from 'redux-actions'
import { UiState } from '../../types/reducers'
import {
  SET_MAIN_LOADER,
  SET_SYNC_LOADER,
  SET_NOTIFICATION,
  RESET_NOTIFICATION,
  setMainLoaderActionType,
  setSyncLoaderActionType,
  setNotificationActionType,
} from '../actions/ui'

const initialState: UiState = {
  mainLoader: false,
  syncLoader: false,
  notification: {
    isOpen: false,
    type: '',
  }
}

const reducers = {
  [SET_MAIN_LOADER]: (state: UiState, { payload: mainLoader }: setMainLoaderActionType): UiState => ({
    ...state,
    mainLoader,
  }),
  [SET_SYNC_LOADER]: (state: UiState, { payload: syncLoader }: setSyncLoaderActionType): UiState => ({
    ...state,
    syncLoader,
  }),
  [SET_NOTIFICATION]: (state: UiState, { payload }: setNotificationActionType): UiState => ({
    ...state,
    notification: {
      ...payload,
    }
  }),
  [RESET_NOTIFICATION]: (state: UiState): UiState => ({
    ...state,
    notification: {
      isOpen: false,
      type: '',
    }
  }),
}

export const ui = handleActions<UiState, any>(reducers, initialState)