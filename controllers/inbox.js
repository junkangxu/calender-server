let express = require('express');
let router = express.Router();
let db = require('../db');
let Inbox = require('../models/inbox');

router.get('/:username', (req, res) => {
  // get parameters from params
  let username = req.params.username;
  // log info to console for debug
  console.log('GET /inbox ' + username);
  // create mongodb query
  let data = {
    username: username
  }
  // use model to talk with database
  Inbox.getInbox(data, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/:username/:receiver', (req, res) => {
  // get parameters from query url
  let username = req.params.username.toLowerCase();
  let receiver = req.params.receiver.toLowerCase();
  let task = JSON.parse(req.query.task);
  // just for tests
  if (task.title == "none") {
    res.send({ message: 'none' });
    return;
  }
  // user query for mongodb search
  let user = {
    username: username
  };
  // receiver query for mongodb search
  receiver = {
    username: receiver
  };
  Inbox.createTask(user, receiver, task, (err, result) => {
    if (err) throw err;
    // null: if the receiver is not in user's contacts list
    // otherwise: success
    if (result == null) {
      res.send({ message: 'none' });
    } else {
      res.send({ message: 'done' });
    }
  });
});

module.exports = router;
