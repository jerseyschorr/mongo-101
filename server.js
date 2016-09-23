'use strict'; // eslint-disable-line strict
const async = require('async');
const debug = require('debug')('app');
const express = require('express');
const db = require('./lib/db');

// Constants
const PORT = 8080;

// App
const app = express();

/**
 * Simple route to test the connection
 * @example http://localhost:8080/
 */
app.get('/', (req, res) => {
  db.connect((err, dbHandle) => {
    if (err) {
      res.send('Danger Will Robinson!\n');
    } else {
      res.send('Hello world from Mongo\n');
      dbHandle.close();
    }
  });
});


app.get('/phonebook', (req, res) => {
  async.waterfall([
    db.connect,
  ], (err, dbHandle) => {
    if (err) {
      res.send('Danger Will Robinson!\n');
    } else {
      res.send('Hello world from Mongo\n');
      dbHandle.close();
    }
  });
});

app.listen(PORT);
debug(`Running on http://localhost:${PORT}`);
