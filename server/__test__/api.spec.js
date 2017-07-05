/* eslint no-underscore-dangle: 0 */
import request from 'supertest';
import mongoose from 'mongoose';

import User from '../api/v1/models/user';

import app from '../';

const api = '/api/v1';
const apiSectors = `${api}/sectors`;

describe(`Sector ${apiSectors}`, () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
    });
    done();
  });
  describe('get sectors', () => {
    it('should get all sectors', (done) => {
      const expected = [];
      request(app).get(apiSectors).end((err, res) => {
        const recevied = res.body;
        expect(res.status).toBe(200);
        expect(recevied).toEqual(expected);
      });
      done();
    });
  });
  describe('get sector', () => {
    it('should 400 on a request for a nonexistant id', (done) => {
      request(app).get(`${apiSectors}/999`).end((err, res) => {
        expect(res.status).toBe(400);
      });
      done();
    });
  });
});
