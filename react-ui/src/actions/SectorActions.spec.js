import {
  requestSectors,
  receiveSectors,
  newSector,
  requestSector,
  receiveSector,
  updateSector,
  updateSectorPending,
  updateSectorFulfilled,
  updateSectorRejected,
  saveSector,
  saveSectorPending,
  saveSectorFulfilled,
  saveSectorRejected,
} from './SectorActions.js';
import * as types from '../constants/actionTypes';

describe('Sector Actions', () => {
  it('should create an action new sector', () => {
    const expectedAction = {
      type: types.NEW_SECTOR,
    };
    expect(newSector()).toEqual(expectedAction);
  });
  describe('post sector', () => {
    it('should create an action to save a sector', () => {
      const sector = {
        _id: 1,
        title: 'test sector actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.SAVE_SECTOR,
        payload: sector,
      };
      expect(saveSector(sector)).toEqual(expectedAction);
    });
    it('should create an action to save pending a sector', () => {
      const expectedAction = {
        type: types.SAVE_SECTOR_PENDING,
      };
      expect(saveSectorPending()).toEqual(expectedAction);
    });
    it('should create an action to save fulfilled a sector', () => {
      const sector = {
        _id: 1,
        title: 'test sector actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.SAVE_SECTOR_FULFILLED,
        payload: sector,
      };
      expect(saveSectorFulfilled(sector)).toEqual(expectedAction);
    });
    it('should create an action to save rejected a sector', () => {
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
      const expectedAction = {
        type: types.SAVE_SECTOR_REJECTED,
        payload: response,
      };
      expect(saveSectorRejected(response)).toEqual(expectedAction);
    });
  });
  describe('get sectors', () => {
    it('should create an action request sectors', () => {
      const expectedAction = {
        type: types.REQUEST_SECTORS,
      };
      expect(requestSectors()).toEqual(expectedAction);
    });
    it('should create an action receive sectors', () => {
      const sector = {
        _id: 1,
        title: 'test sector actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.RECEIVE_SECTORS,
        payload: sector,
      };
      expect(receiveSectors(sector)).toEqual(expectedAction);
    });
  });
  describe('put sector', () => {
    it('should creata an action to request a sector', () => {
      const _id = 123;
      const expectedAction = {
        type: types.REQUEST_SECTOR,
        payload: _id,
      };
      expect(requestSector(_id)).toEqual(expectedAction);
    });
    it('should create an action to receive a sector', () => {
      const sector = {
        _id: 1,
        title: 'test sector actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.RECEIVE_SECTOR,
        payload: sector,
      };
      expect(receiveSector(sector)).toEqual(expectedAction);
    });
    it('should create an action to update a sector', () => {
      const sector = {
        _id: 1,
        title: 'test sector actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.UPDATE_SECTOR,
        payload: sector,
      };
      expect(updateSector(sector)).toEqual(expectedAction);
    });
    it('should create an action to update pending a sector', () => {
      const expectedAction = {
        type: types.UPDATE_SECTOR_PENDING,
      };
      expect(updateSectorPending()).toEqual(expectedAction);
    });
    it('should create an action to update fulfilled a sector', () => {
      const sector = {
        _id: 1,
        title: 'test sector actions',
        score: 1,
        desirableScore: 2,
      };
      const expectedAction = {
        type: types.UPDATE_SECTOR_FULFILLED,
        payload: sector,
      };
      expect(updateSectorFulfilled(sector)).toEqual(expectedAction);
    });
    it('should create an action to update rejected a sector', () => {
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
      const expectedAction = {
        type: types.UPDATE_SECTOR_REJECTED,
        payload: response,
      };
      expect(updateSectorRejected(response)).toEqual(expectedAction);
    });
  });
});
