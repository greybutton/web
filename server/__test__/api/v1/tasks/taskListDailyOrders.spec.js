/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../../../../api/v1/models/user';

import app from '../../../../'; // api/index.js folder

const api = '/api/v1';
const apiArea = `${api}/areas`;
const apiTask = `${api}/tasks`;

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
  it('should update task list daily order', () => {
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
          text: 'test post task list daily first',
          time: '00:30',
          area: area._id.toString(),
          quadrant: 'daily',
        };
        const taskSecond = {
          text: 'test post task list daily second',
          time: '00:30',
          area: area._id.toString(),
          quadrant: 'daily',
        };
        request(app).post(apiTask).send(taskFirst).then(() => {});
        return request(app)
          .post(apiTask)
          .send(taskSecond)
          .then((res) => {
            const tasks = res.body.tasks.daily;
            return tasks;
          })
          .then(tasks =>
            request(app)
              .put(`${apiTask}/taskListDailyOrder/${tasks[0]._id}`)
              .send({ indexes: { oldIndex: 0, newIndex: 1 } })
              .then((result) => {
                const recevied = result.body.tasks;
                expect(result.status).toBe(200);
                expect(recevied[0]).toMatchObject(taskFirst);
                expect(recevied[1]).toMatchObject(taskSecond);
              }),
          );
      });
  });
});
