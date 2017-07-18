import { takeLatest } from 'redux-saga/effects';
import * as SectorSagas from './SectorSagas';
import * as types from '../constants/actionTypes';

export function* watchSaveSector() {
  yield takeLatest(types.SAVE_SECTOR, SectorSagas.saveSector);
}

export function* watchRequestSectors() {
  yield takeLatest(types.REQUEST_SECTORS, SectorSagas.fetchSectors);
}

export function* watchRequestSector() {
  yield takeLatest(types.REQUEST_SECTOR, SectorSagas.fetchSector);
}

export function* watchUpdateSector() {
  yield takeLatest(types.UPDATE_SECTOR, SectorSagas.updateSector);
}
