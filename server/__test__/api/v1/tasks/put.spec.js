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
  describe('put task', () => {
    it('should not update a task without text field', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'first',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
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
    it('should not update a task without time field', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            area: taskAdded.area,
            quadrant: 'first',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
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
    it('should not update a task without area field', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            quadrant: 'first',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
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
    it('should not update a task without quadrant field', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
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
    it('should update a task from important to notImportant', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'third',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.notImportant[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from important to daily', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'daily',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.daily[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from notImportant to important', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'third',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.notImportant[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'first',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.important[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from notImportant to daily', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'third',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.notImportant[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'daily',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.daily[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from daily to important', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'daily',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.daily[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'first',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.important[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from daily to notImportant', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'daily',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.daily[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'third',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.notImportant[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from important to important', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'first',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'first',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.important[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from notImportant to notImportant', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'third',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.notImportant[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'third',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.notImportant[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from daily to daily', () => {
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
            text: 'test put task',
            time: '00:30',
            area: area._id.toString(),
            quadrant: 'daily',
          };
          return request(app).post(apiTask).send(task).then((res) => {
            const taskAdded = res.body.tasks.daily[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            area: taskAdded.area,
            quadrant: 'daily',
          };
          return request(app).put(`${apiTask}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.daily[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
  });
});
