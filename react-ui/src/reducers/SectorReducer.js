import * as types from '../constants/actionTypes';

export const defaultState = {
  sectors: [],
  sector: {},
  sectorSearchResult: [],
  loading: false,
  errors: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_SECTORS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.RECEIVE_SECTORS: {
      return {
        ...state,
        sectors: action.payload.data.sectors,
        loading: false,
      };
    }
    case types.REQUEST_SECTOR: {
      return {
        ...state,
        loading: true,
        sector: {},
      };
    }
    case types.RECEIVE_SECTOR: {
      return {
        ...state,
        sector: action.payload.data.sector,
        loading: false,
      };
    }
    case types.NEW_SECTOR: {
      return {
        ...state,
        sector: {},
      };
    }
    case types.SAVE_SECTOR_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.SAVE_SECTOR_FULFILLED: {
      return {
        ...state,
        sectors: [...action.payload.data.sectors],
        loading: false,
        errors: {},
      };
    }
    case types.SAVE_SECTOR_REJECTED: {
      const data = action.payload.response.data;
      const { title, score, desirableScore } = data.errors.sectors.errors;
      const errors = { global: data.message, title, score, desirableScore };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    case types.UPDATE_SECTOR_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_SECTOR_FULFILLED: {
      return {
        ...state,
        sectors: [...action.payload.data.sectors],
        loading: false,
        errors: {},
      };
    }
    case types.UPDATE_SECTOR_REJECTED: {
      const data = action.payload.response.data;
      const {
        'sectors.0.title': title,
        'sectors.0.score': score,
        'sectors.0.desirableScore': desirableScore,
      } = data.errors;
      const errors = { global: data.message, title, score, desirableScore };
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
