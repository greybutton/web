export function requestSectors() {
  return {
    type: 'REQUEST_SECTORS',
  };
}

export function receiveSectors(sectors) {
  return {
    type: 'RECEIVE_SECTORS',
    payload: sectors,
  };
}

export function newSector() {
  return {
    type: 'NEW_SECTOR',
  };
}

export function saveSector(sector) {
  return {
    type: 'SAVE_SECTOR',
    payload: sector,
  };
}

export function saveSectorPending() {
  return {
    type: 'SAVE_SECTOR_PENDING',
  };
}

export function saveSectorFulfilled(sector) {
  return {
    type: 'SAVE_SECTOR_FULFILLED',
    payload: sector,
  };
}

export function saveSectorRejected(error) {
  return {
    type: 'SAVE_SECTOR_REJECTED',
    payload: error,
  };
}
