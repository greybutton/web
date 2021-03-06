/* eslint no-underscore-dangle: 0 */
import * as types from '../constants/actionTypes';

export const defaultState = {
  dailyTaskList: [],
  importantTaskList: [],
  allTaskList: [],
  areaTaskList: [],
  areaImportantTaskList: [],
  task: {},
  taskSearchResult: [],
  loading: false,
  errors: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_TASK_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.RECEIVE_TASK_LIST: {
      return {
        ...state,
        dailyTaskList: action.payload.data.tasks.daily,
        importantTaskList: action.payload.data.tasks.important,
        allTaskList: action.payload.data.tasks.important.concat(
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
        dailyTaskList: action.payload.data.tasks.daily,
        importantTaskList: action.payload.data.tasks.important,
        allTaskList: action.payload.data.tasks.important.concat(
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
      const { text, time, area, quadrant } = data.errors;
      const errors = { global: data.message, text, time, area, quadrant };
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
        dailyTaskList: action.payload.data.tasks.daily,
        importantTaskList: action.payload.data.tasks.important,
        allTaskList: action.payload.data.tasks.important.concat(
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
      const area =
        data.errors['tasks.daily.0.area'] ||
        data.errors['tasks.important.0.area'] ||
        data.errors['tasks.notImportant.0.area'];
      const quadrant =
        data.errors['tasks.daily.0.quadrant'] ||
        data.errors['tasks.important.0.quadrant'] ||
        data.errors['tasks.notImportant.0.quadrant'];
      const errors = { global: data.message, text, time, area, quadrant };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    case types.DELETE_TASK_FULFILLED: {
      return {
        ...state,
        dailyTaskList: action.payload.data.tasks.daily,
        importantTaskList: action.payload.data.tasks.important,
        allTaskList: action.payload.data.tasks.important.concat(
          action.payload.data.tasks.notImportant,
        ),
        loading: false,
        errors: {},
      };
    }
    case types.DELETE_TASK_REJECTED: {
      const data = action.payload.response.data;
      const errors = { global: data.message };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    case types.UPDATE_TASK_LIST_IMPORTANT_ORDER_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_TASK_LIST_IMPORTANT_ORDER_FULFILLED: {
      return {
        ...state,
        importantTaskList: action.payload.data.tasks.important,
        allTaskList: action.payload.data.tasks.important.concat(
          action.payload.data.tasks.notImportant,
        ),
        loading: false,
        errors: {},
      };
    }
    case types.UPDATE_TASK_LIST_IMPORTANT_ORDER_REJECTED: {
      const data = action.payload.data.errors;
      return {
        ...state,
        loading: false,
        errors: data,
      };
    }
    case types.UPDATE_TASK_LIST_DAILY_ORDER_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_TASK_LIST_DAILY_ORDER_FULFILLED: {
      return {
        ...state,
        dailyTaskList: action.payload.data.tasks,
        loading: false,
        errors: {},
      };
    }
    case types.UPDATE_TASK_LIST_DAILY_ORDER_REJECTED: {
      const data = action.payload.data.errors;
      return {
        ...state,
        loading: false,
        errors: data,
      };
    }
    case types.PICK_AREA_TASK_LIST: {
      const id = action.payload;
      return {
        ...state,
        areaTaskList: state.allTaskList.filter(task => task.area === id),
        areaImportantTaskList: state.importantTaskList.filter(task => task.area === id),
      };
    }
    case types.UPDATE_PICK_AREA_TASK_LIST: {
      const id = action.payload;
      return {
        ...state,
        areaTaskList: state.areaTaskList.filter(task => task._id !== id),
        areaImportantTaskList: state.areaImportantTaskList.filter(task => task._id !== id),
      };
    }
    default:
      return state;
  }
};
