import { fork, all } from 'redux-saga/effects';
import root from './index.js';
import {
  watchSaveSector,
  watchRequestSectors,
  watchRequestSector,
  watchUpdateSector,
} from './watchers';

describe('test root saga', () => {
  it('should yield array watchers saga', () => {
    expect(root().next().value).toEqual(
      all([
        fork(watchSaveSector),
        fork(watchRequestSectors),
        fork(watchRequestSector),
        fork(watchUpdateSector),
      ]),
    );
  });
});
