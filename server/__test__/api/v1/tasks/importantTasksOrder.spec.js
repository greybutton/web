/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../../../../api/v1/models/user';

import app from '../../../../'; // api/index.js folder

const api = '/api/v1';
const apiSectors = `${api}/Sectors`;
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
  it('shold update important tasks order', () => {
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
        return request(app)
          .post(apiTasks)
          .send(taskSecond)
          .then((res) => {
            const tasks = res.body.tasks.important;
            return tasks;
          })
          .then(tasks => request(app)
              .put(`${apiTasks}/tasksImportantOrder/${tasks[0]._id}`)
              .send({ indexes: { oldIndex: 0, newIndex: 1 } })
              .then((result) => {
                const recevied = result.body.tasks;
                expect(result.status).toBe(200);
                expect(recevied[0]).toMatchObject(taskFirst);
                expect(recevied[1]).toMatchObject(taskSecond);
              }));
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
