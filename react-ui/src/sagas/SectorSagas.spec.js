import { put, call } from 'redux-saga/effects';
import { saveSector, saveSectorApi } from './SectorSagas';
import * as SectorActions from '../actions/SectorActions';

describe('Sector sagas tests', () => {
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
  const gen = saveSector({ payload });
  it('should put save sector penging', () => {
    expect(gen.next().value).toEqual(put(SectorActions.saveSectorPending()));
  });
  it('should call save sector api', () => {
    expect(gen.next().value).toEqual(call(saveSectorApi, payload.sector));
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
