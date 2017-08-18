import * as types from '../constants/actionTypes';

export function requestTaskList() {
  return {
    type: types.REQUEST_TASK_LIST,
  };
}

export function receiveTaskList(taskList) {
  return {
    type: types.RECEIVE_TASK_LIST,
    payload: taskList,
  };
}

export function newTask() {
  return {
    type: types.NEW_TASK,
  };
}

export function requestTask(_id) {
  return {
    type: types.REQUEST_TASK,
    payload: _id,
  };
}

export function receiveTask(task) {
  return {
    type: types.RECEIVE_TASK,
    payload: task,
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

export function updateTask(task) {
  return {
    type: types.UPDATE_TASK,
    payload: task,
  };
}

export function updateTaskPending() {
  return {
    type: types.UPDATE_TASK_PENDING,
  };
}

export function updateTaskFulfilled(taskList) {
  return {
    type: types.UPDATE_TASK_FULFILLED,
    payload: taskList,
  };
}

export function updateTaskRejected(error) {
  return {
    type: types.UPDATE_TASK_REJECTED,
    payload: error,
  };
}

export function deleteTask(id) {
  return {
    type: types.DELETE_TASK,
    payload: id,
  };
}

export function deleteTaskFulfilled(taskList) {
  return {
    type: types.DELETE_TASK_FULFILLED,
    payload: taskList,
  };
}

export function deleteTaskRejected(error) {
  return {
    type: types.DELETE_TASK_REJECTED,
    payload: error,
  };
}

export function updateTaskListImportantOrder(payload) {
  return {
    type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER,
    payload,
  };
}

export function updateTaskListImportantOrderPending() {
  return {
    type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_PENDING,
  };
}

export function updateTaskListImportantOrderFulfilled(taskList) {
  return {
    type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_FULFILLED,
    payload: taskList,
  };
}

export function updateTaskListImportantOrderRejected(error) {
  return {
    type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_REJECTED,
    payload: error,
  };
}

export function updateTaskListDailyOrder(payload) {
  return {
    type: types.UPDATE_TASK_LIST_DAILY_ORDER,
    payload,
  };
}

export function updateTaskListDailyOrderPending() {
  return {
    type: types.UPDATE_TASK_LIST_DAILY_ORDER_PENDING,
  };
}

export function updateTaskListDailyOrderFulfilled(taskList) {
  return {
    type: types.UPDATE_TASK_LIST_DAILY_ORDER_FULFILLED,
    payload: taskList,
  };
}

export function updateTaskListDailyOrderRejected(error) {
  return {
    type: types.UPDATE_TASK_LIST_DAILY_ORDER_REJECTED,
    payload: error,
  };
}

export function pickAreaTaskList(_id) {
  return {
    type: types.PICK_AREA_TASK_LIST,
    payload: _id,
  };
}

export function updatePickAreaTaskList(payload) {
  return {
    type: types.UPDATE_PICK_AREA_TASK_LIST,
    payload,
  };
}
