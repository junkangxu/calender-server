let express = require('express');
let router = express.Router();
let db = require('../db');
let Profile = require('../models/profile');

router.get('/:username', (req, res) => {
  // get parameters from params
  let username = req.params.username;
  // create mongodb query
  let data = {
    username: username
  };
  // use model to talk with database
  Profile.getProfile(data, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
