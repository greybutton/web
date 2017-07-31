import * as types from '../constants/actionTypes';

export function requestAreaList() {
  return {
    type: types.REQUEST_AREA_LIST,
  };
}

export function receiveAreaList(areaList) {
  return {
    type: types.RECEIVE_AREA_LIST,
    payload: areaList,
  };
}

export function newArea() {
  return {
    type: types.NEW_AREA,
  };
}

export function requestArea(_id) {
  return {
    type: types.REQUEST_AREA,
    payload: _id,
  };
}

export function receiveArea(area) {
  return {
    type: types.RECEIVE_AREA,
    payload: area,
  };
}

export function saveArea(area) {
  return {
    type: types.SAVE_AREA,
    payload: area,
  };
}

export function saveAreaPending() {
  return {
    type: types.SAVE_AREA_PENDING,
  };
}

export function saveAreaFulfilled(area) {
  return {
    type: types.SAVE_AREA_FULFILLED,
    payload: area,
  };
}

export function saveAreaRejected(error) {
  return {
    type: types.SAVE_AREA_REJECTED,
    payload: error,
  };
}

export function updateArea(area) {
  return {
    type: types.UPDATE_AREA,
    payload: area,
  };
}

export function updateAreaPending() {
  return {
    type: types.UPDATE_AREA_PENDING,
  };
}

export function updateAreaFulfilled(areaList) {
  return {
    type: types.UPDATE_AREA_FULFILLED,
    payload: areaList,
  };
}

export function updateAreaRejected(error) {
  return {
    type: types.UPDATE_AREA_REJECTED,
    payload: error,
  };
}

export function updateAreaListOrder(payload) {
  return {
    type: types.UPDATE_AREA_LIST_ORDER,
    payload,
  };
}

export function updateAreaListOrderPending() {
  return {
    type: types.UPDATE_AREA_LIST_ORDER_PENDING,
  };
}

export function updateAreaListOrderFulfilled(areaList) {
  return {
    type: types.UPDATE_AREA_LIST_ORDER_FULFILLED,
    payload: areaList,
  };
}

export function updateAreaListOrderRejected(error) {
  return {
    type: types.UPDATE_AREA_LIST_ORDER_REJECTED,
    payload: error,
  };
}
