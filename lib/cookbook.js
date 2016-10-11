const debug = require('debug')('app:cookbook');
const mongodb = require('mongodb');

module.exports = {

  /**
   * listAll()
   *
   * Returns all recipe documents in the recipes collection.
   *
   * SQL Equivalent
   * SELECT * FROM recipes;
   *
   * @param {Object} dbHandle - Open db handle to mongoDB
   * @param {function} callback - async callback function
   */
  listAll: (dbHandle, callback) => {
    const collection = dbHandle.collection('recipes');

    const searchParams = {};

    collection.find(searchParams)
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

  /**
   * read()
   *
   * Returns 1st match of recipe by Id.
   *
   * SQL Equivalent
   * SELECT * FROM recipes WHERE _id = rId LIMIT 1;
   *
   * @param {Object} dbHandle - Open db handle to mongoDB
   * @param {string} rId - Recipe Id
   * @param {function} callback - async callback function
   */
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

  /**
   * listIngredients()
   *
   * Returns unique list of ingredients.
   *
   * SQL Equivalent
   * SELECT DISTINCT item FROM ingredients SORT ASC;
   *
   * @param {Object} dbHandle - Open db handle to mongoDB
   * @param {function} callback - async callback function
   */
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
