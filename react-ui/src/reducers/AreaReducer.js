import * as types from '../constants/actionTypes';

export const defaultState = {
  areaList: [],
  area: {},
  areaSearchResult: [],
  loading: false,
  errors: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_AREA_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.RECEIVE_AREA_LIST: {
      return {
        ...state,
        areaList: action.payload.data.areas,
        loading: false,
      };
    }
    case types.REQUEST_AREA: {
      return {
        ...state,
        loading: true,
        area: {},
      };
    }
    case types.RECEIVE_AREA: {
      return {
        ...state,
        area: action.payload.data.area,
        loading: false,
      };
    }
    case types.NEW_AREA: {
      return {
        ...state,
        area: {},
      };
    }
    case types.SAVE_AREA_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.SAVE_AREA_FULFILLED: {
      return {
        ...state,
        areaList: [...action.payload.data.areas],
        loading: false,
        errors: {},
      };
    }
    case types.SAVE_AREA_REJECTED: {
      const data = action.payload.response.data;
      const { title, score, desirableScore } = data.errors.areas.errors;
      const errors = { global: data.message, title, score, desirableScore };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    case types.UPDATE_AREA_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_AREA_FULFILLED: {
      return {
        ...state,
        areaList: [...action.payload.data.areas],
        loading: false,
        errors: {},
      };
    }
    case types.UPDATE_AREA_REJECTED: {
      const data = action.payload.response.data;
      const {
        'areas.0.title': title,
        'areas.0.score': score,
        'areas.0.desirableScore': desirableScore,
      } = data.errors;
      const errors = { global: data.message, title, score, desirableScore };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    case types.UPDATE_AREA_LIST_ORDER_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_AREA_LIST_ORDER_FULFILLED: {
      return {
        ...state,
        areaList: [...action.payload.data.areas],
        loading: false,
        errors: {},
      };
    }
    case types.UPDATE_AREA_LIST_ORDER_REJECTED: {
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
