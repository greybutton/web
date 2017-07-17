import { takeLatest } from 'redux-saga/effects';
import { saveSector, fetchSectors, fetchSector, updateSector } from './SectorSagas';

export function* watchSaveSector() {
  yield takeLatest('SAVE_SECTOR', saveSector);
}

export function* watchRequestSectors() {
  yield takeLatest('REQUEST_SECTORS', fetchSectors);
}

export function* watchRequestSector() {
  yield takeLatest('REQUEST_SECTOR', fetchSector);
}

export function* watchUpdateSector() {
  yield takeLatest('UPDATE_SECTOR', updateSector);
}
