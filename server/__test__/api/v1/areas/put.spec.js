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
  describe('put area', () => {
    it('should not update an area without title field', () => {
      const area = {
        title: 'test put area',
        score: 3,
        desirableScore: 7,
      };
      const areaUpdtate = {
        score: 5,
        desirableScore: 6,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).put(`${apiArea}/${areaId}`).send(areaUpdtate).then((result) => {
          const recevied = result.body;
          const expected = {
            errors: {},
            name: 'ValidationError',
          };
          expect(result.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        });
      });
    });
    it('should not update an area without score field', () => {
      const area = {
        title: 'test put area',
        score: 3,
        desirableScore: 7,
      };
      const areaUpdtate = {
        title: 'test put area update',
        desirableScore: 6,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).put(`${apiArea}/${areaId}`).send(areaUpdtate).then((result) => {
          const recevied = result.body;
          const expected = {
            name: 'CastError',
            path: 'score',
          };
          expect(result.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        });
      });
    });
    it('should not update an area without desirableScore field', () => {
      const area = {
        title: 'test put area',
        score: 3,
        desirableScore: 7,
      };
      const areaUpdtate = {
        title: 'test put area update',
        score: 5,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).put(`${apiArea}/${areaId}`).send(areaUpdtate).then((result) => {
          const recevied = result.body;
          const expected = {
            name: 'CastError',
            path: 'desirableScore',
          };
          expect(result.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        });
      });
    });
    it('should not update an area with score field more than 10', () => {
      const area = {
        title: 'test put area',
        score: 3,
        desirableScore: 7,
      };
      const areaUpdtate = {
        title: 'test put area update',
        score: 20,
        desirableScore: 6,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).put(`${apiArea}/${areaId}`).send(areaUpdtate).then((result) => {
          const recevied = result.body;
          const expected = {
            name: 'ValidationError',
            errors: {},
          };
          expect(result.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        });
      });
    });
    it('should not update an area with desirable score field more than 10', () => {
      const area = {
        title: 'test put area',
        score: 3,
        desirableScore: 7,
      };
      const areaUpdtate = {
        title: 'test put area update',
        score: 6,
        desirableScore: 20,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).put(`${apiArea}/${areaId}`).send(areaUpdtate).then((result) => {
          const recevied = result.body;
          const expected = {
            name: 'ValidationError',
            errors: {},
          };
          expect(result.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        });
      });
    });
    it('should not update an area with score field less than 0', () => {
      const area = {
        title: 'test put area',
        score: 3,
        desirableScore: 7,
      };
      const areaUpdtate = {
        title: 'test put area update',
        score: -10,
        desirableScore: 6,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).put(`${apiArea}/${areaId}`).send(areaUpdtate).then((result) => {
          const recevied = result.body;
          const expected = {
            name: 'ValidationError',
            errors: {},
          };
          expect(result.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        });
      });
    });
    it('should not update an area with desirable score field less than 0', () => {
      const area = {
        title: 'test put area',
        score: 3,
        desirableScore: 7,
      };
      const areaUpdtate = {
        title: 'test put area update',
        score: 6,
        desirableScore: -10,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).put(`${apiArea}/${areaId}`).send(areaUpdtate).then((result) => {
          const recevied = result.body;
          const expected = {
            name: 'ValidationError',
            errors: {},
          };
          expect(result.status).toBe(400);
          expect(recevied).toMatchObject(expected);
        });
      });
    });
    it('should update an area', () => {
      const area = {
        title: 'test put area',
        score: 3,
        desirableScore: 7,
      };
      const areaUpdtate = {
        title: 'test put area update',
        score: 5,
        desirableScore: 6,
      };
      expect.hasAssertions();
      return request(app).post(apiArea).send(area).then((res) => {
        const areaId = res.body.areas[0]._id;
        return request(app).put(`${apiArea}/${areaId}`).send(areaUpdtate).then((result) => {
          const recevied = result.body.areas[0];
          expect(result.status).toBe(200);
          expect(recevied).toMatchObject(areaUpdtate);
        });
      });
    });
  });
});
