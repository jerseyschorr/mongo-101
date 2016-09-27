'use strict'; // eslint-disable-line strict
const async = require('async');
const debug = require('debug')('app');
const express = require('express');
const path = require('path');
const db = require('./lib/db');
const cookbook = require('./lib/cookbook');

// Constants
const PORT = 8080;

// App
const app = express();
app.set('view engine', 'pug');

/**
 * Simple route to test the connection and list all recipes
 * @example http://localhost:8080/index.html
 */
app.get('/index.html', (req, res) => {
  async.waterfall([
    db.connect,
    cookbook.readRecipes,
  ], (err, dbHandle, results) => {
    if (err) {
      res.render('index', {
        title: 'Error',
        message: 'Danger Will Robinson!',
        submessage: err,
        recipeList: [{
          recipe_name: 'Database Error',
          hide_button: true,
        }],
      });
    } else {
      res.render('index', {
        title: 'MONGO',
        message: 'Hello From MongoDB',
        submessage: 'Let\'s do Something!',
        recipeList: results,
      });
      dbHandle.close();
    }
  });
});


/**
 * Simple route to show one recipe
 * @example http://localhost:8080/recipe/<recipe_id>
 */
app.get('/recipe/:id', (req, res) => {
  async.waterfall([
    db.connect,
    cookbook.readRecipes,
  ], (err, dbHandle, results) => {
    if (err) {
      res.render('index', {
        title: 'Error',
        message: 'Danger Will Robinson!',
        submessage: err,
        recipeList: [{
          recipe_name: 'Database Error',
          hide_button: true,
        }],
      });
    } else {
      res.render('index', {
        title: 'MONGO',
        message: 'XXXXXX',
        submessage: 'Let\'s do Something!',
        recipeList: results,
      });
      dbHandle.close();
    }
  });
});


// static files go here.
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));
app.use('/images', express.static(path.join(__dirname, '/public/images')));
app.listen(PORT);
debug(`Running on http://localhost:${PORT}`);
