import { put, call } from 'redux-saga/effects';
import * as SectorSagas from './SectorSagas';
import * as SectorActions from '../actions/SectorActions';

describe('Sector sagas tests', () => {
  describe('post sector saga', () => {
    const payload = {
      sector: {
        _id: 1,
        title: 'test sector sagas',
        score: 1,
        desirableScore: 2,
      },
      resolve: () => {},
      reject: () => {},
    };
    const gen = SectorSagas.saveSector({ payload });
    it('should put save sector penging', () => {
      expect(gen.next().value).toEqual(put(SectorActions.saveSectorPending()));
    });
    it('should call save sector api', () => {
      expect(gen.next().value).toEqual(call(SectorSagas.saveSectorApi, payload.sector));
    });
    it('should put save sector fulfilled', () => {
      expect(gen.next().value).toEqual(put(SectorActions.saveSectorFulfilled()));
    });
    it('should call resolve', () => {
      expect(gen.next().value).toEqual(call(payload.resolve));
    });
    it('should put save sector reject', () => {
      expect(gen.throw().value).toEqual(put(SectorActions.saveSectorRejected()));
    });
    it('should call reject', () => {
      expect(gen.next().value).toEqual(call(payload.reject));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('get sectors saga', () => {
    const gen = SectorSagas.fetchSectors();
    it('should call get sectors api', () => {
      expect(gen.next().value).toEqual(call(SectorSagas.fetchSectorsApi));
    });
    it('should put receive sectors', () => {
      expect(gen.next().value).toEqual(put(SectorActions.receiveSectors()));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('put sector saga', () => {
    describe('fetch sector', () => {
      const payload = 123;
      const gen = SectorSagas.fetchSector({ payload });
      it('should call get sector api', () => {
        expect(gen.next().value).toEqual(call(SectorSagas.fetchSectorApi, payload));
      });
      it('should put receive sector', () => {
        expect(gen.next().value).toEqual(put(SectorActions.receiveSector()));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
    describe('update sector', () => {
      const payload = {
        sector: {
          _id: 1,
          title: 'test sector sagas',
          score: 1,
          desirableScore: 2,
        },
        resolve: () => {},
        reject: () => {},
      };
      const gen = SectorSagas.updateSector({ payload });
      it('should put update sector penging', () => {
        expect(gen.next().value).toEqual(put(SectorActions.updateSectorPending()));
      });
      it('should call update sector api', () => {
        expect(gen.next().value).toEqual(call(SectorSagas.updateSectorApi, payload.sector));
      });
      it('should put update sector fulfilled', () => {
        expect(gen.next().value).toEqual(put(SectorActions.updateSectorFulfilled()));
      });
      it('should call resolve', () => {
        expect(gen.next().value).toEqual(call(payload.resolve));
      });
      it('should put update sector reject', () => {
        expect(gen.throw().value).toEqual(put(SectorActions.updateSectorRejected()));
      });
      it('should call reject', () => {
        expect(gen.next().value).toEqual(call(payload.reject));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
  });
});
