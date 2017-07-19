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
  it('shold update sector order', () => {
    const sectorFirst = {
      title: 'test update sector order first',
      score: 1,
      desirableScore: 2,
    };
    const sectorSecond = {
      title: 'test update sector order second',
      score: 1,
      desirableScore: 2,
    };
    request(app).post(apiSectors).send(sectorFirst).then((res) => {});
    return request(app)
      .post(apiSectors)
      .send(sectorSecond)
      .then((res) => {
        const recevied = res.body.sectors;
        return recevied;
      })
      .then((recevied) => {
        expect.hasAssertions();
        return request(app)
          .put(`${apiSectors}/sectorOrder/${recevied[0]._id}`)
          .send({ indexes: { oldIndex: 0, newIndex: 1 } })
          .then((result) => {
            const recevied = result.body.sectors;
            expect(result.status).toBe(200);
            expect(recevied[0]).toMatchObject(sectorSecond);
            expect(recevied[1]).toMatchObject(sectorFirst);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
