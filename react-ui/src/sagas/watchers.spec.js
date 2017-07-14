import { takeLatest } from 'redux-saga/effects';
import { watchSaveSector } from './watchers';
import { saveSector } from './SectorSagas';

describe('test watch save sector', () => {
  const gen = watchSaveSector();
  it('should call watchSaveSector', () => {
    expect(gen.next().value).toEqual(takeLatest('SAVE_SECTOR', saveSector));
  });
  it('should be done', () => {
    expect(gen.next().done).toEqual(true);
  });
});
