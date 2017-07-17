import SectorReducer, { defaultState } from './SectorReducer';

describe('Sector Reducer', () => {
  it('should return the initial state', () => {
    expect(SectorReducer(undefined, {})).toEqual(defaultState);
  });
  describe('post sector', () => {
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
            sectors: {
              errors: {
                title: 'Title sector is required',
                score: 'Score sector is required',
                desirableScore: 'Desirable score sector is required',
              },
            },
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
  describe('get sectors', () => {
    it('should handle REQUEST_SECTORS', () => {
      expect(
        SectorReducer(defaultState, {
          type: 'REQUEST_SECTORS',
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle RECEIVE_SECTORS', () => {
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
          type: 'RECEIVE_SECTORS',
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        sectors: data.sectors,
        loading: false,
      });
    });
  });
});
