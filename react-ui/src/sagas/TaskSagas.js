/* eslint no-underscore-dangle: 0 */
import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import Alert from 'react-s-alert';
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
    Alert.success('Task add success', {
      customFields: {
        bsStyle: 'success',
      },
    });
  } catch (e) {
    yield put(TaskActions.saveTaskRejected(e));
    yield call(payload.reject);
    Alert.error('Task add fail', {
      customFields: {
        bsStyle: 'danger',
      },
    });
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
    Alert.info('Task update success', {
      customFields: {
        bsStyle: 'info',
      },
    });
  } catch (e) {
    yield put(TaskActions.updateTaskRejected(e));
    yield call(payload.reject);
    Alert.error('Task update fail', {
      customFields: {
        bsStyle: 'danger',
      },
    });
  }
}

export function* deleteTask({ payload }) {
  try {
    const taskList = yield call(deleteTaskApi, payload);
    yield put(TaskActions.deleteTaskFulfilled(taskList));
    yield put(TaskActions.updatePickAreaTaskList(payload));
    Alert.info('Task delete success', {
      customFields: {
        bsStyle: 'warning',
      },
    });
  } catch (e) {
    yield put(TaskActions.deleteTaskRejected(e));
    Alert.error('Task delete fail', {
      customFields: {
        bsStyle: 'danger',
      },
    });
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

export function* pickAreaTaskList(_id) {
  yield put(TaskActions.pickAreaTaskList(_id));
}
