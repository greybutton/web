import { fork, all } from 'redux-saga/effects';
import { watchSaveSector, watchRequestSectors } from './watchers';

export default function* root() {
  yield all([fork(watchSaveSector), fork(watchRequestSectors)]);
}
