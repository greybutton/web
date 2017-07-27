import * as TaskActions from './TaskActions.js';
import * as types from '../constants/actionTypes';

describe('Task Actions', () => {
  const task = {
    _id: 123,
    text: 'test task actions',
    time: '00:15',
    sector: 2,
    matrixQuarter: 'first',
    label: 'sector title',
  };
  it('should create an action new task', () => {
    const expectedAction = {
      type: types.NEW_TASK,
    };
    expect(TaskActions.newTask()).toEqual(expectedAction);
  });
  describe('post task', () => {
    it('should create an action to save a task', () => {
      const expectedAction = {
        type: types.SAVE_TASK,
        payload: task,
      };
      expect(TaskActions.saveTask(task)).toEqual(expectedAction);
    });
    it('should create an action to save pending a task', () => {
      const expectedAction = {
        type: types.SAVE_TASK_PENDING,
      };
      expect(TaskActions.saveTaskPending()).toEqual(expectedAction);
    });
    it('should create an action to save fulfilled a task', () => {
      const expectedAction = {
        type: types.SAVE_TASK_FULFILLED,
        payload: task,
      };
      expect(TaskActions.saveTaskFulfilled(task)).toEqual(expectedAction);
    });
    it('should create an action to save rejected a task', () => {
      const response = {
        status: 400,
        data: {
          message: 'ValidationError',
          errors: {},
        },
      };
      const expectedAction = {
        type: types.SAVE_TASK_REJECTED,
        payload: response,
      };
      expect(TaskActions.saveTaskRejected(response)).toEqual(expectedAction);
    });
  });
  describe('get tasks', () => {
    it('should create an action request tasks', () => {
      const expectedAction = {
        type: types.REQUEST_TASKS,
      };
      expect(TaskActions.requestTasks()).toEqual(expectedAction);
    });
    it('should create an action receive tasks', () => {
      const expectedAction = {
        type: types.RECEIVE_TASKS,
        payload: task,
      };
      expect(TaskActions.receiveTasks(task)).toEqual(expectedAction);
    });
  });
  describe('put task', () => {
    it('should create an action to request a task', () => {
      const expectedAction = {
        type: types.REQUEST_TASK,
        payload: task._id,
      };
      expect(TaskActions.requestTask(task._id)).toEqual(expectedAction);
    });
    it('should create an action to receive a task', () => {
      const expectedAction = {
        type: types.RECEIVE_TASK,
        payload: task,
      };
      expect(TaskActions.receiveTask(task)).toEqual(expectedAction);
    });
    it('should create an action to update a task', () => {
      const expectedAction = {
        type: types.UPDATE_TASK,
        payload: task,
      };
      expect(TaskActions.updateTask(task)).toEqual(expectedAction);
    });
    it('should create an action to update pending a task', () => {
      const expectedAction = {
        type: types.UPDATE_TASK_PENDING,
      };
      expect(TaskActions.updateTaskPending()).toEqual(expectedAction);
    });
    it('should create an action to update fulfilled a task', () => {
      const expectedAction = {
        type: types.UPDATE_TASK_FULFILLED,
        payload: task,
      };
      expect(TaskActions.updateTaskFulfilled(task)).toEqual(expectedAction);
    });
    it('should create an action to update rejected a task', () => {
      const response = {
        status: 400,
        data: {
          message: 'ValidationError',
          errors: {
            'tasks.important.0.text': 'Text task is required',
            'tasks.important.0.time': 'Time task is required',
            'tasks.important.0.sector': 'Sector task is required',
            'tasks.important.0.matrixQuarter': 'Matrix quarter is required',
          },
        },
      };
      const expectedAction = {
        type: types.UPDATE_TASK_REJECTED,
        payload: response,
      };
      expect(TaskActions.updateTaskRejected(response)).toEqual(expectedAction);
    });
  });
  describe('update important task order', () => {
    it('should create an action to update a important task order', () => {
      const payload = {
        oldIndex: 0,
        newIndex: 1,
        _id: task._id,
        resolve: () => {},
        reject: () => {},
      };
      const expectedAction = {
        type: types.UPDATE_IMPORTANT_TASKS_ORDER,
        payload,
      };
      expect(TaskActions.updateImportantTasksOrder(payload)).toEqual(expectedAction);
    });
    it('should create an action to update pending a important task order', () => {
      const expectedAction = {
        type: types.UPDATE_IMPORTANT_TASKS_ORDER_PENDING,
      };
      expect(TaskActions.updateImportantTasksOrderPending()).toEqual(expectedAction);
    });
    it('should create an action to update fulfilled a important task order', () => {
      const expectedAction = {
        type: types.UPDATE_IMPORTANT_TASKS_ORDER_FULFILLED,
        payload: task,
      };
      expect(TaskActions.updateImportantTasksOrderFulfilled(task)).toEqual(expectedAction);
    });
    it('should create an action to update rejected a important task order', () => {
      const error = {
        data: {
          message: 'OrderError',
          errors: {},
        },
      };
      const expectedAction = {
        type: types.UPDATE_IMPORTANT_TASKS_ORDER_REJECTED,
        payload: error,
      };
      expect(TaskActions.updateImportantTasksOrderRejected(error)).toEqual(expectedAction);
    });
  });
});
