process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

describe('Index', () => {

  /*** GET ***/
  describe('GET /', () => {
    it('it should return a json with type property equal to get', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('type');
          res.body.type.should.equal('get');
          res.body.should.have.property('body');
          res.body.should.be.a('object');
          done();
        });
    });
  });

  /*** POST ***/
  describe('POST /', () => {

    it('it should return a json with type property equal to post', (done) => {
      chai.request(server)
        .post('/')
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('type');
          res.body.type.should.equal('post');
          res.body.should.have.property('body');
          res.body.should.be.a('object');
          done();
        });
    });
  });

  /*** PUT ***/
  describe('PUT /', () => {
    it('it should return a json with type property equal to put', (done) => {
      chai.request(server)
        .put('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('type');
          res.body.type.should.equal('put');
          res.body.should.have.property('body');
          res.body.should.be.a('object');
          done();
        });
    });
  });

  /*** DELETE ***/
  describe('DELETE /', () => {
    it('it should return a json with type property equal to delete', (done) => {
      chai.request(server)
        .delete('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('type');
          res.body.type.should.equal('delete');
          res.body.should.have.property('body');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});