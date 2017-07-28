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
            text: 'test get task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const task = res.body.tasks.important[0];
            return task;
          });
        })
        .then(task =>
          request(app).get(`${apiTasks}/${task._id}`).then((res) => {
            const recevied = res.body.task;
            expect(res.status).toBe(200);
            expect(recevied).toHaveProperty('text', task.text);
            expect(recevied).toHaveProperty('time', task.time);
            expect(recevied).toHaveProperty('sector', task.sector);
            expect(recevied).toHaveProperty('matrixQuarter', task.matrixQuarter);
            expect(recevied).toHaveProperty('_id', task._id.toString());
          }),
        )
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
