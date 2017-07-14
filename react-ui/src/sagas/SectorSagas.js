import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import * as SectorActions from '../actions/SectorActions';

const url = '/api/v1/sectors';

export function saveSectorApi(sector) {
  return axios.post(url, sector);
}

export function* saveSector({ payload }) {
  yield put(SectorActions.saveSectorPending());
  try {
    const sectors = yield call(saveSectorApi, payload.sector);
    yield put(SectorActions.saveSectorFulfilled(sectors));
    yield call(payload.resolve);
  } catch (e) {
    yield put(SectorActions.saveSectorRejected(e));
    yield call(payload.reject);
  }
}
