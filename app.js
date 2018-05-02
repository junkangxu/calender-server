// import framework
let express = require('express');
// import reuseable database config
let db = require('./db');
// import controllers
let authentication = require('./controllers/authentication');
let inbox = require('./controllers/inbox');
let contacts = require('./controllers/contacts');
let calendar = require('./controllers/calendar');
let profile = require('./controllers/profile');
// const for mlab
const url = "mongodb://junkangxu:Xjk951227@ds237389.mlab.com:37389/calender";
// initialize express app
let app = express();
// setup jade view engine
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
// setup controllers
app.use('/authentication', authentication);
app.use('/inbox', inbox);
app.use('/contacts', contacts);
app.use('/calendar', calendar);
app.use('/profile', profile);
// main function for listen and database
db.connect(url, (err) => {
  if (err) {
    console.log("Unable to connect to Mongo.");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log('Listening on port 3000...');
    });
  }
});

module.exports = app;
