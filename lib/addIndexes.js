#!/usr/bin/env node

'use strict'; // eslint-disable-line

const async = require('async');
const debug = require('debug')('app:indexer');
const db = require('./db');

function addIndexes(dbHandle, cb) {
  const collection = dbHandle.collection('recipes');

  let indexResult = collection.createIndex({ 'ingredients.item': 1 });
  debug(indexResult);

  indexResult = collection.createIndex({ recipe_name: 1 });
  debug(indexResult);

  cb(null, dbHandle);
}


async.waterfall([
  db.connect,
  addIndexes,
], (err, dbHandle) => {
  if (err) {
    debug(err);
    debug('Danger Will Robinson!\n');
  } else {
    debug('Great Success!\n');
  }
  if (dbHandle) {
    dbHandle.close();
  }
});
