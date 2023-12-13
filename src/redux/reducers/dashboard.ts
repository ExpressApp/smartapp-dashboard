import { handleActions } from 'redux-actions'
import { DashboardState } from '../../types/reducers'
import {
  SET_DASHBOARD_ITEMS,
  SET_FOUND_ITEMS_FOR_DASHBOARD,
  RESET_FOUND_ITEMS_FOR_DASHBOARD,
  UPDATE_ITEMS_ON_DASHBOARD,
  setDashboardItemsActionType,
  setFoundItemsForDashboardActionType,
  updateItemsOnDashboardActionType,
} from '../actions/dashboard'

const initialState: DashboardState = {
  services: null,
  chats: null,
  contacts: null,
  searchResults: {
    services: null,
    chats: null,
    contacts: null,
  }
}

const reducers = {
  [SET_DASHBOARD_ITEMS]: (state: DashboardState, { payload: { services, chats, contacts } }: setDashboardItemsActionType): DashboardState => ({
    ...state,
    services,
    chats,
    contacts,
  }),
  [SET_FOUND_ITEMS_FOR_DASHBOARD]: (
    state: DashboardState, { payload: { services, chats, contacts } }: setFoundItemsForDashboardActionType
  ): DashboardState => ({
    ...state,
    searchResults: {
      services,
      chats,
      contacts,
    }
  }),
  [RESET_FOUND_ITEMS_FOR_DASHBOARD]: (state: DashboardState): DashboardState => ({
    ...state,
    searchResults: {
      services: null,
      chats: null,
      contacts: null,
    }
  }),
  [UPDATE_ITEMS_ON_DASHBOARD]: (
    state: DashboardState, { payload: { entity, entityType } }: updateItemsOnDashboardActionType
  ): DashboardState => ({
    ...state,
    [entityType]: [...(state[entityType] || []), entity],
  }),
}

export const dashboard = handleActions<DashboardState, any>(reducers, initialState)