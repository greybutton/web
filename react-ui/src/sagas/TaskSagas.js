/* eslint no-underscore-dangle: 0 */
// import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import Alert from 'react-s-alert';
import * as TaskActions from '../actions/TaskActions';

const url = 'tasks';

if (!global.localStorage[url]) {
  global.localStorage.setItem(
    url,
    JSON.stringify({
      daily: [
        {
          text:
            'Write 1 entree recipes that can be made ahead and frozen in a personal kitchen for inclusion in a cookbook',
          time: '00:30',
          area: 2,
          quadrant: 'daily',
          _id: 4,
        },
        {
          text:
            'Read 100 pages',
          time: '01:00',
          area: 6,
          quadrant: 'daily',
          _id: 5,
        },
      ],
      important: [
        {
          text: 'Increase revenue by 25% each month by catering 2 parties a month.',
          time: '00:00',
          area: 1,
          quadrant: 'first',
          _id: 1,
        },
        {
          text:
            'Create a website to sell jewelry from my store by December 31st. Utilize a website development company to create the site and payment interface.',
          area: 5,
          time: '00:00',
          quadrant: 'second',
          _id: 3,
        },
        {
          area: 1,
          text:
            'Gain 2 clients each quarter for my consulting business by participating in a monthly networking group.',
          quadrant: 'second',
          time: '00:00',
          _id: 2,
        },
      ],
      notImportant: [],
    }),
  );
  global.localStorage.setItem('_id', JSON.stringify(6));
}

const getId = () => JSON.parse(global.localStorage.getItem('_id'));
const incId = () => {
  const currId = JSON.parse(global.localStorage.getItem('_id'));
  const newId = currId + 1;
  global.localStorage.setItem('_id', JSON.stringify(newId));
};

export function fetchTaskListApi() {
  const payload = { data: {} };
  const tasks = window.localStorage.getItem(url);
  payload.data.tasks = JSON.parse(tasks);
  return payload;
  // return axios.get(url);
}

export function fetchTaskApi(_id) {
  const payload = { data: {} };
  let tasks = fetchTaskListApi().data.tasks;
  tasks = tasks.daily.concat(tasks.important, tasks.notImportant);
  const task = tasks.filter(taskItem => taskItem._id === Number(_id))[0];
  payload.data.task = task;
  return payload;
  // return axios.get(`${url}/${_id}`);
}

export function saveTaskApi(task) {
  const payload = {
    data: {},
  };
  let tasks = fetchTaskListApi().data.tasks;
  task._id = getId();
  incId();
  if (task.quadrant === 'daily') {
    tasks.daily.unshift(task);
  }
  if (task.quadrant === 'first' || task.quadrant === 'second') {
    tasks.important.unshift(task);
  }
  if (task.quadrant === 'third' || task.quadrant === 'fourth') {
    tasks.notImportant.unshift(task);
  }
  window.localStorage.setItem(
    url,
    JSON.stringify(tasks, (key, value) => {
      if (key === 'area') {
        return Number(value);
      }
      return value;
    }),
  );
  tasks = window.localStorage.getItem(url);
  payload.data.tasks = JSON.parse(tasks);
  return payload;
  // return axios.post(url, task);
}

export function updateTaskApi(task) {
  const payload = {
    data: {},
  };
  let taskList = fetchTaskListApi().data.tasks;
  taskList = taskList.daily.concat(taskList.important, taskList.notImportant);
  taskList.map((taskItem) => {
    if (taskItem._id === task._id) {
      taskItem.text = task.text;
      taskItem.time = task.time;
      taskItem.area = task.area;
      taskItem.quadrant = task.quadrant;
    }
    return taskItem;
  });
  const tasks = {
    daily: taskList.filter(taskItem => taskItem.quadrant === 'daily'),
    important: taskList.filter(
      taskItem => taskItem.quadrant === 'first' || taskItem.quadrant === 'second',
    ),
    notImportant: taskList.filter(
      taskItem => taskItem.quadrant === 'third' || taskItem.quadrant === 'fourth',
    ),
  };
  window.localStorage.setItem(url, JSON.stringify(tasks));
  payload.data.tasks = tasks;
  return payload;
  // return axios.put(`${url}/${task._id}`, task);
}

export function deleteTaskApi(id) {
  const payload = {
    data: {},
  };
  let taskList1 = fetchTaskListApi().data.tasks;
  taskList1 = taskList1.daily.concat(taskList1.important, taskList1.notImportant);
  const taskList = taskList1.filter(taskItem => taskItem._id !== id);
  const tasks = {
    daily: taskList.filter(taskItem => taskItem.quadrant === 'daily'),
    important: taskList.filter(
      taskItem => taskItem.quadrant === 'first' || taskItem.quadrant === 'second',
    ),
    notImportant: taskList.filter(
      taskItem => taskItem.quadrant === 'third' || taskItem.quadrant === 'fourth',
    ),
  };
  window.localStorage.setItem(url, JSON.stringify(tasks));
  payload.data.tasks = tasks;
  return payload;
  // return axios.delete(`${url}/${id}`);
}

export function updateTaskListImportantOrderApi(payload) {
  const tasks = fetchTaskListApi().data.tasks;
  const task = tasks.important.splice(payload.oldIndex, 1);
  tasks.important.splice(payload.newIndex, 0, task[0]);
  // window.localStorage.setItem(url, JSON.stringify([]));
  window.localStorage.setItem(url, JSON.stringify(tasks));
  payload = {
    data: {},
  };
  payload.data.tasks = tasks;
  return payload;
  // return axios.put(`${url}/taskListImportantOrder/${payload._id}`, {
  //   indexes: { oldIndex: payload.oldIndex, newIndex: payload.newIndex },
  // });
}

export function updateTaskListDailyOrderApi(payload) {
  const tasks = fetchTaskListApi().data.tasks;
  const task = tasks.daily.splice(payload.oldIndex, 1);
  tasks.daily.splice(payload.newIndex, 0, task[0]);
  // window.localStorage.setItem(url, JSON.stringify([]));
  window.localStorage.setItem(url, JSON.stringify(tasks));
  payload = {
    data: {},
  };
  payload.data.tasks = tasks.daily;
  return payload;
  // return axios.put(`${url}/taskListDailyOrder/${payload._id}`, {
  //   indexes: { oldIndex: payload.oldIndex, newIndex: payload.newIndex },
  // });
}

export function* saveTask({ payload }) {
  yield put(TaskActions.saveTaskPending());
  try {
    const taskList = yield call(saveTaskApi, payload.task);
    yield put(TaskActions.saveTaskFulfilled(taskList));
    yield call(payload.resolve);
    Alert.success('Task add success', {
      customFields: {
        bsStyle: 'success',
      },
    });
  } catch (e) {
    yield put(TaskActions.saveTaskRejected(e));
    yield call(payload.reject);
    Alert.error('Task add fail', {
      customFields: {
        bsStyle: 'danger',
      },
    });
  }
}

export function* fetchTaskList() {
  const taskList = yield call(fetchTaskListApi);
  yield put(TaskActions.receiveTaskList(taskList));
}

export function* fetchTask({ payload }) {
  const task = yield call(fetchTaskApi, payload);
  yield put(TaskActions.receiveTask(task));
}

export function* updateTask({ payload }) {
  yield put(TaskActions.updateTaskPending());
  try {
    const taskList = yield call(updateTaskApi, payload.task);
    yield put(TaskActions.updateTaskFulfilled(taskList));
    yield call(payload.resolve);
    Alert.info('Task update success', {
      customFields: {
        bsStyle: 'info',
      },
    });
  } catch (e) {
    yield put(TaskActions.updateTaskRejected(e));
    yield call(payload.reject);
    Alert.error('Task update fail', {
      customFields: {
        bsStyle: 'danger',
      },
    });
  }
}

export function* deleteTask({ payload }) {
  try {
    const taskList = yield call(deleteTaskApi, payload);
    yield put(TaskActions.deleteTaskFulfilled(taskList));
    yield put(TaskActions.updatePickAreaTaskList(payload));
    Alert.info('Task delete success', {
      customFields: {
        bsStyle: 'warning',
      },
    });
  } catch (e) {
    yield put(TaskActions.deleteTaskRejected(e));
    Alert.error('Task delete fail', {
      customFields: {
        bsStyle: 'danger',
      },
    });
  }
}

export function* updateTaskListImportantOrder({ payload }) {
  try {
    const taskList = yield call(updateTaskListImportantOrderApi, payload);
    yield put(TaskActions.updateTaskListImportantOrderFulfilled(taskList));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.updateTaskListImportantOrderRejected(e));
    yield call(payload.reject);
  }
}

export function* updateTaskListDailyOrder({ payload }) {
  try {
    const taskList = yield call(updateTaskListDailyOrderApi, payload);
    yield put(TaskActions.updateTaskListDailyOrderFulfilled(taskList));
    yield call(payload.resolve);
  } catch (e) {
    yield put(TaskActions.updateTaskListDailyOrderRejected(e));
    yield call(payload.reject);
  }
}

export function* pickAreaTaskList(_id) {
  yield put(TaskActions.pickAreaTaskList(_id));
}
