/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../../../../api/v1/models/user';

import app from '../../../../'; // api/index.js folder

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
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const sectorId = res.body.sectors[0]._id;
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
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const sectorId = res.body.sectors[0]._id;
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
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const sectorId = res.body.sectors[0]._id;
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
    it('should not update a sector with score field more than 10', () => {
      const sector = {
        title: 'test put sector',
        score: 3,
        desirableScore: 7,
      };
      const sectorUpdtate = {
        title: 'test put sector update',
        score: 20,
        desirableScore: 6,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const sectorId = res.body.sectors[0]._id;
          return request(app)
            .put(`${apiSectors}/${sectorId}`)
            .send(sectorUpdtate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                name: 'ValidationError',
                errors: {},
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
    it('should not update a sector with desirable score field more than 10', () => {
      const sector = {
        title: 'test put sector',
        score: 3,
        desirableScore: 7,
      };
      const sectorUpdtate = {
        title: 'test put sector update',
        score: 6,
        desirableScore: 20,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const sectorId = res.body.sectors[0]._id;
          return request(app)
            .put(`${apiSectors}/${sectorId}`)
            .send(sectorUpdtate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                name: 'ValidationError',
                errors: {},
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
    it('should not update a sector with score field less than 0', () => {
      const sector = {
        title: 'test put sector',
        score: 3,
        desirableScore: 7,
      };
      const sectorUpdtate = {
        title: 'test put sector update',
        score: -10,
        desirableScore: 6,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const sectorId = res.body.sectors[0]._id;
          return request(app)
            .put(`${apiSectors}/${sectorId}`)
            .send(sectorUpdtate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                name: 'ValidationError',
                errors: {},
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
    it('should not update a sector with desirable score field less than 0', () => {
      const sector = {
        title: 'test put sector',
        score: 3,
        desirableScore: 7,
      };
      const sectorUpdtate = {
        title: 'test put sector update',
        score: 6,
        desirableScore: -10,
      };
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const sectorId = res.body.sectors[0]._id;
          return request(app)
            .put(`${apiSectors}/${sectorId}`)
            .send(sectorUpdtate)
            .then((result) => {
              const recevied = result.body;
              const expected = {
                name: 'ValidationError',
                errors: {},
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
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const sectorId = res.body.sectors[0]._id;
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
