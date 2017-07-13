import SectorReducer, { defaultState } from './SectorReducer';

describe('Sector Reducer', () => {
  it('should return the initial state', () => {
    expect(SectorReducer(undefined, {})).toEqual(defaultState);
  });
  it('should handle SAVE_SECTOR_PENDING', () => {
    expect(
      SectorReducer(defaultState, {
        type: 'SAVE_SECTOR_PENDING',
      }),
    ).toEqual({
      ...defaultState,
      loading: true,
    });
  });
  it('should handle SAVE_SECTOR_FULFILLED', () => {
    const sector = {
      _id: 1,
      title: 'test sector reducer',
      score: 1,
      desirableScore: 2,
    };
    const data = {
      sectors: [sector],
    };
    expect(
      SectorReducer(defaultState, {
        type: 'SAVE_SECTOR_FULFILLED',
        payload: { data },
      }),
    ).toEqual({
      ...defaultState,
      sectors: data.sectors,
    });
  });
  it('should handle SAVE_SECTOR_REJECTED', () => {
    const response = {
      status: 400,
      data: {
        message: 'ValidationError',
        errors: {
          'sectors.0.title': 'Title sector is required',
          'sectors.0.score': 'Score sector is required',
          'sectors.0.desirableScore': 'Desirable score sector is required',
        },
      },
    };
    expect(
      SectorReducer(defaultState, {
        type: 'SAVE_SECTOR_REJECTED',
        payload: { response },
      }),
    ).toEqual({
      ...defaultState,
      errors: {
        global: 'ValidationError',
        title: 'Title sector is required',
        score: 'Score sector is required',
        desirableScore: 'Desirable score sector is required',
      },
    });
  });
});
