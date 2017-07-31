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
  describe('post task', () => {
    it('should not post a task without text field', () => {
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
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
            label: area.title,
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const recevied = res.body;
            const expected = {
              errors: {},
              name: 'ValidationError',
            };
            expect(res.status).toBe(400);
            expect(recevied).toMatchObject(expected);
          });
        });
    });
    it('should not post a task without time field', () => {
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
            text: 'test post task',
            area: area._id.toString(),
            quadrant: 'first',
            label: area.title,
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const recevied = res.body;
            const expected = {
              errors: {},
              name: 'ValidationError',
            };
            expect(res.status).toBe(400);
            expect(recevied).toMatchObject(expected);
          });
        });
    });
    it('should not post a task without area field', () => {
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
            text: 'test post task',
            time: '00:30',
            quadrant: 'first',
            label: area.title,
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const recevied = res.body;
            const expected = {
              errors: {},
              name: 'ValidationError',
            };
            expect(res.status).toBe(400);
            expect(recevied).toMatchObject(expected);
          });
        });
    });
    it('should not post a task without quadrant field', () => {
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
            text: 'test post task',
            time: '00:30',
            area: area._id.toString(),
            label: area.title,
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const recevied = res.body;
            const expected = {
              errors: {},
              name: 'ValidationError',
            };
            expect(res.status).toBe(400);
            expect(recevied).toMatchObject(expected);
          });
        });
    });
    it('should post a task without label field', () => {
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
            text: 'test post task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const recevied = res.body.tasks.important[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(task);
          });
        });
    });
    it('should post a task to important', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiArea)
        .send(areaTest)
        .then((res) => {
          const area = res.body.areas[0];
          return area;
        })
        .then((area) => {
          const taskFirst = {
            text: 'test post task first',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
            label: area.title,
          };
          const taskSecond = {
            text: 'test post task second',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
            label: area.title,
          };
          request(app).post(apiTask).send(taskFirst).then(() => {});
          return request(app).post(apiTask).send(taskSecond).then((res) => {
            const recevied = res.body.tasks.important;
            expect(res.status).toBe(200);
            expect(recevied[0]).toMatchObject(taskSecond);
            expect(recevied[1]).toMatchObject(taskFirst);
          });
        });
    });
    it('should post a task to notImportant', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiArea)
        .send(areaTest)
        .then((res) => {
          const area = res.body.areas[0];
          return area;
        })
        .then((area) => {
          const taskFirst = {
            text: 'test post task first',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'third',
            label: area.title,
          };
          const taskSecond = {
            text: 'test post task second',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'third',
            label: area.title,
          };
          request(app).post(apiTask).send(taskFirst).then(() => {});
          return request(app).post(apiTask).send(taskSecond).then((res) => {
            const recevied = res.body.tasks.notImportant;
            expect(res.status).toBe(200);
            expect(recevied[0]).toMatchObject(taskSecond);
            expect(recevied[1]).toMatchObject(taskFirst);
          });
        });
    });
    it('should post a task to daily', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiArea)
        .send(areaTest)
        .then((res) => {
          const area = res.body.areas[0];
          return area;
        })
        .then((area) => {
          const taskFirst = {
            text: 'test post task first',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'daily',
            label: area.title,
          };
          const taskSecond = {
            text: 'test post task second',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'daily',
            label: area.title,
          };
          request(app).post(apiTask).send(taskFirst).then(() => {});
          return request(app).post(apiTask).send(taskSecond).then((res) => {
            const recevied = res.body.tasks.daily;
            expect(res.status).toBe(200);
            expect(recevied[0]).toMatchObject(taskSecond);
            expect(recevied[1]).toMatchObject(taskFirst);
          });
        });
    });
  });
});
