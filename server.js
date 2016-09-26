'use strict'; // eslint-disable-line strict
const async = require('async');
const debug = require('debug')('app');
const express = require('express');
const path = require('path');
const db = require('./lib/db');

// Constants
const PORT = 8080;

// App
const app = express();
app.set('view engine', 'pug');

/**
 * Simple route to test the connection
 * @example http://localhost:8080/index.html
 */
app.get('/index.html', (req, res) => {
  db.connect((err, dbHandle) => {
    if (err) {
      res.render('index', {
        title: 'Error',
        message: 'Danger Will Robinson!',
      });
    } else {
      res.render('index', {
        title: 'MONGO',
        message: 'Hello world from Mongo',
      });
      dbHandle.close();
    }
  });
});


/**
 * Show the phonebook
 */
app.get('/phonebook/add', (req, res) => {
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

// static files go here.
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));
app.use('/images', express.static(path.join(__dirname, '/public/images')));
app.listen(PORT);
debug(`Running on http://localhost:${PORT}`);
