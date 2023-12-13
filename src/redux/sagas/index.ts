import { all, fork } from 'redux-saga/effects'
import { rootDashboardSaga } from './dashboard'
import { rootEventsBusSaga } from './eventBus'

function* rootSaga() {
  yield all([fork(rootDashboardSaga), fork(rootEventsBusSaga)])
}

export default rootSaga