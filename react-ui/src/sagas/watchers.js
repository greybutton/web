import { takeLatest } from 'redux-saga/effects';
import * as AreaSagas from './AreaSagas';
import * as TaskSagas from './TaskSagas';
import * as types from '../constants/actionTypes';

export function* watchSaveArea() {
  yield takeLatest(types.SAVE_AREA, AreaSagas.saveArea);
}

export function* watchRequestAreaList() {
  yield takeLatest(types.REQUEST_AREA_LIST, AreaSagas.fetchAreaList);
}

export function* watchRequestArea() {
  yield takeLatest(types.REQUEST_AREA, AreaSagas.fetchArea);
}

export function* watchUpdateArea() {
  yield takeLatest(types.UPDATE_AREA, AreaSagas.updateArea);
}

export function* watchUpdateAreaListOrder() {
  yield takeLatest(types.UPDATE_AREA_LIST_ORDER, AreaSagas.updateAreaListOrder);
}

export function* watchSaveTask() {
  yield takeLatest(types.SAVE_TASK, TaskSagas.saveTask);
}

export function* watchRequestTaskList() {
  yield takeLatest(types.REQUEST_TASK_LIST, TaskSagas.fetchTaskList);
}

export function* watchRequestTask() {
  yield takeLatest(types.REQUEST_TASK, TaskSagas.fetchTask);
}

export function* watchUpdateTask() {
  yield takeLatest(types.UPDATE_TASK, TaskSagas.updateTask);
}

export function* watchDeleteTask() {
  yield takeLatest(types.DELETE_TASK, TaskSagas.deleteTask);
}

export function* watchUpdateTaskListImportantOrder() {
  yield takeLatest(types.UPDATE_TASK_LIST_IMPORTANT_ORDER, TaskSagas.updateTaskListImportantOrder);
}

export function* watchUpdateTaskListDailyOrder() {
  yield takeLatest(types.UPDATE_TASK_LIST_DAILY_ORDER, TaskSagas.updateTaskListDailyOrder);
}
