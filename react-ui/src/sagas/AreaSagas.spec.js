/* eslint no-underscore-dangle: 0 */
import { put, call } from 'redux-saga/effects';
import * as AreaSagas from './AreaSagas';
import * as AreaActions from '../actions/AreaActions';

describe('Area sagas tests', () => {
  const area = {
    _id: 123,
    title: 'test area sagas',
    score: 1,
    desirableScore: 2,
  };
  describe('post area saga', () => {
    const payload = {
      area,
      resolve: () => {},
      reject: () => {},
    };
    const gen = AreaSagas.saveArea({ payload });
    it('should put save area penging', () => {
      expect(gen.next().value).toEqual(put(AreaActions.saveAreaPending()));
    });
    it('should call save area api', () => {
      expect(gen.next().value).toEqual(call(AreaSagas.saveAreaApi, payload.area));
    });
    it('should put save area fulfilled', () => {
      expect(gen.next().value).toEqual(put(AreaActions.saveAreaFulfilled()));
    });
    it('should call resolve', () => {
      expect(gen.next().value).toEqual(call(payload.resolve));
    });
    it('should put save area reject', () => {
      expect(gen.throw().value).toEqual(put(AreaActions.saveAreaRejected()));
    });
    it('should call reject', () => {
      expect(gen.next().value).toEqual(call(payload.reject));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('get area list saga', () => {
    const gen = AreaSagas.fetchAreaList();
    it('should call get area list api', () => {
      expect(gen.next().value).toEqual(call(AreaSagas.fetchAreaListApi));
    });
    it('should put receive area list', () => {
      expect(gen.next().value).toEqual(put(AreaActions.receiveAreaList()));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('put area saga', () => {
    describe('fetch area', () => {
      const payload = area._id;
      const gen = AreaSagas.fetchArea({ payload });
      it('should call get area api', () => {
        expect(gen.next().value).toEqual(call(AreaSagas.fetchAreaApi, payload));
      });
      it('should put receive area', () => {
        expect(gen.next().value).toEqual(put(AreaActions.receiveArea()));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
    describe('update area', () => {
      const payload = {
        area,
        resolve: () => {},
        reject: () => {},
      };
      const gen = AreaSagas.updateArea({ payload });
      it('should put update area penging', () => {
        expect(gen.next().value).toEqual(put(AreaActions.updateAreaPending()));
      });
      it('should call update area api', () => {
        expect(gen.next().value).toEqual(call(AreaSagas.updateAreaApi, payload.area));
      });
      it('should put update area fulfilled', () => {
        expect(gen.next().value).toEqual(put(AreaActions.updateAreaFulfilled()));
      });
      it('should call resolve', () => {
        expect(gen.next().value).toEqual(call(payload.resolve));
      });
      it('should put update area reject', () => {
        expect(gen.throw().value).toEqual(put(AreaActions.updateAreaRejected()));
      });
      it('should call reject', () => {
        expect(gen.next().value).toEqual(call(payload.reject));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
  });
  describe('update area list order', () => {
    const payload = {
      area,
      resolve: () => {},
      reject: () => {},
    };
    const gen = AreaSagas.updateAreaListOrder({ payload });
    it('should call update area list order api', () => {
      expect(gen.next().value).toEqual(call(AreaSagas.updateAreaListOrderApi, payload));
    });
    it('should put update area list order fulfilled', () => {
      expect(gen.next().value).toEqual(put(AreaActions.updateAreaListOrderFulfilled()));
    });
    it('should call resolve', () => {
      expect(gen.next().value).toEqual(call(payload.resolve));
    });
    it('should put update area list order reject', () => {
      expect(gen.throw().value).toEqual(put(AreaActions.updateAreaListOrderRejected()));
    });
    it('should call reject', () => {
      expect(gen.next().value).toEqual(call(payload.reject));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
});
