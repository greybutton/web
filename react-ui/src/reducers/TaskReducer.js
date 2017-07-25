import * as types from '../constants/actionTypes';

export const defaultState = {
  tasks: [],
  dailyTasks: [],
  task: {},
  taskSearchResult: [],
  loading: false,
  errors: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case types.NEW_TASK: {
      return {
        ...state,
        task: {},
      };
    }
    case types.SAVE_TASK_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.SAVE_TASK_FULFILLED: {
      return {
        ...state,
        tasks: [...action.payload.data.tasks],
        loading: false,
        errors: {},
      };
    }
    case types.SAVE_TASK_REJECTED: {
      const data = action.payload.response.data;
      const { text, time, sector, matrixQuarter } = data.errors;
      const errors = { global: data.message, text, time, sector, matrixQuarter };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    default:
      return state;
  }
};
