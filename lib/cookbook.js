const debug = require('debug')('app:cookbook');
const mongodb = require('mongodb');

module.exports = {
  listAll: (dbHandle, callback) => {
    const collection = dbHandle.collection('recipes');

    const searchParams = {};

    collection.find(searchParams).limit(25)
      .toArray((err, res) => {
        if (err) {
          debug('error');
          callback(err, dbHandle);
          return;
        }

        if (res && res.length > 0) {
          debug(`found ${res.length} records`);
          callback(null, dbHandle, res);
          return;
        }

        debug('found 0 records');
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
          debug('error');
          callback(err, dbHandle);
          return;
        }

        if (res && res.length > 0) {
          debug(`found ${res.length} records`);
          callback(null, dbHandle, res);
          return;
        }

        debug('found 0 records');
        callback('No Recipe Found to Process', dbHandle);
        return;
      }
    );
  },

  listIngredients: (dbHandle, callback) => {
    const collection = dbHandle.collection('recipes');

    collection.aggregate([
      {
        $unwind: '$ingredients',
      },
      {
        $group: {
          _id: '$ingredients.item',
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]).toArray((err, res) => {
      if (err) {
        debug('error');
        callback(err, dbHandle);
        return;
      }

      if (res && res.length > 0) {
        debug(`found ${res.length} records`);
        callback(null, dbHandle, res);
        return;
      }

      debug('found 0 records');
      callback('No Records to Process', dbHandle);
      return;
    });
  },
};
