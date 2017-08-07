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
  describe('get areas', () => {
    it('should get all areas', () => {
      const expected = { areas: [] };
      expect.hasAssertions();
      return request(app).get(apiArea).then((res) => {
        const recevied = res.body;
        expect(res.status).toBe(200);
        expect(recevied).toEqual(expected);
      });
    });
  });
  describe('get area', () => {
    it('should 400 on a request for a nonexistant id', () => {
      expect.hasAssertions();
      return request(app).get(`${apiArea}/999`).then((res) => {
        expect(res.status).toBe(400);
      });
    });
    it('should get an area', () => {
      const area = {
        title: 'test get area',
        score: 3,
        desirableScore: 7,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const expected = res.body.areas[0];
        return request(app).get(`${apiArea}/${res.body.areas[0]._id}`).then((result) => {
          const recevied = result.body.area;
          expect(result.status).toBe(200);
          expect(recevied).toHaveProperty('title', expected.title);
          expect(recevied).toHaveProperty('score', expected.score);
          expect(recevied).toHaveProperty('desirableScore', expected.desirableScore);
          expect(recevied).toHaveProperty('_id', expected._id.toString());
        });
      });
    });
  });
});
