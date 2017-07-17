/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../../../../api/v1/models/user';

import app from '../../../../'; // api/index.js folder

const api = '/api/v1';
const apiTasks = `${api}/tasks`;

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
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiTasks)
        .send(task)
        .then((res) => {
          const recevied = res.body;
          const expected = {
            errors: {},
            name: 'ValidationError',
          };
          expect(res.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not post a task without time field', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test post task',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiTasks)
        .send(task)
        .then((res) => {
          const recevied = res.body;
          const expected = {
            errors: {},
            name: 'ValidationError',
          };
          expect(res.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not post a task without sector field', () => {
      const task = {
        text: 'test post task',
        time: '00:30',
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiTasks)
        .send(task)
        .then((res) => {
          const recevied = res.body;
          const expected = {
            errors: {},
            name: 'ValidationError',
          };
          expect(res.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not post a task without matrixQuarter field', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test post task',
        time: '00:30',
        sector: sectorTestId,
        label: sectorTest.title,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiTasks)
        .send(task)
        .then((res) => {
          const recevied = res.body;
          const expected = {
            errors: {},
            name: 'ValidationError',
          };
          expect(res.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should post a task without label field', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test post task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
      };
      expect.hasAssertions();
      return request(app)
        .post(apiTasks)
        .send(task)
        .then((res) => {
          const recevied = res.body.tasks.important[0];
          const expected = {
            text: 'test post task',
            time: '00:30',
            sector: sectorTestId.toString(),
            matrixQuarter: 'first',
            label: 'plain',
          };
          expect(res.status).toBe(200);
          expect(recevied).toMatchObject(expected);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should post a task to important', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test post task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiTasks)
        .send(task)
        .then((res) => {
          const recevied = res.body.tasks.important[0];
          expect(res.status).toBe(200);
          expect(recevied).toMatchObject(task);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should post a task to notImportant', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test post task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'third',
        label: sectorTest.title,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiTasks)
        .send(task)
        .then((res) => {
          const recevied = res.body.tasks.notImportant[0];
          expect(res.status).toBe(200);
          expect(recevied).toMatchObject(task);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should post a task to daily', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test post task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'daily',
        label: sectorTest.title,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiTasks)
        .send(task)
        .then((res) => {
          const recevied = res.body.tasks.daily[0];
          expect(res.status).toBe(200);
          expect(recevied).toMatchObject(task);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
