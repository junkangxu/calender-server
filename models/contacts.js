let db = require('../db');

exports.getContacts = (data, cb) => {
  let collection = db.get().collection('users');
  collection.findOne(data, (err, res) => {
    cb(err, { "contacts": res.contacts });
  });
};

exports.addContact = (data, contact, cb) => {
  let collection = db.get().collection('users');
  // first we check if the contact exist
  collection.findOne(contact, (err, res) => {
    if (res == null) {
      // if the contact does not exist, we send back err
      cb(err, null);
      return
    } else {
      let c = res.contacts.map(item => item.username);
      if (c.includes(data.username)) {
        cb(err, 'exist');
        return
      }
      // create the contact object
      let obj = {
        username: res.username,
        name: res.name
      }
      // insert the object into contacts list
      collection.update(data, {
        $push: {
          contacts: {
            $each: [obj]
          }
        }
      }, (err, res) => {
        // get the name of the sender
        collection.findOne(data, (err, res) => {
          // create the user object
          let obj = {
            username: res.username,
            name: res.name
          }
          // insert the object into contact's contacts list
          collection.update(contact, {
            $push: {
              contacts: {
                $each: [obj]
              }
            }
          }, (err, res) => cb(err, res));
        });
      });
    }
  });
}
