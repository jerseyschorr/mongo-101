const debug = require('debug')('mongodb')
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

module.exports = {
  connect: (cb) => {
    // Connection URL. This is where your mongodb server is running.

    const mongoURI = 'mongodb://localhost:12345/demo';

    /**
     *  TODO: Put replication URI.
     */

    // Use connect method to connect to the Server
    MongoClient.connect(mongoURI, (err, db) => {
      if (err) {
        // Something went horribly wrong.
        debug('Unable to connect to the mongoDB server. Error: %s', err.message);
        cb(err);
      } else {
        // HURRAY!! We are connected. :)
        debug('Connection established to %s', mongoURI);
        cb(null, db);
      }
    });
  },
};
