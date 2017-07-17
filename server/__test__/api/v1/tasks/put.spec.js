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
  describe('put task', () => {
    it('should not update a task without text field', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const taskUpdate = {
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
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.important[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                errors: {},
                name: 'ValidationError',
              };
              expect(result.status).toBe(400);
              expect(recevied).toMatchObject(expected);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not update a task without time field', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
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
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.important[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                errors: {},
                name: 'ValidationError',
              };
              expect(result.status).toBe(400);
              expect(recevied).toMatchObject(expected);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not update a task without sector field', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
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
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.important[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                errors: {},
                name: 'ValidationError',
              };
              expect(result.status).toBe(400);
              expect(recevied).toMatchObject(expected);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should not update a task without matrixQuarter field', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId,
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
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.important[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                errors: {},
                name: 'ValidationError',
              };
              expect(result.status).toBe(400);
              expect(recevied).toMatchObject(expected);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task without label field', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
      };
      const userTask = new User({
        tasks: {
          important: [task],
        },
      });
      return userTask
        .save()
        .then((res) => {
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.important[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.important[0];
              const expected = {
                text: 'test put update task',
                time: '00:30',
                sector: sectorTestId.toString(),
                matrixQuarter: 'first',
                label: 'plain',
              };
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(expected);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from important to notImportant', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'third',
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
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.important[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.notImportant[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from important to daily', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'daily',
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
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.important[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.daily[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from notImportant to important', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'third',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const userTask = new User({
        tasks: {
          notImportant: [task],
        },
      });
      return userTask
        .save()
        .then((res) => {
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.notImportant[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.important[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from notImportant to daily', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'third',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'daily',
        label: sectorTest.title,
      };
      const userTask = new User({
        tasks: {
          notImportant: [task],
        },
      });
      return userTask
        .save()
        .then((res) => {
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.notImportant[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.daily[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from daily to important', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'daily',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const userTask = new User({
        tasks: {
          daily: [task],
        },
      });
      return userTask
        .save()
        .then((res) => {
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.daily[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.important[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from daily to notImportant', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'daily',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'third',
        label: sectorTest.title,
      };
      const userTask = new User({
        tasks: {
          daily: [task],
        },
      });
      return userTask
        .save()
        .then((res) => {
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.daily[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.notImportant[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from important to important', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'first',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'second',
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
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.important[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.important[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from notImportant to notImportant', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'third',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'fourth',
        label: sectorTest.title,
      };
      const userTask = new User({
        tasks: {
          notImportant: [task],
        },
      });
      return userTask
        .save()
        .then((res) => {
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.notImportant[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.notImportant[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should update a task from daily to daily', () => {
      const userSector = new User({
        sectors: [sectorTest],
      });
      userSector.save().catch((err) => {
        console.log(err);
      });
      const sectorTestId = userSector.sectors[0]._id;
      const task = {
        text: 'test put task',
        time: '00:30',
        sector: sectorTestId,
        matrixQuarter: 'daily',
        label: sectorTest.title,
      };
      const taskUpdate = {
        text: 'test put update task',
        time: '00:30',
        sector: sectorTestId.toString(),
        matrixQuarter: 'daily',
        label: sectorTest.title,
      };
      const userTask = new User({
        tasks: {
          daily: [task],
        },
      });
      return userTask
        .save()
        .then((res) => {
          expect.hasAssertions();
          return request(app)
            .put(`${apiTasks}/${res.tasks.daily[0]._id}`)
            .send(taskUpdate)
            .then((result) => {
              const recevied = result.body.tasks.daily[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(taskUpdate);
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
