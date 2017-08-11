/* eslint no-underscore-dangle: 0 */
// import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import Alert from 'react-s-alert';
import * as AreaActions from '../actions/AreaActions';

const url = 'areas';

if (!window.localStorage[url]) {
  window.localStorage.setItem(url, JSON.stringify([]));
}

export function fetchAreaListApi() {
  const payload = { data: {} };
  const areas = window.localStorage.getItem(url);
  payload.data.areas = JSON.parse(areas);
  return payload;
  // return axios.get(url);
}

export function fetchAreaApi(_id) {
  const payload = { data: {} };
  const areas = fetchAreaListApi().data.areas;
  const area = areas.filter(areaItem => areaItem._id === Number(_id))[0];
  payload.data.area = area;
  return payload;
  // return axios.get(`${url}/${_id}`);
}

export function saveAreaApi(area) {
  const payload = {
    data: {},
  };
  let areas = fetchAreaListApi().data.areas;
  area._id = areas.length + 1;
  areas.push(area);
  window.localStorage.setItem(
    url,
    JSON.stringify(areas, (key, value) => {
      if (key === 'score' || key === 'desirableScore') {
        return Number(value);
      }
      return value;
    }),
  );
  areas = window.localStorage.getItem(url);
  payload.data.areas = JSON.parse(areas);
  return payload;
  // return axios.post(url, area);
}

export function updateAreaApi(area) {
  const payload = {
    data: {},
  };
  const areas = fetchAreaListApi().data.areas;
  areas.map((areaItem) => {
    if (areaItem._id === area._id) {
      areaItem.title = area.title;
      areaItem.score = Number(area.score);
      areaItem.desirableScore = Number(area.desirableScore);
    }
    return areaItem;
  });
  window.localStorage.setItem(url, JSON.stringify(areas));
  payload.data.areas = areas;
  return payload;
  // return axios.put(`${url}/${area._id}`, area);
}

export function updateAreaListOrderApi(payload) {
  const areas = fetchAreaListApi().data.areas;
  const area = areas.splice(payload.oldIndex, 1);
  areas.splice(payload.newIndex, 0, area[0]);
  // window.localStorage.setItem(url, JSON.stringify([]));
  window.localStorage.setItem(url, JSON.stringify(areas));
  payload = {
    data: {},
  };
  payload.data.areas = areas;
  return payload;
  // return axios.put(`${url}/areaListOrder/${payload._id}`, {
  //   indexes: { oldIndex: payload.oldIndex, newIndex: payload.newIndex },
  // });
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
