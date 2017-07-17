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
});
