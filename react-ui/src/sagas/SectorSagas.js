import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import * as SectorActions from '../actions/SectorActions';

const url = '/api/v1/sectors';

export function fetchSectorsApi() {
  return axios.get(url);
}

export function fetchSectorApi(_id) {
  return axios.get(`${url}/${_id}`);
}

export function saveSectorApi(sector) {
  return axios.post(url, sector);
}

export function updateSectorApi(sector) {
  return axios.put(`${url}/${sector._id}`, sector);
}

export function updateSectorOrderApi(payload) {
  return axios.put(`${url}/sectorOrder/${payload._id}`, {
    indexes: { oldIndex: payload.oldIndex, newIndex: payload.newIndex },
  });
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

export function* fetchSectors() {
  const sectors = yield call(fetchSectorsApi);
  yield put(SectorActions.receiveSectors(sectors));
}

export function* fetchSector({ payload }) {
  const sector = yield call(fetchSectorApi, payload);
  yield put(SectorActions.receiveSector(sector));
}

export function* updateSector({ payload }) {
  yield put(SectorActions.updateSectorPending());
  try {
    const sectors = yield call(updateSectorApi, payload.sector);
    yield put(SectorActions.updateSectorFulfilled(sectors));
    yield call(payload.resolve);
  } catch (e) {
    yield put(SectorActions.updateSectorRejected(e));
    yield call(payload.reject);
  }
}

export function* updateSectorOrder({ payload }) {
  try {
    const sectors = yield call(updateSectorOrderApi, payload);
    yield put(SectorActions.updateSectorOrderFulfilled(sectors));
    yield call(payload.resolve);
  } catch (e) {
    yield put(SectorActions.updateSectorOrderRejected(e));
    yield call(payload.reject);
  }
}
