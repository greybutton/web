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
  describe('get tasks', () => {
    it('should get all tasks', () => {
      const expected = { tasks: [] };
      expect.hasAssertions();
      return request(app)
        .get(apiTasks)
        .then((res) => {
          const recevied = res.body;
          expect(res.status).toBe(200);
          expect(recevied).toEqual(expected);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  describe('get task', () => {
    it('should 400 on a request for a nonexistant id', () => {
      expect.hasAssertions();
      return request(app)
        .get(`${apiTasks}/999`)
        .then((res) => {
          expect(res.status).toBe(400);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should get a task', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test get task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const userTask = new User({
        tasks: {
          important: [task],
        },
      });
      return userTask
        .save()
        .then((res) => {
          const expectedTask = res.tasks.important[0];
          expect.hasAssertions();
          return request(app)
            .get(`${apiTasks}/${res.tasks.important[0]._id}`)
            .then((result) => {
              const actualTask = result.body.task;
              expect(result.status).toBe(200);
              expect(actualTask).toHaveProperty('text', expectedTask.text);
              expect(actualTask).toHaveProperty('time', expectedTask.time);
              expect(actualTask).toHaveProperty('sector', expectedTask.sector.toString());
              expect(actualTask).toHaveProperty('matrixQuarter', expectedTask.matrixQuarter);
              expect(actualTask).toHaveProperty('_id', expectedTask._id.toString());
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
