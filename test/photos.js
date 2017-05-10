process.env.NODE_ENV = 'test';

// Connect to Test Database
let mongoose = require('mongoose');
let User = require('../models/user');
let jwt = require('jsonwebtoken');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let config = require('../config');
chai.use(chaiHttp);

describe('Photos', () => {

  beforeEach((done) => { // Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  /*** GET ***/
  describe('GET /photo/1', () => {
    let token = jwt.sign({
      username: 'username'
    }, config.jwtSecret, {
      expiresIn: '1m'
    });
    it('it should GET an aws url when user has access to the resource', (done) => {
      chai.request(server)
        .get('/photo/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('params');
          res.body.params.should.be.a('object');
          res.body.params.should.have.property('photoId');
          res.body.params.photoId.should.be.a('string');
          res.body.params.photoId.should.equal('1');
          done();
        });
    });
  });
});