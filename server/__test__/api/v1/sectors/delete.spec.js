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
