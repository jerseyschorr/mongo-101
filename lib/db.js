const debug = require('debug')('mongodb');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

module.exports = {
  connect: (callback) => {
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
        callback(err);
      } else {
        // HURRAY!! We are connected. :)
        debug('Connection established to %s', mongoURI);
        callback(null, db);
      }
    });
  },

  writeDocument: (db, data, callback) => {
    if (!db) {
      callback('Error: No database handle');
    } else {
      const collection = db.collection('recipes');
      const writeResult = collection.insert(data);
      debug(writeResult);
      callback(null, db);
    }
  },
};
