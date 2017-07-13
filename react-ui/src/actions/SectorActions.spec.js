import {
  saveSector,
  saveSectorPending,
  saveSectorFulfilled,
  saveSectorRejected,
} from './SectorActions.js';

describe('Sector Actions', () => {
  it('should create an action to save a sector', () => {
    const sector = {
      _id: 1,
      title: 'test sector actions',
      score: 1,
      desirableScore: 2,
    };
    const expectedAction = {
      type: 'SAVE_SECTOR',
      payload: sector,
    };
    expect(saveSector(sector)).toEqual(expectedAction);
  });
  it('should create an action to save pending a sector', () => {
    const expectedAction = {
      type: 'SAVE_SECTOR_PENDING',
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
      type: 'SAVE_SECTOR_FULFILLED',
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
      type: 'SAVE_SECTOR_REJECTED',
      payload: response,
    };
    expect(saveSectorRejected(response)).toEqual(expectedAction);
  });
});
