// import reuseable database config
let db = require('../db');
// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var host = "http://localhost:3000";
chai.use(chaiHttp);

// parent block of Authentication Router
describe('Authentication', () => {

  describe('GET /login', () => {
    // return username with existing username and correct password
    it('correct username and password entered', (done) => {
      chai.request(host)
        .get('/authentication/login')
        .query({ username: 'junkangxu', password: 'Xjk951227' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username').eql('junkangxu');
          done();
        });
    });

    // return empty string if non-existent username entered
    it('non exist username entered', (done => {
      chai.request(host)
        .get('/authentication/login')
        .query({ username: 'nonexist', password: 'anything' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username').eql('');
          done();
        });
    }));
  });

  describe('GET /register', () => {
    // return empty string if duplicate username already in database
    it('duplicate username entered', (done => {
      chai.request(host)
        .get('/authentication/register')
        .query({ name: 'Junkang Xu', username: 'junkangxu', password: 'Xjk951227' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username').eql('');
          done();
        });
    }));
  });
});

// parent block for Inbox Router
describe('Inbox', () => {

  describe('GET /inbox/:username', () => {
    // return a list of inbox
    it('get inbox for a user', (done => {
      chai.request(host)
        .get('/inbox/junkangxu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('inbox').is.a('array');
          done();
        });
    }));
  });

  describe('POST /inbox/:username/:contact', () => {
    it('create task from user to contact', (done => {
      chai.request(host)
        .post('/inbox/junkangxu/drinkonshoo/task={"title":"none"}')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').is.a('string');
          done();
        });
    }));

    it('create task to contact not in contact list', (done => {
      chai.request(host)
        .post('/inbox/junkangxu/bruce/task={"title": "happy"}')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').is.a('string').eql('none');
          done();
        });
    }));
  });

});

// parent block for Contacts Router
describe('Contacts', () => {

  describe('GET /contacts/:username', () => {
    // return a list of contacts
    it('get contacts for a user', (done => {
      chai.request(host)
        .get('/contacts/junkangxu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('contacts').is.a('array');
          done();
        });
    }));
  });

  describe('POST /contacts/:username/:contact', () => {
    it('add contact to user contacts list', (done) => {
      chai.request(host)
        .post('/contacts/junkangxu/tonystark')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').is.a('string');
          done();
        });
    });

    it('add contact does not exist', (done) => {
      chai.request(host)
        .post('/contacts/junkangxu/bruce')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').is.a('string').eql('none');
          done();
        });
    });
  });


});

// parent block for Profile Router
describe('Profile', () => {

  describe('GET /profile/:username', () => {
    // return an object of info
    it('get profile for a user', (done => {
      chai.request(host)
        .get('/profile/junkangxu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('name').is.a('string');
          res.body.should.have.property('username').is.a('string');
          done();
        });
    }));
  });

});

// parent block for Calendar Router
describe('Calendar', () => {

  describe('GET /calendar/:username', () => {
    // return an object of calendar
    it('get calendar for a user', (done => {
      chai.request(host)
        .get('/calendar/junkangxu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('calendar').is.a('array');
          done();
        });
    }));
  });

  describe('POST /calendar/:username', () => {
    it('add task to user calendar', (done => {
      chai.request(host)
        .post('/calendar/junkangxu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').is.a('string');
          done();
        });
    }));
  });

});
