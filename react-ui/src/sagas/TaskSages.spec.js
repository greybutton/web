import { put, call } from 'redux-saga/effects';
import * as TaskSagas from './TaskSagas';
import * as TaskActions from '../actions/TaskActions';

describe('Task sagas tests', () => {
  describe('post task saga', () => {
    const payload = {
      task: {
        text: 'test task actions',
        time: '00:15',
        sector: 2,
        matrixQuarter: 'first',
        label: 'sector title',
      },
      resolve: () => {},
      reject: () => {},
    };
    const gen = TaskSagas.saveTask({ payload });
    it('should put save task penging', () => {
      expect(gen.next().value).toEqual(put(TaskActions.saveTaskPending()));
    });
    it('should call save task api', () => {
      expect(gen.next().value).toEqual(call(TaskSagas.saveTaskApi, payload.task));
    });
    it('should put save task fulfilled', () => {
      expect(gen.next().value).toEqual(put(TaskActions.saveTaskFulfilled()));
    });
    it('should call resolve', () => {
      expect(gen.next().value).toEqual(call(payload.resolve));
    });
    it('should put save task reject', () => {
      expect(gen.throw().value).toEqual(put(TaskActions.saveTaskRejected()));
    });
    it('should call reject', () => {
      expect(gen.next().value).toEqual(call(payload.reject));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('get tasks saga', () => {
    const gen = TaskSagas.fetchTasks();
    it('should call get tasks api', () => {
      expect(gen.next().value).toEqual(call(TaskSagas.fetchTasksApi));
    });
    it('should put receive tasks', () => {
      expect(gen.next().value).toEqual(put(TaskActions.receiveTasks()));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('update important tasks order', () => {
    const payload = {
      task: {
        text: 'test task actions',
        time: '00:15',
        sector: 2,
        matrixQuarter: 'first',
        label: 'sector title',
      },
      resolve: () => {},
      reject: () => {},
    };
    const gen = TaskSagas.updateImportantTasksOrder({ payload });
    it('should call update important tasks order api', () => {
      expect(gen.next().value).toEqual(call(TaskSagas.updateImportantTasksOrderApi, payload));
    });
    it('should put update important tasks order fulfilled', () => {
      expect(gen.next().value).toEqual(put(TaskActions.updateImportantTasksOrderFulfilled()));
    });
    it('should call resolve', () => {
      expect(gen.next().value).toEqual(call(payload.resolve));
    });
    it('should put update important tasks order reject', () => {
      expect(gen.throw().value).toEqual(put(TaskActions.updateImportantTasksOrderRejected()));
    });
    it('should call reject', () => {
      expect(gen.next().value).toEqual(call(payload.reject));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
});
