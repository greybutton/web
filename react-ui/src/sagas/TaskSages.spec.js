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
});
