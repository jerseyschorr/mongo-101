#!/usr/bin/env node
'use strict'; // eslint-disable-line strict
const async = require('async');
const fs = require('fs');
const debug = require('debug')('app:loader');
const argv = require('yargs').argv;
const db = require('./lib/db');

function getRecipeFromFile(dbHandle, cb) {
  debug('getRecipeFromFile', (argv._ && argv._[0]));
  if (argv._ && argv._[0]) {
    const fileName = argv._[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        cb(`readFile Error: ${err.message}`, dbHandle);
      } else {
        cb(null, dbHandle, JSON.parse(data));
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
