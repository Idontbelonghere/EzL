var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var p = fs.readFileSync(__dirname + '/../public/config/mongo_inuse.json', 'utf-8');
var db_inuse = JSON.parse(p).mongodb;
// fs.watch(__dirname + '/../public/config/mongo_inuse.json', (eventType, filename)=>{
//     if(eventType=='change'){
//         p = fs.readFileSync(__dirname + '/../public/config/mongo_inuse.json', 'utf-8');
//         db_inuse = JSON.parse(p).mongo_Address;
//     }
// })
var db;

MongoClient.connect(db_inuse, function(err, database) {
  if (err) {
    console.log('Cannot Connect to Server.');
  } else {
    console.log("Connected correctly to server.");
    db = database;
  }
});


router.get('/', function(req, res, next) {
  res.render('index')
})
router.get('/login', function(req, res, next) {
  res.render('login');
})
router.get('/signup4teacher', function(req, res, next) {
  res.render('signup4teacher');
})

router.get('/home', function(req, res, next) {
  res.render('home');
})
router.get('/home4student', function(req, res, next) {
  db.collection('user.teacher').find().toArray().then(function(data) {
    res.render('home4student', {
      "data": data
    },function(err,html){
      res.send(html);
    })
  })
})
router.get('/home4teacher', function(req, res, next) {
  // db.collection('questions').find().toArray().then(function(data) {
  //   res.render('home4student', {
  //     "data": data
  //   },function(err,html){
  //     res.send(html);
  //   })
  // })
  res.render('home4teacher', (err,html)=>{
    res.send(html);
  })
})

router.get('/settings', function(req, res, next) {
  res.render('settings');
})


module.exports = router
