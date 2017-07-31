import * as TaskActions from './TaskActions.js';
import * as types from '../constants/actionTypes';

describe('Task Actions', () => {
  const task = {
    _id: 123,
    text: 'test task actions',
    time: '00:15',
    area: 2,
    quadrant: 'first',
    label: 'area title',
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
  describe('get task list', () => {
    it('should create an action request task list', () => {
      const expectedAction = {
        type: types.REQUEST_TASK_LIST,
      };
      expect(TaskActions.requestTaskList()).toEqual(expectedAction);
    });
    it('should create an action receive task list', () => {
      const expectedAction = {
        type: types.RECEIVE_TASK_LIST,
        payload: task,
      };
      expect(TaskActions.receiveTaskList(task)).toEqual(expectedAction);
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
            'tasks.important.0.area': 'Area task is required',
            'tasks.important.0.quadrant': 'Matrix quarter is required',
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
  describe('delete task', () => {
    it('should create an action to delete a task', () => {
      const expectedAction = {
        type: types.DELETE_TASK,
        payload: task._id,
      };
      expect(TaskActions.deleteTask(task._id)).toEqual(expectedAction);
    });
    it('should create an action to delete fulfilled a task', () => {
      const expectedAction = {
        type: types.DELETE_TASK_FULFILLED,
        payload: task,
      };
      expect(TaskActions.deleteTaskFulfilled(task)).toEqual(expectedAction);
    });
    it('should create an action to delete rejected a task', () => {
      const response = {
        status: 400,
        data: {
          message: 'DeleteError',
          errors: {},
        },
      };
      const expectedAction = {
        type: types.DELETE_TASK_REJECTED,
        payload: response,
      };
      expect(TaskActions.deleteTaskRejected(response)).toEqual(expectedAction);
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
        type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER,
        payload,
      };
      expect(TaskActions.updateTaskListImportantOrder(payload)).toEqual(expectedAction);
    });
    it('should create an action to update pending a important task order', () => {
      const expectedAction = {
        type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_PENDING,
      };
      expect(TaskActions.updateTaskListImportantOrderPending()).toEqual(expectedAction);
    });
    it('should create an action to update fulfilled a important task order', () => {
      const expectedAction = {
        type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_FULFILLED,
        payload: task,
      };
      expect(TaskActions.updateTaskListImportantOrderFulfilled(task)).toEqual(expectedAction);
    });
    it('should create an action to update rejected a important task order', () => {
      const error = {
        data: {
          message: 'OrderError',
          errors: {},
        },
      };
      const expectedAction = {
        type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_REJECTED,
        payload: error,
      };
      expect(TaskActions.updateTaskListImportantOrderRejected(error)).toEqual(expectedAction);
    });
  });
});
