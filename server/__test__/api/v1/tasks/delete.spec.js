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
  describe('delete task', () => {
    it('should not delete task on a request for a nonexistand id', () => {
      expect.hasAssertions();
      return request(app).delete(`${apiTask}/999`).then((res) => {
        expect(res.status).toBe(500);
      });
    });
    it('should delete important task', () => {
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
            text: 'test delete important task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
            label: area.title,
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then(taskAdded =>
          request(app).delete(`${apiTask}/${taskAdded._id}`).then((result) => {
            const recevied = result.body;
            const expected = { tasks: { important: [], notImportant: [], daily: [] } };
            expect(result.status).toBe(200);
            expect(recevied).toEqual(expected);
          }),
        );
    });
    it('should delete not important task', () => {
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
            text: 'test delete not important task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'third',
            label: area.title,
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.notImportant[0];
            return taskAdded;
          });
        })
        .then(taskAdded =>
          request(app).delete(`${apiTask}/${taskAdded._id}`).then((result) => {
            const recevied = result.body;
            const expected = { tasks: { important: [], notImportant: [], daily: [] } };
            expect(result.status).toBe(200);
            expect(recevied).toEqual(expected);
          }),
        );
    });
    it('should delete daily task', () => {
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
            text: 'test delete daily task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'daily',
            label: area.title,
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.daily[0];
            return taskAdded;
          });
        })
        .then(taskAdded =>
          request(app).delete(`${apiTask}/${taskAdded._id}`).then((result) => {
            const recevied = result.body;
            const expected = { tasks: { important: [], notImportant: [], daily: [] } };
            expect(result.status).toBe(200);
            expect(recevied).toEqual(expected);
          }),
        );
    });
  });
});
