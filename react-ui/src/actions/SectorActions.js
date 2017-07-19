import * as types from '../constants/actionTypes';

export function requestSectors() {
  return {
    type: types.REQUEST_SECTORS,
  };
}

export function receiveSectors(sectors) {
  return {
    type: types.RECEIVE_SECTORS,
    payload: sectors,
  };
}

export function newSector() {
  return {
    type: types.NEW_SECTOR,
  };
}

export function requestSector(_id) {
  return {
    type: types.REQUEST_SECTOR,
    payload: _id,
  };
}

export function receiveSector(sector) {
  return {
    type: types.RECEIVE_SECTOR,
    payload: sector,
  };
}

export function saveSector(sector) {
  return {
    type: types.SAVE_SECTOR,
    payload: sector,
  };
}

export function saveSectorPending() {
  return {
    type: types.SAVE_SECTOR_PENDING,
  };
}

export function saveSectorFulfilled(sector) {
  return {
    type: types.SAVE_SECTOR_FULFILLED,
    payload: sector,
  };
}

export function saveSectorRejected(error) {
  return {
    type: types.SAVE_SECTOR_REJECTED,
    payload: error,
  };
}

export function updateSector(sector) {
  return {
    type: types.UPDATE_SECTOR,
    payload: sector,
  };
}

export function updateSectorPending() {
  return {
    type: types.UPDATE_SECTOR_PENDING,
  };
}

export function updateSectorFulfilled(sectors) {
  return {
    type: types.UPDATE_SECTOR_FULFILLED,
    payload: sectors,
  };
}

export function updateSectorRejected(error) {
  return {
    type: types.UPDATE_SECTOR_REJECTED,
    payload: error,
  };
}

export function updateSectorOrder(payload) {
  return {
    type: types.UPDATE_SECTOR_ORDER,
    payload,
  };
}

export function updateSectorOrderPending() {
  return {
    type: types.UPDATE_SECTOR_ORDER_PENDING,
  };
}

export function updateSectorOrderFulfilled(sectors) {
  return {
    type: types.UPDATE_SECTOR_ORDER_FULFILLED,
    payload: sectors,
  };
}

export function updateSectorOrderRejected(error) {
  return {
    type: types.UPDATE_SECTOR_ORDER_REJECTED,
    payload: error,
  };
}
