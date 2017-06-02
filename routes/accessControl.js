var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var p = fs.readFileSync(__dirname + '/../public/config/mongo_inuse.json', 'utf-8');
var db_AC = JSON.parse(p).mongodb;
var db;

MongoClient.connect(db_AC, function(err, database) {
  if (err) {
    console.log('Cannot Connect to Server.');
  } else {
    console.log("Connected correctly to server.");
    db = database;
  }
});

router.get('/login', function(req, res, next) {
  var qsurl = url.parse(req.url).query;
  var em = qs.parse(qsurl)['em'];
  var pw = qs.parse(qsurl)['pw'];
  // pw = encodePW(em,pw);

  db.collection('user.student').findOne({
    'account': em
  }).then((d) => {
    var result;
    if (d && d.password == pw) {
      result = {
        "status": 'ok',
        "data": d
      };
    } else {
      result = {
        "status": 'err'
      };
    }
    res.send(result);

  })

});

module.exports = router;
