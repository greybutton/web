import { fork, all } from 'redux-saga/effects';
import * as Watchers from './watchers';

export default function* root() {
  yield all([
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
  ]);
}
