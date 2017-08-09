/* eslint no-underscore-dangle: 0 */
import { put, call } from 'redux-saga/effects';
import * as TaskSagas from './TaskSagas';
import * as TaskActions from '../actions/TaskActions';

describe('Task sagas tests', () => {
  const task = {
    _id: 123,
    text: 'test task sagas',
    time: '00:15',
    area: 2,
    quadrant: 'first',
  };
  describe('post task saga', () => {
    const payload = {
      task,
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
  describe('get task list saga', () => {
    const gen = TaskSagas.fetchTaskList();
    it('should call get task list api', () => {
      expect(gen.next().value).toEqual(call(TaskSagas.fetchTaskListApi));
    });
    it('should put receive task list', () => {
      expect(gen.next().value).toEqual(put(TaskActions.receiveTaskList()));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('put task saga', () => {
    describe('fetch task', () => {
      const payload = task._id;
      const gen = TaskSagas.fetchTask({ payload });
      it('should call get task api', () => {
        expect(gen.next().value).toEqual(call(TaskSagas.fetchTaskApi, payload));
      });
      it('should put receive task', () => {
        expect(gen.next().value).toEqual(put(TaskActions.receiveTask()));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
    describe('update task', () => {
      const payload = {
        task,
        resolve: () => {},
        reject: () => {},
      };
      const gen = TaskSagas.updateTask({ payload });
      it('should put update task penging', () => {
        expect(gen.next().value).toEqual(put(TaskActions.updateTaskPending()));
      });
      it('should call update task api', () => {
        expect(gen.next().value).toEqual(call(TaskSagas.updateTaskApi, payload.task));
      });
      it('should put update task fulfilled', () => {
        expect(gen.next().value).toEqual(put(TaskActions.updateTaskFulfilled()));
      });
      it('should call resolve', () => {
        expect(gen.next().value).toEqual(call(payload.resolve));
      });
      it('should put update task reject', () => {
        expect(gen.throw().value).toEqual(put(TaskActions.updateTaskRejected()));
      });
      it('should call reject', () => {
        expect(gen.next().value).toEqual(call(payload.reject));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
  });
  describe('delete task', () => {
    const payload = task._id;
    const gen = TaskSagas.deleteTask({ payload });
    it('should call delete task api', () => {
      expect(gen.next().value).toEqual(call(TaskSagas.deleteTaskApi, payload));
    });
    it('should put delete task fulfilled', () => {
      expect(gen.next().value).toEqual(put(TaskActions.deleteTaskFulfilled()));
    });
    it('should put update pick area task list', () => {
      expect(gen.next().value).toEqual(put(TaskActions.updatePickAreaTaskList(payload)));
    });
    it('should put delete task reject', () => {
      expect(gen.throw().value).toEqual(put(TaskActions.deleteTaskRejected()));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('update task list important order', () => {
    const payload = {
      task,
      resolve: () => {},
      reject: () => {},
    };
    const gen = TaskSagas.updateTaskListImportantOrder({ payload });
    it('should call update task list important order api', () => {
      expect(gen.next().value).toEqual(call(TaskSagas.updateTaskListImportantOrderApi, payload));
    });
    it('should put update task list important order fulfilled', () => {
      expect(gen.next().value).toEqual(put(TaskActions.updateTaskListImportantOrderFulfilled()));
    });
    it('should call resolve', () => {
      expect(gen.next().value).toEqual(call(payload.resolve));
    });
    it('should put update task list important order reject', () => {
      expect(gen.throw().value).toEqual(put(TaskActions.updateTaskListImportantOrderRejected()));
    });
    it('should call reject', () => {
      expect(gen.next().value).toEqual(call(payload.reject));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('update task list daily order', () => {
    const payload = {
      task,
      resolve: () => {},
      reject: () => {},
    };
    const gen = TaskSagas.updateTaskListDailyOrder({ payload });
    it('should call update task list daily order api', () => {
      expect(gen.next().value).toEqual(call(TaskSagas.updateTaskListDailyOrderApi, payload));
    });
    it('should put update task list daily order fulfilled', () => {
      expect(gen.next().value).toEqual(put(TaskActions.updateTaskListDailyOrderFulfilled()));
    });
    it('should call resolve', () => {
      expect(gen.next().value).toEqual(call(payload.resolve));
    });
    it('should put update task list daily order reject', () => {
      expect(gen.throw().value).toEqual(put(TaskActions.updateTaskListDailyOrderRejected()));
    });
    it('should call reject', () => {
      expect(gen.next().value).toEqual(call(payload.reject));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('pick area task list', () => {
    const gen = TaskSagas.pickAreaTaskList(task.area);
    it('should put pick area task list', () => {
      expect(gen.next().value).toEqual(put(TaskActions.pickAreaTaskList(task.area)));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
});
