import { fork, all } from 'redux-saga/effects';
import root from './index.js';
import {
  watchSaveSector,
  watchRequestSectors,
  watchRequestSector,
  watchUpdateSector,
  watchUpdateSectorOrder,
  watchSaveTask,
  watchRequestTasks,
  watchRequestTask,
  watchUpdateTask,
  watchUpdateImportantTasksOrder,
} from './watchers';

describe('test root saga', () => {
  it('should yield array watchers saga', () => {
    expect(root().next().value).toEqual(
      all([
        fork(watchSaveSector),
        fork(watchRequestSectors),
        fork(watchRequestSector),
        fork(watchUpdateSector),
        fork(watchUpdateSectorOrder),
        fork(watchSaveTask),
        fork(watchRequestTasks),
        fork(watchRequestTask),
        fork(watchUpdateTask),
        fork(watchUpdateImportantTasksOrder),
      ]),
    );
  });
});
