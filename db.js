let MongoClient = require('mongodb').MongoClient;

// global state for if the database is on or not
let state = {
  db: null
};

// connect the Mongoclient to cloud database
exports.connect = (url, done) => {
  if (state.db) return done();
  MongoClient.connect(url, (err, db) => {
    if (err) return done(err);
    state.db = db;
    done();
  });
};

// return a MongoClient object
exports.get = () => {
  return state.db;
}

// close the connection when the app is shut down
exports.close = (done) => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
}
