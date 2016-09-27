const debug = require('debug')('app:cookbook');

module.exports = {
  readRecipes: (dbHandle, callback) => {
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
};
