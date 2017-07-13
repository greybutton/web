export const defaultState = {
  sectors: [],
  sector: {},
  sectorSearchResult: [],
  loading: false,
  errors: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SAVE_SECTOR_PENDING': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'SAVE_SECTOR_FULFILLED': {
      return {
        ...state,
        sectors: [...state.sectors, ...action.payload.data.sectors],
        loading: false,
        errors: {},
      };
    }
    case 'SAVE_SECTOR_REJECTED': {
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
