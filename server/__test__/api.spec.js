/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../api/v1/models/user';

import app from '../';

const api = '/api/v1';
const apiSectors = `${api}/sectors`;
const apiTasks = `${api}/tasks`;

describe(`Sector ${apiSectors}`, () => {
  beforeEach((done) => {
    User.remove({})
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  describe('get sectors', () => {
    it('should get all sectors', () => {
      const expected = { sectors: [] };
      expect.hasAssertions();
      return request(app)
        .get(apiSectors)
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
  describe('get sector', () => {
    it('should 400 on a request for a nonexistant id', () => {
      expect.hasAssertions();
      return request(app)
        .get(`${apiSectors}/999`)
        .then((res) => {
          expect(res.status).toBe(400);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should get a sector', () => {
      const sector = {
        title: 'test get sector',
        score: 3,
        desirableScore: 7,
      };
      const user = new User({
        sectors: [sector],
      });
      return user
        .save()
        .then((res) => {
          const expectedSector = res.sectors[0];
          expect.hasAssertions();
          return request(app)
            .get(`${apiSectors}/${res.sectors[0]._id}`)
            .then((result) => {
              const actualSector = result.body.sector;
              expect(result.status).toBe(200);
              expect(actualSector).toHaveProperty('title', expectedSector.title);
              expect(actualSector).toHaveProperty('score', expectedSector.score);
              expect(actualSector).toHaveProperty('desirableScore', expectedSector.desirableScore);
              expect(actualSector).toHaveProperty('_id', expectedSector._id.toString());
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
  describe('post sector', () => {
    it('should not post a sector without title field', () => {
      const sector = {
        score: 1,
        desirableScore: 2,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
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

    it('should not post a sector without score field', () => {
      const sector = {
        title: 'test post sector without score',
        desirableScore: 2,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
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
    it('should not post a sector without desirableScore field', () => {
      const sector = {
        title: 'test post sector without desirableScore',
        score: 1,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
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
    it('should post a sector', () => {
      const sector = {
        title: 'test post sector',
        score: 1,
        desirableScore: 2,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const recevied = res.body.sectors[0];
          expect(res.status).toBe(200);
          expect(recevied).toMatchObject(sector);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  describe('put sector', () => {
    it('should not update a sector without title field', () => {
      const sector = {
        title: 'test put sector',
        score: 3,
        desirableScore: 7,
      };
      const sectorUpdtate = {
        score: 5,
        desirableScore: 6,
      };
      const user = new User({
        sectors: [sector],
      });
      return user
        .save()
        .then((res) => {
          const sectorId = res.sectors[0]._id;
          expect.hasAssertions();
          return request(app)
            .put(`${apiSectors}/${sectorId}`)
            .send(sectorUpdtate)
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
    it('should not update a sector without score field', () => {
      const sector = {
        title: 'test put sector',
        score: 3,
        desirableScore: 7,
      };
      const sectorUpdtate = {
        title: 'test put sector update',
        desirableScore: 6,
      };
      const user = new User({
        sectors: [sector],
      });
      return user
        .save()
        .then((res) => {
          const sectorId = res.sectors[0]._id;
          expect.hasAssertions();
          return request(app)
            .put(`${apiSectors}/${sectorId}`)
            .send(sectorUpdtate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                name: 'CastError',
                path: 'score',
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
    it('should not update a sector without desirableScore field', () => {
      const sector = {
        title: 'test put sector',
        score: 3,
        desirableScore: 7,
      };
      const sectorUpdtate = {
        title: 'test put sector update',
        score: 5,
      };
      const user = new User({
        sectors: [sector],
      });
      return user
        .save()
        .then((res) => {
          const sectorId = res.sectors[0]._id;
          expect.hasAssertions();
          return request(app)
            .put(`${apiSectors}/${sectorId}`)
            .send(sectorUpdtate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                name: 'CastError',
                path: 'desirableScore',
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
    it('should update a sector', () => {
      const sector = {
        title: 'test put sector',
        score: 3,
        desirableScore: 7,
      };
      const sectorUpdtate = {
        title: 'test put sector update',
        score: 5,
        desirableScore: 6,
      };
      const user = new User({
        sectors: [sector],
      });
      return user
        .save()
        .then((res) => {
          const sectorId = res.sectors[0]._id;
          expect.hasAssertions();
          return request(app)
            .put(`${apiSectors}/${sectorId}`)
            .send(sectorUpdtate)
            .then((result) => {
              const recevied = result.body.sectors[0];
              expect(result.status).toBe(200);
              expect(recevied).toMatchObject(sectorUpdtate);
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
  describe('delete sector', () => {
    it('should not delete sector on a request for a nonexistand id', () => {
      expect.hasAssertions();
      return request(app)
        .delete(`${apiSectors}/999`)
        .then((res) => {
          expect(res.status).toBe(400);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    it('should delete a sector', () => {
      const sector = {
        title: 'test delete sector',
        score: 3,
        desirableScore: 7,
      };
      const user = new User({
        sectors: [sector],
      });
      return user
        .save()
        .then((res) => {
          const sectorId = res.sectors[0]._id;
          expect.hasAssertions();
          return request(app)
            .delete(`${apiSectors}/${sectorId}`)
            .then((result) => {
              const recevied = result.body;
              const expected = { sectors: [] };
              expect(result.status).toBe(200);
              expect(recevied).toEqual(expected);
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
        matrixQuater: 'first',
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
              expect(actualTask).toHaveProperty('matrixQuater', expectedTask.matrixQuater);
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
        matrixQuater: 'first',
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
        matrixQuater: 'first',
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
        matrixQuater: 'first',
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
    it('should not post a task without matrixQuater field', () => {
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
        matrixQuater: 'first',
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
            matrixQuater: 'first',
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
        matrixQuater: 'first',
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
        matrixQuater: 'third',
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
        matrixQuater: 'daily',
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
