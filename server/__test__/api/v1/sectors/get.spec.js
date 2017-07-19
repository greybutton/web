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
      expect.hasAssertions();
      return request(app)
        .post(apiSectors)
        .send(sector)
        .then((res) => {
          const expectedSector = res.body.sectors[0];
          return request(app)
            .get(`${apiSectors}/${res.body.sectors[0]._id}`)
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
});
