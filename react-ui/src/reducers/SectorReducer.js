export const defaultState = {
  sectors: [],
  sector: {},
  sectorSearchResult: [],
  loading: false,
  errors: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'REQUEST_SECTORS': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'RECEIVE_SECTORS':
      return {
        ...state,
        sectors: action.payload.data.sectors,
        loading: false,
      };
    case 'REQUEST_SECTOR': {
      return {
        ...state,
        loading: true,
        sector: {},
      };
    }
    case 'RECEIVE_SECTOR':
      return {
        ...state,
        sector: action.payload.data.sector,
        loading: false,
      };
    case 'NEW_SECTOR':
      return {
        ...state,
        sector: {},
      };
    case 'SAVE_SECTOR_PENDING': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'SAVE_SECTOR_FULFILLED': {
      return {
        ...state,
        sectors: [...action.payload.data.sectors],
        loading: false,
        errors: {},
      };
    }
    case 'SAVE_SECTOR_REJECTED': {
      const data = action.payload.response.data;
      const { title, score, desirableScore } = data.errors.sectors.errors;
      const errors = { global: data.message, title, score, desirableScore };
      return {
        ...state,
        loading: false,
        errors,
      };
    }
    case 'UPDATE_SECTOR_PENDING': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'UPDATE_SECTOR_FULFILLED': {
      return {
        ...state,
        sectors: [...action.payload.data.sectors],
        loading: false,
        errors: {},
      };
    }
    case 'UPDATE_SECTOR_REJECTED': {
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
