/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
import request from 'supertest';

import User from '../../../../api/v1/models/user';

import app from '../../../../'; // api/index.js folder

const api = '/api/v1';
const apiArea = `${api}/areas`;

describe(`Area ${apiArea}`, () => {
  beforeEach((done) => {
    User.remove({}).then(() => {
      done();
    });
  });
  describe('delete area', () => {
    it('should not delete area on a request for a nonexistand id', () => {
      expect.hasAssertions();
      return request(app).delete(`${apiArea}/999`).then((res) => {
        expect(res.status).toBe(500);
      });
    });
    it('should delete an area', () => {
      const area = {
        title: 'test delete area',
        score: 3,
        desirableScore: 7,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).delete(`${apiArea}/${areaId}`).then((result) => {
          const recevied = result.body;
          const expected = { areas: [] };
          expect(result.status).toBe(200);
          expect(recevied).toEqual(expected);
        });
      });
    });
  });
});
