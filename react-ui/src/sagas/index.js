import axios from 'axios';
import { put, call, fork, takeLatest, all } from 'redux-saga/effects';
import * as SectorActions from '../actions/SectorActions';

const url = '/api/v1/sectors';

function saveSectorApi(sector) {
  return axios.post(url, sector);
}

export function* watchSaveSector() {
  yield takeLatest('SAVE_SECTOR', saveSector);
}

export function* saveSector({ payload }) {
  const sector = payload.sector;
  const resolve = payload.resolve;
  const reject = payload.reject;
  yield put(SectorActions.saveSectorPending());
  try {
    const sectors = yield call(saveSectorApi, sector);
    yield put(SectorActions.saveSectorFulfilled(sectors));
    yield call(resolve);
  } catch (e) {
    yield put(SectorActions.saveSectorRejected(e));
    yield call(reject);
  }
}

export default function* root() {
  yield all([fork(watchSaveSector)]);
}
