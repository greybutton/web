import * as types from '../constants/actionTypes';

export const defaultState = {
  dailyTasks: [],
  importantTasks: [],
  matrixTasks: [],
  task: {},
  taskSearchResult: [],
  loading: false,
  errors: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_TASKS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.RECEIVE_TASKS: {
      return {
        ...state,
        dailyTasks: action.payload.data.tasks.daily,
        importantTasks: action.payload.data.tasks.important,
        matrixTasks: action.payload.data.tasks.important.concat(
          action.payload.data.tasks.notImportant,
        ),
        loading: false,
      };
    }
    case types.NEW_TASK: {
      return {
        ...state,
        task: {},
      };
    }
    case types.REQUEST_TASK: {
      return {
        ...state,
        loading: true,
        task: {},
      };
    }
    case types.RECEIVE_TASK: {
      return {
        ...state,
        task: action.payload.data.task,
        loading: false,
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
        dailyTasks: action.payload.data.tasks.daily,
        importantTasks: action.payload.data.tasks.important,
        matrixTasks: action.payload.data.tasks.important.concat(
          action.payload.data.tasks.notImportant,
        ),
        loading: false,
        errors: {},
      };
    }
    case types.SAVE_TASK_REJECTED: {
      const data =
        action.payload.response.data.errors['tasks.daily'] ||
        action.payload.response.data.errors['tasks.important'] ||
        action.payload.response.data.errors['tasks.notImportant'];
      const { text, time, sector, matrixQuarter } = data.errors;
      const errors = { global: data.message, text, time, sector, matrixQuarter };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    case types.UPDATE_TASK_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_TASK_FULFILLED: {
      return {
        ...state,
        dailyTasks: action.payload.data.tasks.daily,
        importantTasks: action.payload.data.tasks.important,
        matrixTasks: action.payload.data.tasks.important.concat(
          action.payload.data.tasks.notImportant,
        ),
        loading: false,
        errors: {},
      };
    }
    case types.UPDATE_TASK_REJECTED: {
      const data = action.payload.response.data;
      const text =
        data.errors['tasks.daily.0.text'] ||
        data.errors['tasks.important.0.text'] ||
        data.errors['tasks.notImportant.0.text'];
      const time =
        data.errors['tasks.daily.0.time'] ||
        data.errors['tasks.important.0.time'] ||
        data.errors['tasks.notImportant.0.time'];
      const sector =
        data.errors['tasks.daily.0.sector'] ||
        data.errors['tasks.important.0.sector'] ||
        data.errors['tasks.notImportant.0.sector'];
      const matrixQuarter =
        data.errors['tasks.daily.0.matrixQuarter'] ||
        data.errors['tasks.important.0.matrixQuarter'] ||
        data.errors['tasks.notImportant.0.matrixQuarter'];
      const errors = { global: data.message, text, time, sector, matrixQuarter };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    case types.UPDATE_IMPORTANT_TASKS_ORDER_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_IMPORTANT_TASKS_ORDER_FULFILLED: {
      return {
        ...state,
        importantTasks: action.payload.data.tasks,
        loading: false,
        errors: {},
      };
    }
    case types.UPDATE_IMPORTANT_TASKS_ORDER_REJECTED: {
      const data = action.payload.data.errors;
      return {
        ...state,
        loading: false,
        errors: data,
      };
    }
    default:
      return state;
  }
};
