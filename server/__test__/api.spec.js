import request from 'supertest';

import app from '../';

const api = '/api/v1';
const apiSectors = `${api}/sectors`;

describe(`Sector ${apiSectors}`, () => {
  describe('get sectors', () => {
    it('should get all sectors', () => {
      const expected = [];
      request(app).get(apiSectors).set('Accept', 'application/json').end((err, res) => {
        const recevied = res.body;
        expect(res.status).toBe(200);
        expected(recevied).toEqual(expected);
      });
    });
  });
  describe('get sector', () => {
    it('should 400 on a request for a nonexistant id', () => {
      request(app).get(`${apiSectors}/999`).end((err, res) => {
        expect(res.status).toBe(400);
      });
    });
  });
});
