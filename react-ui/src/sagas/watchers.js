import { takeLatest } from 'redux-saga/effects';
import { saveSector, fetchSectors } from './SectorSagas';

export function* watchSaveSector() {
  yield takeLatest('SAVE_SECTOR', saveSector);
}

export function* watchRequestSectors() {
  yield takeLatest('REQUEST_SECTORS', fetchSectors);
}
