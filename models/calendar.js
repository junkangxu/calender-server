let db = require('../db');

exports.getAllCalendars = (data, cb) => {
  let collection = db.get().collection('users');
  collection.findOne(data, (err, res) => {
    cb(err, { "calendar": res.calendar });
  });
};

exports.addToCalendars = (user, task, cb) => {
  let collection = db.get().collection('users');
  // add object to calendar
  collection.update(user, {
    $push: {
      calendar: {
        $each: [task]
      }
    }
  }, (err, res) => {
    // remove object from inbox
    collection.update(user, {
      $pull: {
        inbox: {
          "title": task.title
        }
      }
    }, (err ,res) => cb(err, res));
  });
};
