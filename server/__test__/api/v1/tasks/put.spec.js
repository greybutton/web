/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../../../../api/v1/models/user';

import app from '../../../../'; // api/index.js folder

const api = '/api/v1';
const apiSectors = `${api}/sectors`;
const apiTasks = `${api}/tasks`;

describe(`Task ${apiTasks}`, () => {
  const sectorTest = {
    title: 'Test sector',
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
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const task = {
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'first',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
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
        .post(apiSectors)
        .send(sectorTest)
        .then((res) => {
          const sector = res.body.sectors[0];
          return sector;
        })
        .then((sector) => {
          const task = {
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            sector: taskAdded.sector,
            matrixQuarter: 'first',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
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
    it('should not update a task without sector field', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            matrixQuarter: 'first',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
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
    it('should not update a task without matrixQuarter field', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
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
    it('should update a task without label field', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'first',
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.important[0];
            const expected = {
              text: 'test put update task',
              time: '00:30',
              sector: taskAdded.sector,
              matrixQuarter: 'first',
              label: 'plain',
            };
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(expected);
          });
        });
    });
    it('should update a task from important to notImportant', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'third',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.notImportant[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from important to daily', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'daily',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.daily[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from notImportant to important', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'third',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.notImportant[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'first',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.important[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from notImportant to daily', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'third',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.notImportant[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'daily',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.daily[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from daily to important', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'daily',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.daily[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'first',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.important[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from daily to notImportant', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'daily',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.daily[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'third',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.notImportant[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from important to important', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'first',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.important[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'first',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.important[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from notImportant to notImportant', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'third',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.notImportant[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'third',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.notImportant[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
    it('should update a task from daily to daily', () => {
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
            text: 'test put task',
            time: '00:30',
            sector: sector._id.toString(),
            matrixQuarter: 'daily',
            label: sector.title,
          };
          return request(app).post(apiTasks).send(task).then((res) => {
            const taskAdded = res.body.tasks.daily[0];
            return taskAdded;
          });
        })
        .then((taskAdded) => {
          const taskUpdate = {
            text: 'test put update task',
            time: '00:30',
            sector: taskAdded.sector,
            matrixQuarter: 'daily',
            label: taskAdded.label,
          };
          return request(app).put(`${apiTasks}/${taskAdded._id}`).send(taskUpdate).then((res) => {
            const recevied = res.body.tasks.daily[0];
            expect(res.status).toBe(200);
            expect(recevied).toMatchObject(taskUpdate);
          });
        });
    });
  });
});
