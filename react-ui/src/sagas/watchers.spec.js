import { takeLatest } from 'redux-saga/effects';
import { watchSaveSector, watchRequestSectors } from './watchers';
import { saveSector, fetchSectors } from './SectorSagas';

describe('test watch save sector', () => {
  describe('post sector', () => {
    const gen = watchSaveSector();
    it('should call watchSaveSector', () => {
      expect(gen.next().value).toEqual(takeLatest('SAVE_SECTOR', saveSector));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('get sectors', () => {
    const gen = watchRequestSectors();
    it('should call watchRequestSectors', () => {
      expect(gen.next().value).toEqual(takeLatest('REQUEST_SECTORS', fetchSectors));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
});
