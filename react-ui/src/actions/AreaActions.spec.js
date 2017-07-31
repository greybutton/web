import * as AreaActions from './AreaActions.js';
import * as types from '../constants/actionTypes';

describe('Area Actions', () => {
  it('should create an action new area', () => {
    const expectedAction = {
      type: types.NEW_AREA,
    };
    expect(AreaActions.newArea()).toEqual(expectedAction);
  });
  describe('post area', () => {
    it('should create an action to save an area', () => {
      const area = {
        _id: 1,
        title: 'test area actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.SAVE_AREA,
        payload: area,
      };
      expect(AreaActions.saveArea(area)).toEqual(expectedAction);
    });
    it('should create an action to save pending an area', () => {
      const expectedAction = {
        type: types.SAVE_AREA_PENDING,
      };
      expect(AreaActions.saveAreaPending()).toEqual(expectedAction);
    });
    it('should create an action to save fulfilled an area', () => {
      const area = {
        _id: 1,
        title: 'test area actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.SAVE_AREA_FULFILLED,
        payload: area,
      };
      expect(AreaActions.saveAreaFulfilled(area)).toEqual(expectedAction);
    });
    it('should create an action to save rejected an area', () => {
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
      const expectedAction = {
        type: types.SAVE_AREA_REJECTED,
        payload: response,
      };
      expect(AreaActions.saveAreaRejected(response)).toEqual(expectedAction);
    });
  });
  describe('get areas', () => {
    it('should create an action request areas', () => {
      const expectedAction = {
        type: types.REQUEST_AREA_LIST,
      };
      expect(AreaActions.requestAreaList()).toEqual(expectedAction);
    });
    it('should create an action receive areas', () => {
      const area = {
        _id: 1,
        title: 'test area actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.RECEIVE_AREA_LIST,
        payload: area,
      };
      expect(AreaActions.receiveAreaList(area)).toEqual(expectedAction);
    });
  });
  describe('put area', () => {
    it('should creata an action to request an area', () => {
      const _id = 123;
      const expectedAction = {
        type: types.REQUEST_AREA,
        payload: _id,
      };
      expect(AreaActions.requestArea(_id)).toEqual(expectedAction);
    });
    it('should create an action to receive an area', () => {
      const area = {
        _id: 1,
        title: 'test area actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.RECEIVE_AREA,
        payload: area,
      };
      expect(AreaActions.receiveArea(area)).toEqual(expectedAction);
    });
    it('should create an action to update an area', () => {
      const area = {
        _id: 1,
        title: 'test area actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.UPDATE_AREA,
        payload: area,
      };
      expect(AreaActions.updateArea(area)).toEqual(expectedAction);
    });
    it('should create an action to update pending an area', () => {
      const expectedAction = {
        type: types.UPDATE_AREA_PENDING,
      };
      expect(AreaActions.updateAreaPending()).toEqual(expectedAction);
    });
    it('should create an action to update fulfilled an area', () => {
      const area = {
        _id: 1,
        title: 'test area actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.UPDATE_AREA_FULFILLED,
        payload: area,
      };
      expect(AreaActions.updateAreaFulfilled(area)).toEqual(expectedAction);
    });
    it('should create an action to update rejected an area', () => {
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
      const expectedAction = {
        type: types.UPDATE_AREA_REJECTED,
        payload: response,
      };
      expect(AreaActions.updateAreaRejected(response)).toEqual(expectedAction);
    });
  });
  describe('update area order', () => {
    it('should create an action to update an area list order', () => {
      const area = {
        _id: 1,
        title: 'test area actions',
        score: 1,
        desirableScore: 2,
      };
      const payload = {
        oldIndex: 0,
        newIndex: 1,
        _id: area._id,
        resolve: () => {},
        reject: () => {},
      };
      const expectedAction = {
        type: types.UPDATE_AREA_LIST_ORDER,
        payload,
      };
      expect(AreaActions.updateAreaListOrder(payload)).toEqual(expectedAction);
    });
    it('should create an action to update pending an area list order', () => {
      const expectedAction = {
        type: types.UPDATE_AREA_LIST_ORDER_PENDING,
      };
      expect(AreaActions.updateAreaListOrderPending()).toEqual(expectedAction);
    });
    it('should create an action to update fulfilled an area list order', () => {
      const area = {
        _id: 1,
        title: 'test area actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.UPDATE_AREA_LIST_ORDER_FULFILLED,
        payload: area,
      };
      expect(AreaActions.updateAreaListOrderFulfilled(area)).toEqual(expectedAction);
    });
    it('should create an action to update rejected an area list order', () => {
      const error = {
        data: {
          message: 'OrderError',
          errors: {},
        },
      };
      const expectedAction = {
        type: types.UPDATE_AREA_LIST_ORDER_REJECTED,
        payload: error,
      };
      expect(AreaActions.updateAreaListOrderRejected(error)).toEqual(expectedAction);
    });
  });
});
