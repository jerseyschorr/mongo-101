const debug = require('debug')('mongodb');
const MongoClient = require('mongodb').MongoClient;


module.exports = {
  /**
   * connect()
   *
   * Create a connection to the Mongo DB
   *
   * @param {Object} dbHandle - Open db handle to mongoDB
   * @param {function} callback - async callback function
   */
  connect: (callback) => {
    // Connection URL. This is where your mongodb server is running.

    const mongoURI = 'mongodb://localhost:12345/demo';

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


  /**
   * writeDocument()
   *
   * Writes a JSON object to the database
   *
   * @param {Object} dbHandle - Open db handle to mongoDB
   * @param {Object} data - JSON object to write to db
   * @param {function} callback - async callback function
   */
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
