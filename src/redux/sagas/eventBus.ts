import { eventChannel, EventChannel } from 'redux-saga'
import { all, call, take, put } from 'redux-saga/effects'
import { Bridge as bridge } from '@expressms/smartapp-sdk'
import { AppEvent } from '../../types/reducers'
import { CONNECTION_STATUS, METHODS, NO_INTERNET_CONNECTION } from '../../constants/constants'
import { isStatusConnected, persistor } from '../../helpers'
import { resetDashboardState } from '../actions/dashboard'
import { resetNotification, setConnectionStatus, setLayoutType, setNotification } from '../actions/ui'
import history from '../router'

function subscribeClientEvents(): EventChannel<AppEvent> {
  return eventChannel((emit) => {
    bridge?.onReceive((event) => emit(event as AppEvent))
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
      case METHODS.layoutType:
        yield put(setLayoutType(event?.payload?.layoutType))
        break
      case METHODS.connectionStatus:
        yield call(handleCheckConnectionStatus, event?.payload?.connectionStatus)
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
  yield persistor.purge()
  yield put(resetDashboardState())
}

export function* handleCheckConnectionStatus(connectionStatus: CONNECTION_STATUS) {
  yield put(setConnectionStatus(connectionStatus))

  if (isStatusConnected(connectionStatus)) {
    yield put(resetNotification())
  } else {
    yield put(setNotification({ isOpen: true, type: NO_INTERNET_CONNECTION }))
  }
}

export function* rootEventsBusSaga() {
  yield all([watchClientEvents()])
}
