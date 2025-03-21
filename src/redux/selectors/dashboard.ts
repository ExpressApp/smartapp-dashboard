import { createSelector } from 'reselect'
import { ApplicationState } from '../../types/reducers'
import { generateContactUserHuid } from '../../helpers'

export const getDashboardItems = createSelector([(state: ApplicationState) => state.dashboard], ({ services, chats, contacts }) => ({
  services,
  chats,
  contacts,
}))

export const getFoundItemsForDashboard = createSelector(
  [(state: ApplicationState) => state.dashboard.searchResults],
  ({ services, chats, contacts }) => ({ services, chats, contacts })
)

export const getDashboardItemsIds = createSelector([(state: ApplicationState) => state.dashboard], ({ services, chats, contacts }) => ({
  servicesIds: services?.map(({ smartappHuid }) => smartappHuid) || [],
  chatsIds: chats?.map(({ groupChatId }) => groupChatId) || [],
  contactsIds: contacts?.map((contact) => generateContactUserHuid(contact)) || [],
}))
