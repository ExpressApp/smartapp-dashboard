import { createSelector } from 'reselect'
import { CONNECTION_STATUS, LAYOUT_TYPES, PLATFORMS, THEMES } from '../../constants/constants'
import { ApplicationState } from '../../types/reducers'

export const getPlatform = createSelector([(state: ApplicationState) => state.ui.platform], (platform) => platform)
export const getIsWebPlatform = createSelector([(state: ApplicationState) => state.ui.platform], (platform) => platform === PLATFORMS.web)

export const getTheme = createSelector([(state: ApplicationState) => state.ui.theme], (theme) =>
  theme === THEMES.dark ? THEMES.dark : THEMES.default
)

export const getLayoutType = createSelector([(state: ApplicationState) => state.ui.layoutType], (layoutType) => layoutType)

export const getIsDisconnectedStatus = createSelector(
  [(state: ApplicationState) => state.ui.connectionStatus],
  (connectionStatus) => connectionStatus === CONNECTION_STATUS.disconnected
)

export const getIsMinimalLayoutType = createSelector(
  [(state: ApplicationState) => state.ui.layoutType],
  (layoutType) => layoutType === LAYOUT_TYPES.minimal
)

export const getIsFullLayoutType = createSelector(
  [(state: ApplicationState) => state.ui.layoutType],
  (layoutType) => layoutType === LAYOUT_TYPES.full
)

export const getMainLoader = createSelector([(state: ApplicationState) => state.ui.mainLoader], (mainLoader) => mainLoader)
export const getSyncLoader = createSelector([(state: ApplicationState) => state.ui.syncLoader], (syncLoader) => syncLoader)
export const getSearchLoader = createSelector([(state: ApplicationState) => state.ui.searchLoader], (searchLoader) => searchLoader)
export const getNotification = createSelector([(state: ApplicationState) => state.ui.notification], (notification) => notification)
