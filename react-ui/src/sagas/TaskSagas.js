import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import * as TaskActions from '../actions/TaskActions';

const url = '/api/v1/tasks';

export function saveTaskApi(task) {
  return axios.post(url, task);
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
