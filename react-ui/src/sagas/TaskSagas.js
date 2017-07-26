import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import * as TaskActions from '../actions/TaskActions';

const url = '/api/v1/tasks';

export function fetchTasksApi() {
  return axios.get(url);
}

export function saveTaskApi(task) {
  return axios.post(url, task);
}

export function updateImportantTasksOrderApi(payload) {
  return axios.put(`${url}/tasksImportantOrder/${payload._id}`, {
    indexes: { oldIndex: payload.oldIndex, newIndex: payload.newIndex },
  });
}

export function* saveTask({ payload }) {
  yield put(TaskActions.saveTaskPending());
  try {
    const tasks = yield call(saveTaskApi, payload.task);
    yield put(TaskActions.saveTaskFulfilled(tasks));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.saveTaskRejected(e));
    yield call(payload.reject);
  }
}

export function* fetchTasks() {
  const tasks = yield call(fetchTasksApi);
  yield put(TaskActions.receiveTasks(tasks));
}

export function* updateImportantTasksOrder({ payload }) {
  try {
    const tasks = yield call(updateImportantTasksOrderApi, payload);
    yield put(TaskActions.updateImportantTasksOrderFulfilled(tasks));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.updateImportantTasksOrderRejected(e));
    yield call(payload.reject);
  }
}
