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
  describe('post area', () => {
    it('should not post an area without title field', () => {
      const area = {
        score: 1,
        desirableScore: 2,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const recevied = res.body;
        const expected = {
          errors: {},
          name: 'ValidationError',
        };
        expect(res.status).toBe(400);
        expect(recevied).toMatchObject(expected);
      });
    });
    it('should not post an area without score field', () => {
      const area = {
        title: 'test post area without score',
        desirableScore: 2,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const recevied = res.body;
        const expected = {
          errors: {},
          name: 'ValidationError',
        };
        expect(res.status).toBe(400);
        expect(recevied).toMatchObject(expected);
      });
    });
    it('should not post an area without desirableScore field', () => {
      const area = {
        title: 'test post area without desirableScore',
        score: 1,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const recevied = res.body;
        const expected = {
          errors: {},
          name: 'ValidationError',
        };
        expect(res.status).toBe(400);
        expect(recevied).toMatchObject(expected);
      });
    });
    it('should not post an area with score field more than 10', () => {
      const area = {
        title: 'test post area with score more than 10',
        score: 20,
        desirableScore: 5,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const recevied = res.body;
        const expected = {
          errors: {},
          name: 'ValidationError',
        };
        expect(res.status).toBe(400);
        expect(recevied).toMatchObject(expected);
      });
    });
    it('should not post an area with desirable score field more than 10', () => {
      const area = {
        title: 'test post area with desirable score more than 10',
        score: 5,
        desirableScore: 20,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const recevied = res.body;
        const expected = {
          errors: {},
          name: 'ValidationError',
        };
        expect(res.status).toBe(400);
        expect(recevied).toMatchObject(expected);
      });
    });
    it('should not post an area with score field less than 0', () => {
      const area = {
        title: 'test post area with score less than 0',
        score: -10,
        desirableScore: 5,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const recevied = res.body;
        const expected = {
          errors: {},
          name: 'ValidationError',
        };
        expect(res.status).toBe(400);
        expect(recevied).toMatchObject(expected);
      });
    });
    it('should not post an area with desirable score field less than 0', () => {
      const area = {
        title: 'test post area with desirable score less than 0',
        score: 5,
        desirableScore: -10,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const recevied = res.body;
        const expected = {
          errors: {},
          name: 'ValidationError',
        };
        expect(res.status).toBe(400);
        expect(recevied).toMatchObject(expected);
      });
    });
    it('should post an area', () => {
      const areaFirst = {
        title: 'test post area first',
        score: 1,
        desirableScore: 2,
      };
      const areaSecond = {
        title: 'test post area second',
        score: 1,
        desirableScore: 2,
      };
      request(app).post(apiArea).send(areaFirst).then(() => {});
      expect.hasAssertions();
      return request(app).post(apiArea).send(areaSecond).then((res) => {
        const recevied = res.body.areas;
        expect(res.status).toBe(200);
        expect(recevied[0]).toMatchObject(areaFirst);
        expect(recevied[1]).toMatchObject(areaSecond);
      });
    });
  });
});
