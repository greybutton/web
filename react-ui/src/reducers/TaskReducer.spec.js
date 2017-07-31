import TaskReducer, { defaultState } from './TaskReducer';
import * as types from '../constants/actionTypes';

describe('Task Reducer', () => {
  const task = {
    _id: 123,
    text: 'test task reducers',
    time: '00:15',
    area: 2,
    quadrant: 'first',
    label: 'area title',
  };
  it('should return the initial state', () => {
    expect(TaskReducer(undefined, {})).toEqual(defaultState);
    expect(TaskReducer(undefined)).toEqual(defaultState);
  });
  describe('post task', () => {
    it('should handle NEW_TASK', () => {
      expect(
        TaskReducer(defaultState, {
          type: types.NEW_TASK,
        }),
      ).toEqual({
        ...defaultState,
        task: {},
      });
    });
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
        dailyTaskList: data.tasks.daily,
        importantTaskList: data.tasks.important,
        matrixTaskList: data.tasks.important.concat(data.tasks.notImportant),
      });
    });
    it('should handle SAVE_TASK_REJECTED', () => {
      const response = {
        status: 400,
        data: {
          errors: {
            'tasks.notImportant': {
              message: 'ValidationError',
              errors: {
                text: 'Text task is required',
                time: 'Time task is required',
                area: 'area task is required',
                quadrant: 'Matrix quater is required',
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
          area: 'area task is required',
          quadrant: 'Matrix quater is required',
        },
      });
    });
  });
  describe('get task list', () => {
    it('should handle REQUEST_TASK_LIST', () => {
      expect(
        TaskReducer(defaultState, {
          type: types.REQUEST_TASK_LIST,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle RECEIVE_TASK_LIST', () => {
      const data = {
        tasks: { important: [task], notImportant: [task], daily: [task] },
      };
      expect(
        TaskReducer(defaultState, {
          type: types.RECEIVE_TASK_LIST,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        dailyTaskList: data.tasks.daily,
        importantTaskList: data.tasks.important,
        matrixTaskList: data.tasks.important.concat(data.tasks.notImportant),
        loading: false,
      });
    });
  });
  describe('put task', () => {
    it('should handle REQUEST_TASK', () => {
      expect(
        TaskReducer(defaultState, {
          type: types.REQUEST_TASK,
          payload: task._id,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
        task: {},
      });
    });
    it('should handle RECEIVE_TASK', () => {
      const data = {
        task,
      };
      expect(
        TaskReducer(defaultState, {
          type: types.RECEIVE_TASK,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        loading: false,
        task: data.task,
      });
    });
    it('should handle UPDATE_TASK_PENDING', () => {
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_TASK_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle UPDATE_TASK_FULFILLED', () => {
      const data = {
        tasks: { important: [task], notImportant: [task], daily: [task] },
      };
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_TASK_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        dailyTaskList: data.tasks.daily,
        importantTaskList: data.tasks.important,
        matrixTaskList: data.tasks.important.concat(data.tasks.notImportant),
      });
    });
    it('should handle UPDATE_TASK_REJECTED', () => {
      const response = {
        status: 400,
        data: {
          message: 'ValidationError',
          errors: {
            'tasks.notImportant.0.text': 'Text task is required',
            'tasks.notImportant.0.time': 'Time task is required',
            'tasks.notImportant.0.area': 'area task is required',
            'tasks.notImportant.0.quadrant': 'Matrix quarter is required',
          },
        },
      };
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_TASK_REJECTED,
          payload: { response },
        }),
      ).toEqual({
        ...defaultState,
        errors: {
          global: 'ValidationError',
          text: 'Text task is required',
          time: 'Time task is required',
          area: 'area task is required',
          quadrant: 'Matrix quarter is required',
        },
      });
    });
  });
  describe('delete task', () => {
    it('should handle DELETE_TASK_FULFILLED', () => {
      const data = {
        tasks: { important: [task], notImportant: [task], daily: [task] },
      };
      expect(
        TaskReducer(defaultState, {
          type: types.DELETE_TASK_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        dailyTaskList: data.tasks.daily,
        importantTaskList: data.tasks.important,
        matrixTaskList: data.tasks.important.concat(data.tasks.notImportant),
      });
    });
    it('should handle DELETE_TASK_REJECTED', () => {
      const response = {
        status: 400,
        data: {
          message: 'DeleteError',
          errors: {},
        },
      };
      expect(
        TaskReducer(defaultState, {
          type: types.DELETE_TASK_REJECTED,
          payload: { response },
        }),
      ).toEqual({
        ...defaultState,
        errors: {
          global: 'DeleteError',
        },
      });
    });
  });
  describe('update important tasks order', () => {
    it('should handle UPDATE_TASK_LIST_IMPORTANT_ORDER_PENDING', () => {
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle UPDATE_TASK_LIST_IMPORTANT_ORDER_FULFILLED', () => {
      const data = {
        tasks: [task],
      };
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        importantTaskList: [...data.tasks],
      });
    });
    it('should handle UPDATE_TASK_LIST_IMPORTANT_ORDER_REJECTED', () => {
      const data = {
        message: 'OrderError',
        errors: {},
      };
      expect(
        TaskReducer(defaultState, {
          type: types.UPDATE_TASK_LIST_IMPORTANT_ORDER_REJECTED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        errors: {},
      });
    });
  });
});
