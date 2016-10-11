#!/usr/bin/env node

'use strict'; // eslint-disable-line

const async = require('async');
const fs = require('fs');
const debug = require('debug')('app:load');
const argv = require('yargs').argv;
const db = require('./db');


/**
 * getRecipeFromFile()
 *
 * Reads a file and converts data to JSON object
 *
 * @param {Object} dbHandle - Open db handle to mongoDB
 * @param {function} callback - async callback function
 */
function getRecipeFromFile(dbHandle, callback) {
  debug('getRecipeFromFile', (argv._ && argv._[0]));
  if (argv._ && argv._[0]) {
    const fileName = argv._[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        callback(`readFile Error: ${err.message}`, dbHandle);
      } else {
        callback(null, dbHandle, JSON.parse(data));
      }
    });
  }
}

async.waterfall([
  db.connect,
  getRecipeFromFile,
  db.writeDocument,
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
