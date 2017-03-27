/* This is a test 2 */

var express = require('express')
,MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var app = express();

var util = require('./utils');

var mongoose = require('mongoose');

/**
 * Require databse configuration depending on environment
 */
var conf = {
  development: {
    servers: [['localhost', 27017]],
    database: 'test',
    user: 'manuelAdmin',
    password: 'changeMe',
    replicaSet: null,
  },
  production: {
    servers: [[process.env.DATABASE_IP, process.env.DATABASE_PORT]],
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    replicaSet: null,
  }
};
var options = {};

var connectionString = util.createConnectionString(conf['development']);


if (conf.replicaSet) {
  options.replset = conf.replicaSet;
}

app.get('/database', function (req, res) { 
  var url = 'mongodb://manuelAdmin:changeMe@localhost:27017/test';

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {     
      console.log('Connection established to', url);

      var collection = db.collection('restaurants');

      collection.find().toArray(function (err, result) {
        if (err) {
          console.log(err);
        } else if (result.length) {
          res.send(result);
        } else {
          console.log('No document(s) found with defined "find" criteria!');
        }
        db.close();
      });
    }
  });

});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/health', function (req, res) {
  res.send('All good');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
