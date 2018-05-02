let express = require('express');
let router = express.Router();
let db = require('../db');
let Contacts = require('../models/contacts');

router.get('/:username', (req, res) => {
  // get parameters from params
  let username = req.params.username;
  // log info to console for debug
  console.log('GET /contacts ' + username);
  // create mongodb query
  let data = {
    username: username
  };
  // use model to talk with database
  Contacts.getContacts(data, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/:username/:contact', (req, res) => {
  // get parameters from params
  let username = req.params.username;
  let contact = req.params.contact;
  // create the user object for query
  let data = {
    username: username
  };
  // create the receiver object for query
  let receiver = {
    username: contact
  };
  Contacts.addContact(data, receiver, (err, result) => {
    if (err) throw err;
    // null: receiver does not exist
    // exist: receiver already in contacts
    // otherwise: success
    if (result == null) {
      res.send({message: "none"})
    } else if (result == "exist") {
      res.send({message: "exist"});
    } else {
      res.send({message: "done"});
    }
  });
});

module.exports = router;
