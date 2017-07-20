/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../../../../api/v1/models/user';

import app from '../../../../'; // api/index.js folder

const api = '/api/v1';
const apiTasks = `${api}/tasks`;
const apiSectors = `${api}/sectors`;

describe(`Task ${apiTasks}`, () => {
  const sectorTest = {
    title: 'Test sector',
    score: 1,
    desirableScore: 10,
  };
  beforeEach((done) => {
    User.remove({})
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  describe('post task', () => {
    it('should not post a task without text field', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const task = {
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const recevied = res.body;
            const expected = {
              errors: {},
              name: 'ValidationError',
            };
            expect(res.status).toBe(400);
            expect(recevied).toMatchObject(expected);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not post a task without time field', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const task = {
            text: 'test post task',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const recevied = res.body;
            const expected = {
              errors: {},
              name: 'ValidationError',
            };
            expect(res.status).toBe(400);
            expect(recevied).toMatchObject(expected);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not post a task without sector field', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const task = {
            text: 'test post task',
            time: '00:30',
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const recevied = res.body;
            const expected = {
              errors: {},
              name: 'ValidationError',
            };
            expect(res.status).toBe(400);
            expect(recevied).toMatchObject(expected);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not post a task without matrixQuarter field', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const task = {
            text: 'test post task',
            time: '00:30',
            sector: sector._id.toString(),
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const recevied = res.body;
            const expected = {
              errors: {},
              name: 'ValidationError',
            };
            expect(res.status).toBe(400);
            expect(recevied).toMatchObject(expected);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should post a task without label field', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const task = {
            text: 'test post task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const recevied = res.body.tasks.important[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(task);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should post a task to important', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const taskFirst = {
            text: 'test post task first',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          const taskSecond = {
            text: 'test post task second',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          request(app).post(apiTasks).send(taskFirst).then(() => {});
          return request(app).post(apiTasks).send(taskSecond).then((res) => {
            const recevied = res.body.tasks.important;
            expect(res.status).toBe(200);
            expect(recevied[0]).toMatchObject(taskSecond);
            expect(recevied[1]).toMatchObject(taskFirst);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should post a task to notImportant', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const taskFirst = {
            text: 'test post task first',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'third',
            label: sector.title,
          };
          const taskSecond = {
            text: 'test post task second',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'third',
            label: sector.title,
          };
          request(app).post(apiTasks).send(taskFirst).then(() => {});
          return request(app).post(apiTasks).send(taskSecond).then((res) => {
            const recevied = res.body.tasks.notImportant;
            expect(res.status).toBe(200);
            expect(recevied[0]).toMatchObject(taskSecond);
            expect(recevied[1]).toMatchObject(taskFirst);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should post a task to daily', () => {
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const taskFirst = {
            text: 'test post task first',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'daily',
            label: sector.title,
          };
          const taskSecond = {
            text: 'test post task second',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'daily',
            label: sector.title,
          };
          request(app).post(apiTasks).send(taskFirst).then(() => {});
          return request(app).post(apiTasks).send(taskSecond).then((res) => {
            const recevied = res.body.tasks.daily;
            expect(res.status).toBe(200);
            expect(recevied[0]).toMatchObject(taskSecond);
            expect(recevied[1]).toMatchObject(taskFirst);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
