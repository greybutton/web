import { fork } from 'redux-saga/effects';
import { watchSaveSector } from './watchers';

export default function* root() {
  yield fork(watchSaveSector);
}
