/* eslint no-underscore-dangle: 0 */
import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import Alert from 'react-s-alert';
import * as AreaActions from '../actions/AreaActions';

const url = '/api/v1/areas';

export function fetchAreaListApi() {
  return axios.get(url);
}

export function fetchAreaApi(_id) {
  return axios.get(`${url}/${_id}`);
}

export function saveAreaApi(area) {
  return axios.post(url, area);
}

export function updateAreaApi(area) {
  return axios.put(`${url}/${area._id}`, area);
}

export function updateAreaListOrderApi(payload) {
  return axios.put(`${url}/areaListOrder/${payload._id}`, {
    indexes: { oldIndex: payload.oldIndex, newIndex: payload.newIndex },
  });
}

export function* saveArea({ payload }) {
  yield put(AreaActions.saveAreaPending());
  try {
    const areaList = yield call(saveAreaApi, payload.area);
    yield put(AreaActions.saveAreaFulfilled(areaList));
    yield call(payload.resolve);
    Alert.success('Area add success', {
      customFields: {
        bsStyle: 'success',
      },
    });
  } catch (e) {
    yield put(AreaActions.saveAreaRejected(e));
    yield call(payload.reject);
    Alert.error('Area add fail', {
      customFields: {
        bsStyle: 'danger',
      },
    });
  }
}

export function* fetchAreaList() {
  const areaList = yield call(fetchAreaListApi);
  yield put(AreaActions.receiveAreaList(areaList));
}

export function* fetchArea({ payload }) {
  const area = yield call(fetchAreaApi, payload);
  yield put(AreaActions.receiveArea(area));
}

export function* updateArea({ payload }) {
  yield put(AreaActions.updateAreaPending());
  try {
    const areaList = yield call(updateAreaApi, payload.area);
    yield put(AreaActions.updateAreaFulfilled(areaList));
    yield call(payload.resolve);
    Alert.info('Area update success', {
      customFields: {
        bsStyle: 'info',
      },
    });
  } catch (e) {
    yield put(AreaActions.updateAreaRejected(e));
    yield call(payload.reject);
    Alert.error('Area update fail', {
      customFields: {
        bsStyle: 'danger',
      },
    });
  }
}

export function* updateAreaListOrder({ payload }) {
  try {
    const areaList = yield call(updateAreaListOrderApi, payload);
    yield put(AreaActions.updateAreaListOrderFulfilled(areaList));
    yield call(payload.resolve);
  } catch (e) {
    yield put(AreaActions.updateAreaListOrderRejected(e));
    yield call(payload.reject);
  }
}
