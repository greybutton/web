import { fork } from 'redux-saga/effects';
import root from './index.js';
import { watchSaveSector } from './watchers';

describe('test root saga', () => {
  it('should yield array watchers saga', () => {
    expect(root().next().value).toEqual(fork(watchSaveSector));
  });
});
