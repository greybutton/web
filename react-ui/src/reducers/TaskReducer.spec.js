import TaskReducer, { defaultState } from './TaskReducer';
import * as types from '../constants/actionTypes';

describe('Task Reducer', () => {
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
      const task = {
        text: 'test task actions',
        time: '00:15',
        sector: 2,
        matrixQuarter: 'first',
        label: 'sector title',
      };
      const data = {
        tasks: [task],
      };
      expect(
        TaskReducer(defaultState, {
          type: types.SAVE_TASK_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        tasks: data.tasks,
      });
    });
    it('should handle SAVE_TASK_REJECTED', () => {
      const response = {
        status: 400,
        data: {
          message: 'ValidationError',
          errors: {
            text: 'Text task is required',
            time: 'Time task is required',
            sector: 'Sector task is required',
            matrixQuarter: 'Matrix quater is required',
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
});
