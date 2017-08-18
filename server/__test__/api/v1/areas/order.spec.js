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
  it('should update area order', () => {
    const areaFirst = {
      title: 'test update area order first',
      score: 1,
      desirableScore: 2,
    };
    const areaSecond = {
      title: 'test update area order second',
      score: 1,
      desirableScore: 2,
    };
    request(app).post(apiArea).send(areaFirst).then(() => {});
    expect.hasAssertions();
    return request(app)
      .post(apiArea)
      .send(areaSecond)
      .then((res) => {
        const areas = res.body.areas;
        return areas;
      })
      .then(areas =>
        request(app)
          .put(`${apiArea}/areaListOrder/${areas[0]._id}`)
          .send({ indexes: { oldIndex: 0, newIndex: 1 } })
          .then((result) => {
            const recevied = result.body.areas;
            expect(result.status).toBe(200);
            expect(recevied[0]).toMatchObject(areaSecond);
            expect(recevied[1]).toMatchObject(areaFirst);
          }),
      );
  });
});
