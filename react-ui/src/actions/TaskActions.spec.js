import * as TaskActions from './TaskActions.js';
import * as types from '../constants/actionTypes';

describe('Task Actions', () => {
  it('should create an action new task', () => {
    const expectedAction = {
      type: types.NEW_TASK,
    };
    expect(TaskActions.newTask()).toEqual(expectedAction);
  });
  describe('post task', () => {
    const task = {
      text: 'test task actions',
      time: '00:15',
      sector: 2,
      matrixQuarter: 'first',
      label: 'sector title',
    };
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
});
