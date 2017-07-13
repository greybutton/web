import { put, call } from 'redux-saga/effects';
import root, { watchSaveSector, saveSector } from './index.js';
import {
  saveSectorPending,
  saveSectorFulfilled,
  saveSectorRejected,
} from '../actions/SectorActions.js';

describe('Sector saga', () => {
  const payload = {
    sector: {
      _id: 1,
      title: 'test sector actions',
      score: 1,
      desirableScore: 2,
    },
    resolve: () => {},
    reject: () => {},
  };
  const gen = saveSector({ payload });
  it('should put pending action', () => {
    expect(gen.next().value).toEqual(put(saveSectorPending()));
  });
});
