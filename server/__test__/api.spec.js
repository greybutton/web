/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../api/v1/models/user';

import app from '../';

const api = '/api/v1';
const apiSectors = `${api}/sectors`;

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
    it('should get all sectors', (done) => {
      const expected = { sectors: [] };
      request(app)
        .get(apiSectors)
        .then((res) => {
          const recevied = res.body;
          expect(res.status).toBe(200);
          expect(recevied).toEqual(expected);
        })
        .catch((err) => {
          console.log(err);
        });
      done();
    });
  });
  describe('get sector', () => {
    it('should 400 on a request for a nonexistant id', (done) => {
      request(app)
        .get(`${apiSectors}/999`)
        .then((res) => {
          expect(res.status).toBe(400);
        })
        .catch((err) => {
          console.log(err);
        });
      done();
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
    it('should not update a sector', () => {
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
});
