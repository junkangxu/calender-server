let express = require('express');
let router = express.Router();
let db = require('../db');
let Authentication = require('../models/authentication');

router.get('/register', (req, res) => {
  // extract parameters from query
  let username = req.query.username;
  let password = req.query.password;
  let name = req.query.name;
  // log info to console for debug
  console.log('GET /authentication/register ' + username + ' ' + password);
  // create the new document for insert
  let data = {
    name: name,
    username: username,
    password: password,
    contacts: [],
    calendar: [],
    inbox: []
  };
  // use model to talk with database
  Authentication.register(data, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/login', (req, res) => {
  // extract parameters from query
  let username = req.query.username;
  let password = req.query.password;
  // log info to console for debug
  console.log('GET /authentication/login ' + username + ' ' + password);
  // create mongodb query
  let data = {
    "username": username,
    "password": password
  };
  // use model to talk with database
  Authentication.login(data, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
