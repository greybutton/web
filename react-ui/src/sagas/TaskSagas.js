import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import * as TaskActions from '../actions/TaskActions';

const url = '/api/v1/tasks';

export function fetchTasksApi() {
  return axios.get(url);
}

export function fetchTaskApi(_id) {
  return axios.get(`${url}/${_id}`);
}

export function saveTaskApi(task) {
  return axios.post(url, task);
}

export function updateTaskApi(task) {
  return axios.put(`${url}/${task._id}`, task);
}

export function deleteTaskApi(id) {
  return axios.delete(`${url}/${id}`);
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

export function* fetchTask({ payload }) {
  const task = yield call(fetchTaskApi, payload);
  yield put(TaskActions.receiveTask(task));
}

export function* updateTask({ payload }) {
  yield put(TaskActions.updateTaskPending());
  try {
    const tasks = yield call(updateTaskApi, payload.task);
    yield put(TaskActions.updateTaskFulfilled(tasks));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.updateTaskRejected(e));
    yield call(payload.reject);
  }
}

export function* deleteTask({ payload }) {
  try {
    const tasks = yield call(deleteTaskApi, payload);
    yield put(TaskActions.deleteTaskFulfilled(tasks));
  } catch (e) {
    yield put(TaskActions.deleteTaskRejected(e));
  }
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
