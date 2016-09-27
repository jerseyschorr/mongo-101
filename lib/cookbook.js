const debug = require('debug')('app:cookbook');
const mongodb = require('mongodb');

module.exports = {
  listAll: (dbHandle, callback) => {
    const collection = dbHandle.collection('recipes');

    const searchParams = {};

    collection.find(searchParams).limit(25)
      .toArray((err, res) => {
        if (err) {
          callback(err, dbHandle);
          return;
        }

        debug(res);
        if (res && res.length > 0) {
          callback(null, dbHandle, res);
          return;
        }

        callback('No Records to Process', dbHandle);
        return;
      }
    );
  },

  read: (dbHandle, rId, callback) => {
    const recipeId = new mongodb.ObjectID(rId);
    const collection = dbHandle.collection('recipes');

    const searchParams = {
      _id: recipeId,
    };

    collection.find(searchParams).limit(1)
      .toArray((err, res) => {
        if (err) {
          callback(err, dbHandle);
          return;
        }

        debug(res);
        if (res && res.length > 0) {
          callback(null, dbHandle, res);
          return;
        }

        callback('No Recipe Found to Process', dbHandle);
        return;
      }
    );
  },
};
