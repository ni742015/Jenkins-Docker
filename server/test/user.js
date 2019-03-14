const config = require('../src/config');
const request = require('supertest');

const baseUrl = `http://localhost:${config.port}/api`
console.log(baseUrl);

describe('GET /user', function() {
  it('respond with json', function(done) {
    request(baseUrl)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});