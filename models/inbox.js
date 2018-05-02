let db = require('../db');

exports.getInbox = (data, cb) => {
  let collection = db.get().collection('users');
  collection.findOne(data, (err, res) => {
    cb(err, { "inbox": res.inbox });
  });
}

exports.createTask = (data, receiver, task, cb) => {
  let collection = db.get().collection('users');
  // check if receiver is in user's contacts list
  collection.findOne(data, (err, res) => {
    let contacts = res.contacts.map(item => item.username);
    if (contacts.includes(receiver.username)) {
      // push task into receiver's inbox
      collection.update(receiver, {
        $push: {
          inbox: {
            $each: [task]
          }
        }
      }, (err, res) => {
        // push task into user's inbox
        collection.update(data, {
          $push: {
            inbox: {
              $each: [task]
            }
          }
        }, (err, res) => cb(err, res));
      });
    } else {
      cb(err, null);
    }
  });
}
