import { takeLatest } from 'redux-saga/effects';
import { saveSector } from './SectorSagas';

export function* watchSaveSector() {
  yield takeLatest('SAVE_SECTOR', saveSector);
}
