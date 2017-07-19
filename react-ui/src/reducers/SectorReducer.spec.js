import SectorReducer, { defaultState } from './SectorReducer';
import * as types from '../constants/actionTypes';

describe('Sector Reducer', () => {
  it('should return the initial state', () => {
    expect(SectorReducer(undefined, {})).toEqual(defaultState);
  });
  describe('post sector', () => {
    it('should handle SAVE_SECTOR_PENDING', () => {
      expect(
        SectorReducer(defaultState, {
          type: types.SAVE_SECTOR_PENDING,
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
          type: types.SAVE_SECTOR_FULFILLED,
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
          type: types.SAVE_SECTOR_REJECTED,
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
          type: types.REQUEST_SECTORS,
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
          type: types.RECEIVE_SECTORS,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        sectors: data.sectors,
        loading: false,
      });
    });
  });
  describe('put sector', () => {
    it('should handle REQUEST_SECTOR', () => {
      const payload = 123;
      expect(
        SectorReducer(defaultState, {
          type: types.REQUEST_SECTOR,
          payload,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
        sector: {},
      });
    });
    it('should handle RECEIVE_SECTOR', () => {
      const sector = {
        _id: 1,
        title: 'test sector reducer',
        score: 1,
        desirableScore: 2,
      };
      const data = {
        sector,
      };
      expect(
        SectorReducer(defaultState, {
          type: types.RECEIVE_SECTOR,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        loading: false,
        sector: data.sector,
      });
    });
    it('should handle UPDATE_SECTOR_PENDING', () => {
      expect(
        SectorReducer(defaultState, {
          type: types.UPDATE_SECTOR_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle UPDATE_SECTOR_FULFILLED', () => {
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
          type: types.UPDATE_SECTOR_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        sectors: [...data.sectors],
      });
    });
    it('should handle UPDATE_SECTOR_REJECTED', () => {
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
          type: types.UPDATE_SECTOR_REJECTED,
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
  describe('update sector order', () => {
    it('should handle UPDATE_SECTOR_ORDER_PENDING', () => {
      expect(
        SectorReducer(defaultState, {
          type: types.UPDATE_SECTOR_ORDER_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle UPDATE_SECTOR_ORDER_FULFILLED', () => {
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
          type: types.UPDATE_SECTOR_ORDER_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        sectors: [...data.sectors],
      });
    });
    it('should handle UPDATE_SECTOR_ORDER_REJECTED', () => {
      const data = {
        message: 'OrderError',
        errors: {},
      };
      expect(
        SectorReducer(defaultState, {
          type: types.UPDATE_SECTOR_ORDER_REJECTED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        errors: {},
      });
    });
  });
});
