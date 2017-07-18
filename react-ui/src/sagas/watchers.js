import { takeLatest } from 'redux-saga/effects';
import { saveSector, fetchSectors, fetchSector, updateSector } from './SectorSagas';
import * as types from '../constants/actionTypes';

export function* watchSaveSector() {
  yield takeLatest(types.SAVE_SECTOR, saveSector);
}

export function* watchRequestSectors() {
  yield takeLatest(types.REQUEST_SECTORS, fetchSectors);
}

export function* watchRequestSector() {
  yield takeLatest(types.REQUEST_SECTOR, fetchSector);
}

export function* watchUpdateSector() {
  yield takeLatest(types.UPDATE_SECTOR, updateSector);
}
