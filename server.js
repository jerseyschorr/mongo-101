'use strict'; // eslint-disable-line

const async = require('async');
const debug = require('debug')('app:server');
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
  debug('GET /index');
  async.waterfall([
    db.connect,
    cookbook.listAll,
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
  debug('GET /recipe', req.params);
  async.waterfall([
    db.connect,
    (dbHandle, cb) => {
      const rId = (req.params && req.params.id);
      cookbook.read(dbHandle, rId, cb);
    },
  ], (err, dbHandle, results) => {
    if (err) {
      res.render('recipe', {
        title: 'Error',
        message: 'Danger Will Robinson!',
        submessage: err,
      });
    } else {
      const recipe = results[0];
      res.render('recipe', {
        title: `MONGO > ${recipe.recipe_name}`,
        message: recipe.recipe_name,
        submessage: recipe.description,
        recipeList: recipe,
      });
      dbHandle.close();
    }
  });
});


/**
 * Simple route list all ingredients
 * @example http://localhost:8080/search.html
 */
app.get('/search.html', (req, res) => {
  debug('GET /search');
  async.waterfall([
    db.connect,
    cookbook.listIngredients,
  ], (err, dbHandle, results) => {
    if (err) {
      res.render('search', {
        title: 'Error',
        message: 'Danger Will Robinson!',
        submessage: err,
        itemList: [],
      });
    } else {
      res.render('search', {
        title: 'MONGO > Search',
        message: 'Recipes by Ingredients',
        submessage: '',
        itemList: results,
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
