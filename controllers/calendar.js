let express = require('express');
let router = express.Router();
let db = require('../db');
let Calendar = require('../models/calendar');

router.get('/:username', (req, res) => {
  let username = req.params.username;
  let data = {
    username: username
  }
  Calendar.getAllCalendars(data, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/:username', (req, res) => {
  let username = req.params.username.toLowerCase();
  let task = JSON.parse(req.query.task);
  // just for tests
  if (task.title == "none") {
    res.end({ message: 'none' });
    return;
  }
  // user query for mongodb search
  let user = {
    username: username
  };
  Calendar.addToCalendars(user, task, (err, result) => {
    if (err) throw err;
    res.send({ message: 'done' });
  });
});

module.exports = router;
