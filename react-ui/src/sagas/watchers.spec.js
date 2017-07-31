import { takeLatest } from 'redux-saga/effects';
import * as Watchers from './watchers';
import * as AreaSagas from './AreaSagas';
import * as TaskSagas from './TaskSagas';
import * as types from '../constants/actionTypes';

describe('test watch save area', () => {
  describe('post area', () => {
    const gen = Watchers.watchSaveArea();
    it('should call watchSaveArea', () => {
      expect(gen.next().value).toEqual(takeLatest(types.SAVE_AREA, AreaSagas.saveArea));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('get area list', () => {
    const gen = Watchers.watchRequestAreaList();
    it('should call watchRequestAreaList', () => {
      expect(gen.next().value).toEqual(
        takeLatest(types.REQUEST_AREA_LIST, AreaSagas.fetchAreaList),
      );
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('put area', () => {
    describe('fetch area', () => {
      const gen = Watchers.watchRequestArea();
      it('should call watchRequestArea', () => {
        expect(gen.next().value).toEqual(takeLatest(types.REQUEST_AREA, AreaSagas.fetchArea));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
    describe('update area', () => {
      const gen = Watchers.watchUpdateArea();
      it('should call watchUpdateArea', () => {
        expect(gen.next().value).toEqual(takeLatest(types.UPDATE_AREA, AreaSagas.updateArea));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
  });
  describe('update area list order', () => {
    const gen = Watchers.watchUpdateAreaListOrder();
    it('should call watchUpdateAreaListOrder', () => {
      expect(gen.next().value).toEqual(
        takeLatest(types.UPDATE_AREA_LIST_ORDER, AreaSagas.updateAreaListOrder),
      );
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
});

describe('test watch save task', () => {
  describe('post task', () => {
    const gen = Watchers.watchSaveTask();
    it('should call watchSaveTask', () => {
      expect(gen.next().value).toEqual(takeLatest(types.SAVE_TASK, TaskSagas.saveTask));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('get tasks', () => {
    const gen = Watchers.watchRequestTaskList();
    it('should call watchRequestTasks', () => {
      expect(gen.next().value).toEqual(
        takeLatest(types.REQUEST_TASK_LIST, TaskSagas.fetchTaskList),
      );
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('put task', () => {
    describe('fetch task', () => {
      const gen = Watchers.watchRequestTask();
      it('should call watchRequestTask', () => {
        expect(gen.next().value).toEqual(takeLatest(types.REQUEST_TASK, TaskSagas.fetchTask));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
    describe('update task', () => {
      const gen = Watchers.watchUpdateTask();
      it('should call watchUpdateTask', () => {
        expect(gen.next().value).toEqual(takeLatest(types.UPDATE_TASK, TaskSagas.updateTask));
      });
      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
  });
  describe('delete task', () => {
    const gen = Watchers.watchDeleteTask();
    it('should call watchDeleteTask', () => {
      expect(gen.next().value).toEqual(takeLatest(types.DELETE_TASK, TaskSagas.deleteTask));
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('update task list important order', () => {
    const gen = Watchers.watchUpdateTaskListImportantOrder();
    it('should call watchUpdateTaskListImportantOrder', () => {
      expect(gen.next().value).toEqual(
        takeLatest(types.UPDATE_TASK_LIST_IMPORTANT_ORDER, TaskSagas.updateTaskListImportantOrder),
      );
    });
    it('should be done', () => {
      expect(gen.next().done).toEqual(true);
    });
  });
});
