/* eslint no-underscore-dangle: 0 */
import AreaReducer, { defaultState } from './AreaReducer';
import * as types from '../constants/actionTypes';

describe('Area Reducer', () => {
  const area = {
    _id: 123,
    title: 'test area reducer',
    score: 1,
    desirableScore: 2,
  };
  it('should return the initial state', () => {
    expect(AreaReducer(undefined, {})).toEqual(defaultState);
    expect(AreaReducer(undefined)).toEqual(defaultState);
  });
  describe('post area', () => {
    it('should handle NEW_AREA', () => {
      expect(
        AreaReducer(defaultState, {
          type: types.NEW_AREA,
        }),
      ).toEqual({
        ...defaultState,
        area: {},
      });
    });
    it('should handle SAVE_AREA_PENDING', () => {
      expect(
        AreaReducer(defaultState, {
          type: types.SAVE_AREA_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle SAVE_AREA_FULFILLED', () => {
      const data = {
        areas: [area],
      };
      expect(
        AreaReducer(defaultState, {
          type: types.SAVE_AREA_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        areaList: data.areas,
      });
    });
    it('should handle SAVE_AREA_REJECTED', () => {
      const response = {
        status: 400,
        data: {
          message: 'ValidationError',
          errors: {
            areas: {
              errors: {
                title: 'Title area is required',
                score: 'Score area is required',
                desirableScore: 'Desirable score area is required',
              },
            },
          },
        },
      };
      expect(
        AreaReducer(defaultState, {
          type: types.SAVE_AREA_REJECTED,
          payload: { response },
        }),
      ).toEqual({
        ...defaultState,
        errors: {
          global: 'ValidationError',
          title: 'Title area is required',
          score: 'Score area is required',
          desirableScore: 'Desirable score area is required',
        },
      });
    });
  });
  describe('get area list', () => {
    it('should handle REQUEST_AREA_LIST', () => {
      expect(
        AreaReducer(defaultState, {
          type: types.REQUEST_AREA_LIST,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle RECEIVE_AREA_LIST', () => {
      const data = {
        areas: [area],
      };
      expect(
        AreaReducer(defaultState, {
          type: types.RECEIVE_AREA_LIST,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        areaList: data.areas,
        loading: false,
      });
    });
  });
  describe('put area', () => {
    it('should handle REQUEST_AREA', () => {
      const payload = area._id;
      expect(
        AreaReducer(defaultState, {
          type: types.REQUEST_AREA,
          payload,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
        area: {},
      });
    });
    it('should handle RECEIVE_AREA', () => {
      const data = {
        area,
      };
      expect(
        AreaReducer(defaultState, {
          type: types.RECEIVE_AREA,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        loading: false,
        area: data.area,
      });
    });
    it('should handle UPDATE_AREA_PENDING', () => {
      expect(
        AreaReducer(defaultState, {
          type: types.UPDATE_AREA_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle UPDATE_AREA_FULFILLED', () => {
      const data = {
        areas: [area],
      };
      expect(
        AreaReducer(defaultState, {
          type: types.UPDATE_AREA_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        areaList: [...data.areas],
      });
    });
    it('should handle UPDATE_AREA_REJECTED', () => {
      const response = {
        status: 400,
        data: {
          message: 'ValidationError',
          errors: {
            'areas.0.title': 'Title area is required',
            'areas.0.score': 'Score area is required',
            'areas.0.desirableScore': 'Desirable score area is required',
          },
        },
      };
      expect(
        AreaReducer(defaultState, {
          type: types.UPDATE_AREA_REJECTED,
          payload: { response },
        }),
      ).toEqual({
        ...defaultState,
        errors: {
          global: 'ValidationError',
          title: 'Title area is required',
          score: 'Score area is required',
          desirableScore: 'Desirable score area is required',
        },
      });
    });
  });
  describe('update area order', () => {
    it('should handle UPDATE_AREA_LIST_ORDER_PENDING', () => {
      expect(
        AreaReducer(defaultState, {
          type: types.UPDATE_AREA_LIST_ORDER_PENDING,
        }),
      ).toEqual({
        ...defaultState,
        loading: true,
      });
    });
    it('should handle UPDATE_AREA_LIST_ORDER_FULFILLED', () => {
      const data = {
        areas: [area],
      };
      expect(
        AreaReducer(defaultState, {
          type: types.UPDATE_AREA_LIST_ORDER_FULFILLED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        areaList: [...data.areas],
      });
    });
    it('should handle UPDATE_AREA_LIST_ORDER_REJECTED', () => {
      const data = {
        message: 'OrderError',
        errors: {},
      };
      expect(
        AreaReducer(defaultState, {
          type: types.UPDATE_AREA_LIST_ORDER_REJECTED,
          payload: { data },
        }),
      ).toEqual({
        ...defaultState,
        errors: {},
      });
    });
  });
});
