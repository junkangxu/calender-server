let db = require('../db');

exports.getProfile = (data, cb) => {
  let collection = db.get().collection('users');
  collection.findOne(data, (err, res) => {
    // there is no non-existence check
    // because if users can call this api
    // they must have already logged in
    let result = {
      name: res.name,
      username: res.username
    };
    cb(err, result);
  });
};
