import { eventChannel, EventChannel } from 'redux-saga'
import { all, call, take, put } from 'redux-saga/effects'
import { Bridge as bridge } from '@expressms/smartapp-sdk'
import { AppEvent } from '../../types/reducers'
import { METHODS } from '../../constants/constants'
import { persistor } from '../../helpers'
import { resetDashboardState } from '../actions/dashboard'
import history from '../router'

function subscribeClientEvents(): EventChannel<AppEvent> {
  return eventChannel(emit => {
    bridge?.onReceive((event) => emit(event as any))
    return () => {}
  })
}

function* watchClientEvents() {
  const channel: EventChannel<AppEvent> = yield call(subscribeClientEvents)

  while (true) {
    const event: AppEvent = yield take(channel)

    switch (event.type) {
      case METHODS.backPressed:
        yield call(handleClientBackPressedEvent)
        break
      case METHODS.cleanCache:
        yield call(handleCleanCache)
        break
      default:
        break
    }
  }
}

function handleClientBackPressedEvent() {
  history.back()
}

function* handleCleanCache() {
  const registrations: ServiceWorkerRegistration[] = yield navigator.serviceWorker.getRegistrations()
  const unregisterPromises = registrations.map(registration => registration.unregister())

  const allCaches: string[] = yield caches.keys()
  const cacheDeletionPromises = allCaches.map(cache => caches.delete(cache))

  yield Promise.all([...unregisterPromises, ...cacheDeletionPromises])

  yield persistor.purge()
  yield put(resetDashboardState())
}

export function* rootEventsBusSaga() {
  yield all([watchClientEvents()])
}