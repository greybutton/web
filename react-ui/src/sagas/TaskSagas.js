import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import * as TaskActions from '../actions/TaskActions';

const url = '/api/v1/tasks';

export function fetchTaskListApi() {
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

export function updateTaskListImportantOrderApi(payload) {
  return axios.put(`${url}/taskListImportantOrder/${payload._id}`, {
    indexes: { oldIndex: payload.oldIndex, newIndex: payload.newIndex },
  });
}

export function updateTaskListDailyOrderApi(payload) {
  return axios.put(`${url}/taskListDailyOrder/${payload._id}`, {
    indexes: { oldIndex: payload.oldIndex, newIndex: payload.newIndex },
  });
}

export function* saveTask({ payload }) {
  yield put(TaskActions.saveTaskPending());
  try {
    const taskList = yield call(saveTaskApi, payload.task);
    yield put(TaskActions.saveTaskFulfilled(taskList));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.saveTaskRejected(e));
    yield call(payload.reject);
  }
}

export function* fetchTaskList() {
  const taskList = yield call(fetchTaskListApi);
  yield put(TaskActions.receiveTaskList(taskList));
}

export function* fetchTask({ payload }) {
  const task = yield call(fetchTaskApi, payload);
  yield put(TaskActions.receiveTask(task));
}

export function* updateTask({ payload }) {
  yield put(TaskActions.updateTaskPending());
  try {
    const taskList = yield call(updateTaskApi, payload.task);
    yield put(TaskActions.updateTaskFulfilled(taskList));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.updateTaskRejected(e));
    yield call(payload.reject);
  }
}

export function* deleteTask({ payload }) {
  try {
    const taskList = yield call(deleteTaskApi, payload);
    yield put(TaskActions.deleteTaskFulfilled(taskList));
  } catch (e) {
    yield put(TaskActions.deleteTaskRejected(e));
  }
}

export function* updateTaskListImportantOrder({ payload }) {
  try {
    const taskList = yield call(updateTaskListImportantOrderApi, payload);
    yield put(TaskActions.updateTaskListImportantOrderFulfilled(taskList));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.updateTaskListImportantOrderRejected(e));
    yield call(payload.reject);
  }
}

export function* updateTaskListDailyOrder({ payload }) {
  try {
    const taskList = yield call(updateTaskListDailyOrderApi, payload);
    yield put(TaskActions.updateTaskListDailyOrderFulfilled(taskList));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.updateTaskListDailyOrderRejected(e));
    yield call(payload.reject);
  }
}
