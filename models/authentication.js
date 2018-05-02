let db = require('../db');

exports.register = (data, cb) => {
  let collection = db.get().collection('users');
  // check if username already in use
  let user = {
    username: data.username
  }
  collection.findOne(user, (err, res) => {
    // if exist return empty string
    // if not insert the new document into collection
    if (res != null) {
      cb(err, { "username": '' })
    } else {
      collection.insertOne(data, (err, result) => cb(err, { "username": data.username }));
    }
  });
};

exports.login = (data, cb) => {
  let collection = db.get().collection('users');
  // check if the username is in database
  collection.findOne(data, (err, res) => {
    // if it is in, then return the login
    // if not return empty string
    if (res == null) {
      cb(err, { "username": ''})
    } else {
      cb(err, { "username": res.username });
    }
  });
};
