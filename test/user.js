process.env.NODE_ENV = 'test';

// Connect to Test Database
let mongoose = require('mongoose');
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {

  beforeEach((done) => { // Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  /*** GET ***/
  describe('GET /user', () => {

    it('it should fail when user does not provide an email', (done) => {
      chai.request(server)
        .get('/user')
        .set('password', 'password')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Login failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          done();
        });
    });

    it('it should fail when user does not provide a password', (done) => {
      chai.request(server)
        .get('/user')
        .set('email', 'test@email.com')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Login failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          done();
        });
    });

    it('it should fail when user does not provide a valid email', (done) => {
      chai.request(server)
        .get('/user')
        .set('email', '<invalid>')
        .set('password', 'password')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Login failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          done();
        });
    });

    it('it should fail when user does not provide a valid password', (done) => {
      chai.request(server)
        .get('/user')
        .set('email', 'test@email.com')
        .set('password', 'short')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Login failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          done();
        });
    });

    it('it should fail when user exists, but does not provide the correct password', (done) => {
      // create a new user
      let user = new User({
        email: 'test@email.com',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname'
      });

      user.save(() => {
        chai.request(server)
          .get('/user')
          .set('email', 'test@email.com')
          .set('password', 'incorrect')
          .end((err, res) => {
            res.should.have.status(401);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Login failed');
            res.body.should.have.property('token');
            res.body.token.should.equal(false);
            done();
          });
      });
    });

    it('it should pass when a user provides the correct email and password', (done) => {
      // create a new user
      let user = new User({
        email: 'test@email.com',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname'
      });

      user.save(() => {
        chai.request(server)
          .get('/user')
          .set('email', 'test@email.com')
          .set('password', 'password')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('message');
            res.body.message.should.equal('Login Successful');
            res.body.should.have.property('token');
            res.body.token.should.be.a('string');
            res.body.should.have.property('user');
            res.body.user.should.be.a('object');
            res.body.user.should.have.property('email');
            res.body.user.email.should.be.a('string');
            res.body.user.email.should.equal('test@email.com');
            res.body.user.should.not.have.property('password');
            res.body.should.not.have.property('password');
            done();
          });
      });
    });
  });

  /*** POST ***/
  describe('POST /user', () => {
    it('it should fail if the email is not provided', (done) => {
      chai.request(server)
        .post('/user')
        .set('email', '')
        .set('password', 'password')
        .set('firstname', 'firstname')
        .set('lastname', 'lastname')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Registration Failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          res.body.should.have.property('user');
          res.body.user.should.equal(false);
          done();
        });
    });

    it('it should fail if the firstname is not provided', (done) => {
      chai.request(server)
        .post('/user')
        .set('email', 'test@email.com')
        .set('password', 'password')
        .set('firstname', '')
        .set('lastname', 'lastname')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Registration Failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          res.body.should.have.property('user');
          res.body.user.should.equal(false);
          done();
        });
    });

    it('it should fail if the lastname is not provided', (done) => {
      chai.request(server)
        .post('/user')
        .set('email', 'test@email.com')
        .set('password', 'password')
        .set('firstname', 'firstname')
        .set('lastname', '')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Registration Failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          res.body.should.have.property('user');
          res.body.user.should.equal(false);
          done();
        });
    });

    it('it should fail if the password is not provided', (done) => {
      chai.request(server)
        .post('/user')
        .set('email', 'test@email.com')
        .set('password', '')
        .set('firstname', 'firstname')
        .set('lastname', 'lastname')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Registration Failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          res.body.should.have.property('user');
          res.body.user.should.equal(false);
          done();
        });
    });

    it('it should fail if the email is not provided', (done) => {
      chai.request(server)
        .post('/user')
        .set('email', '')
        .set('password', 'password')
        .set('firstname', 'firstname')
        .set('lastname', 'lastname')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Registration Failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          res.body.should.have.property('user');
          res.body.user.should.equal(false);
          done();
        });
    });

    it('it should fail if the email is not valid', (done) => {
      chai.request(server)
        .post('/user')
        .set('email', 'curti')
        .set('password', 'password')
        .set('firstname', 'firstname')
        .set('lastname', 'lastname')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Registration Failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          res.body.should.have.property('user');
          res.body.user.should.equal(false);
          done();
        });
    });

    it('it should fail if the password is not valid', (done) => {
      chai.request(server)
        .post('/user')
        .set('email', 'test@email.com')
        .set('password', 'short')
        .set('firstname', 'firstname')
        .set('lastname', 'lastname')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Registration Failed');
          res.body.should.have.property('token');
          res.body.token.should.equal(false);
          res.body.should.have.property('user');
          res.body.user.should.equal(false);
          done();
        });
    });

    it('it should fail if the email already exists', (done) => {
      let user = new User({
        email: 'test@email.com',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname'
      });

      user.save(() => {
        chai.request(server)
          .post('/user')
          .set('email', 'test@email.com')
          .set('password', 'different')
          .set('firstname', 'firstname')
          .set('lastname', 'lastname')
          .end((err, res) => {
            res.should.have.status(409);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Registration Failed');
            res.body.should.have.property('token');
            res.body.token.should.equal(false);
            res.body.should.have.property('user');
            res.body.user.should.equal(false);
            done();
          });
      });
    });

    it('it should pass if the email and password are correct', (done) => {

      let user = new User({
        email: 'test@email.com',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname'
      });

      chai.request(server)
        .post('/user')
        .set('email', 'test@email.com')
        .set('password', 'password')
        .set('firstname', 'firstname')
        .set('lastname', 'lastname')
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(true);
          res.body.should.have.property('message');
          res.body.message.should.equal('Registration Successful');
          res.body.should.have.property('token');
          res.body.token.should.be.a('string');
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          res.body.user.should.have.property('email');
          res.body.user.email.should.be.a('string');
          res.body.user.email.should.equal('test@email.com');
          res.body.user.should.not.have.property('password');
          res.body.should.not.have.property('password');
          done();
        });
    });

  });

  /*** PUT ***/
  describe('PUT /user', () => {

    it('it should redirect the user when they do not provide a token', (done) => {
      chai.request(server)
        .put('/user').redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('No token provided.');
          done();
        });
    });

    it('it should fail authentication when the token is invalid', (done) => {
      chai.request(server)
        .put('/user')
        .set('x-access-token', false)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.equal('Failed to authenticate token.');
          done();
        });
    });
  });
});