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

export function requestSector(_id) {
  return {
    type: 'REQUEST_SECTOR',
    payload: _id,
  };
}

export function receiveSector(sector) {
  return {
    type: 'RECEIVE_SECTOR',
    payload: sector,
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

export function updateSector(sector) {
  return {
    type: 'UPDATE_SECTOR',
    payload: sector,
  };
}

export function updateSectorPending() {
  return {
    type: 'UPDATE_SECTOR_PENDING',
  };
}

export function updateSectorFulfilled(sectors) {
  return {
    type: 'UPDATE_SECTOR_FULFILLED',
    payload: sectors,
  };
}

export function updateSectorRejected(error) {
  return {
    type: 'UPDATE_SECTOR_REJECTED',
    payload: error,
  };
}
