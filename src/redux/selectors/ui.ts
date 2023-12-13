import { createSelector } from 'reselect'
import { ApplicationState } from '../../types/reducers'

export const getMainLoader = createSelector(
  [(state: ApplicationState) => state.ui.mainLoader],
  (mainLoader) => mainLoader,
)

export const getSyncLoader = createSelector(
  [(state: ApplicationState) => state.ui.syncLoader],
  (syncLoader) => syncLoader,
)

export const getNotification = createSelector(
  [(state: ApplicationState) => state.ui.notification],
  (notification) => notification,
)