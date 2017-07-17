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
      const sectorFirst = {
        title: 'test post sector first',
        score: 1,
        desirableScore: 2,
      };
      const sectorSecond = {
        title: 'test post sector second',
        score: 1,
        desirableScore: 2,
      };
      request(app).post(apiSectors).send(sectorFirst).then(() => {});
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sectorSecond)
        .then((res) => {
          const recevied = res.body.sectors;
          expect(res.status).toBe(200);
          expect(recevied[0]).toMatchObject(sectorFirst);
          expect(recevied[1]).toMatchObject(sectorSecond);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
