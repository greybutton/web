import TaskReducer, { defaultState } from './TaskReducer';
import * as types from '../constants/actionTypes';

describe('Task Reducer', () => {
  const task = {
    text: 'test task actions',
    time: '00:15',
    sector: 2,
    matrixQuarter: 'first',
    label: 'sector title',
  };
  it('should return the initial state', () => {
    expect(TaskReducer(undefined, {})).toEqual(defaultState);
  });
  describe('post task', () => {
    it('should handle SAVE_TASK_PENDING', () => {
      expect(
        TaskReducer(defaultState, {
          type: types.SAVE_TASK_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle SAVE_TASK_FULFILLED', () => {
      const data = {
        tasks: { important: [task], notImportant: [task], daily: [task] },
      };
      expect(
        TaskReducer(defaultState, {
          type: types.SAVE_TASK_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        dailyTasks: data.tasks.daily,
        importantTasks: data.tasks.important,
        matrixTasks: data.tasks.important.concat(data.tasks.notImportant),
      });
    });
    it('should handle SAVE_TASK_REJECTED', () => {
      const response = {
        status: 400,
        data: {
          errors: {
            'tasks.daily': {
              message: 'ValidationError',
              errors: {
                text: 'Text task is required',
                time: 'Time task is required',
                sector: 'Sector task is required',
                matrixQuarter: 'Matrix quater is required',
              },
            },
          },
        },
      };
      expect(
        TaskReducer(defaultState, {
          type: types.SAVE_TASK_REJECTED,
          payload: { response },
        }),
      ).toEqual({
        ...defaultState,
        errors: {
          global: 'ValidationError',
          text: 'Text task is required',
          time: 'Time task is required',
          sector: 'Sector task is required',
          matrixQuarter: 'Matrix quater is required',
        },
      });
    });
  });
  describe('get sectors', () => {
    it('should handle REQUEST_TASKS', () => {
      expect(
        TaskReducer(defaultState, {
          type: types.REQUEST_TASKS,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle RECEIVE_TASKS', () => {
      const data = {
        tasks: { important: [task], notImportant: [task], daily: [task] },
      };
      expect(
        TaskReducer(defaultState, {
          type: types.RECEIVE_TASKS,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        dailyTasks: data.tasks.daily,
        importantTasks: data.tasks.important,
        matrixTasks: data.tasks.important.concat(data.tasks.notImportant),
        loading: false,
      });
    });
  });
  describe('update important tasks order', () => {
    it('should handle UPDATE_IMPORTANT_TASKS_ORDER_PENDING', () => {
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_IMPORTANT_TASKS_ORDER_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle UPDATE_IMPORTANT_TASKS_ORDER_FULFILLED', () => {
      const data = {
        tasks: [task],
      };
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_IMPORTANT_TASKS_ORDER_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        importantTasks: [...data.tasks],
      });
    });
    it('should handle UPDATE_IMPORTANT_TASKS_ORDER_REJECTED', () => {
      const data = {
        message: 'OrderError',
        errors: {},
      };
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_IMPORTANT_TASKS_ORDER_REJECTED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        errors: {},
      });
    });
  });
});
