import { fork, all } from 'redux-saga/effects';
import root from './index.js';
import * as Watchers from './watchers';

describe('test root saga', () => {
  it('should yield array watchers saga', () => {
    expect(root().next().value).toEqual(
      all([
        fork(Watchers.watchSaveArea),
        fork(Watchers.watchRequestAreaList),
        fork(Watchers.watchRequestArea),
        fork(Watchers.watchUpdateArea),
        fork(Watchers.watchUpdateAreaListOrder),
        fork(Watchers.watchSaveTask),
        fork(Watchers.watchRequestTaskList),
        fork(Watchers.watchRequestTask),
        fork(Watchers.watchUpdateTask),
        fork(Watchers.watchDeleteTask),
        fork(Watchers.watchUpdateTaskListImportantOrder),
        fork(Watchers.watchUpdateTaskListDailyOrder),
      ]),
    );
  });
});
