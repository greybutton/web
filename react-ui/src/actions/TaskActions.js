import * as types from '../constants/actionTypes';

export function newTask() {
  return {
    type: types.NEW_TASK,
  };
}

export function saveTask(task) {
  return {
    type: types.SAVE_TASK,
    payload: task,
  };
}

export function saveTaskPending() {
  return {
    type: types.SAVE_TASK_PENDING,
  };
}

export function saveTaskFulfilled(task) {
  return {
    type: types.SAVE_TASK_FULFILLED,
    payload: task,
  };
}

export function saveTaskRejected(error) {
  return {
    type: types.SAVE_TASK_REJECTED,
    payload: error,
  };
}
