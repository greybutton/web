import { takeLatest } from 'redux-saga/effects';
import {
  watchSaveSector,
  watchRequestSectors,
  watchRequestSector,
  watchUpdateSector,
} from './watchers';
import { saveSector, fetchSectors, fetchSector, updateSector } from './SectorSagas';

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
  describe('put sector', () => {
    describe('fetch sector', () => {
      const gen = watchRequestSector();
      it('should call watchRequestSector', () => {
        expect(gen.next().value).toEqual(takeLatest('REQUEST_SECTOR', fetchSector));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
    describe('update sector', () => {
      const gen = watchUpdateSector();
      it('should call watchUpdateSector', () => {
        expect(gen.next().value).toEqual(takeLatest('UPDATE_SECTOR', updateSector));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
  });
});
