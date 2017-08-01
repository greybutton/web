/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../../../../api/v1/models/user';

import app from '../../../../'; // api/index.js folder

const api = '/api/v1';
const apiTask = `${api}/tasks`;
const apiArea = `${api}/areas`;

describe(`Task ${apiTask}`, () => {
  const areaTest = {
    title: 'Test area',
    score: 1,
    desirableScore: 10,
  };
  beforeEach((done) => {
    User.remove({}).then(() => {
      done();
    });
  });
  describe('get tasks', () => {
    it('should get all tasks', () => {
      const expected = { tasks: { daily: [], important: [], notImportant: [] } };
      expect.hasAssertions();
      return request(app).get(apiTask).then((res) => {
        const recevied = res.body;
        expect(res.status).toBe(200);
        expect(recevied).toEqual(expected);
      });
    });
  });
  describe('get task', () => {
    it('should 400 on a request for a nonexistant id', () => {
      expect.hasAssertions();
      return request(app).get(`${apiTask}/999`).then((res) => {
        expect(res.status).toBe(400);
      });
    });
    it('should get a task', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiArea)
        .send(areaTest)
        .then((res) => {
          const area = res.body.areas[0];
          return area;
        })
        .then((area) => {
          const task = {
            text: 'test get task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const task = res.body.tasks.important[0];
            return task;
          });
        })
        .then(task =>
          request(app).get(`${apiTask}/${task._id}`).then((res) => {
            const recevied = res.body.task;
            expect(res.status).toBe(200);
            expect(recevied).toHaveProperty('text', task.text);
            expect(recevied).toHaveProperty('time', task.time);
            expect(recevied).toHaveProperty('area', task.area);
            expect(recevied).toHaveProperty('quadrant', task.quadrant);
            expect(recevied).toHaveProperty('_id', task._id.toString());
          }),
        );
    });
  });
});
