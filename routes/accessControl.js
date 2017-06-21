'use strict';

var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
var assert = require('assert');
var mongo = require('../database/database');
var db;
mongo.connect(function(d){
  db = d;
})

router.get('/login', function(req, res, next) {
  var qsurl = url.parse(req.url).query;
  var em = qs.parse(qsurl)['em'];
  var pw = qs.parse(qsurl)['pw'];
  var r = qs.parse(qsurl)['isT'];
  // pw = encodePW(em,pw);
  if (r == 'true') {
    db.collection('user.teacher').findOne({
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
  } else {
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
  }


});

router.get('/signup', function(req, res, next) {
  var qsurl = url.parse(req.url).query;
  var username = qs.parse(qsurl)['username'];
  var em = qs.parse(qsurl)['em'];
  var pw = qs.parse(qsurl)['pw'];
  // pw = encodePW(em,pw);

  var std_obj = {
    'account': em,
    'password': pw,
    'role':'student',
    'profile': {
      'name': username
    }
  }
  db.collection('user.student').insertOne(std_obj, function(err, r) {
    assert.equal(null, err);
    res.send(r.result);
  })
});

router.get('/signup4teacher', function(req, res, next) {
  var qsurl = url.parse(req.url).query;
  var username = qs.parse(qsurl)['username'];
  var em = qs.parse(qsurl)['em'];
  var pw = qs.parse(qsurl)['pw'];
  var ic = qs.parse(qsurl)['ic'];
  // pw = encodePW(em,pw);
  db.collection('invitation_code').count({
    value: ic
  }, (function(err,count) {
    console.log(count)
    if (count > 0) {
      console.log('invitation_code exsists.');
      var teacher_obj = {
        'account': em,
        'password': pw,
        'role':'teacher',
        'profile': {
          'name': username
        }
      }
      db.collection('user.teacher').insertOne(teacher_obj, function(err, r) {
        assert.equal(null, err);
        res.send(r.result);
      })
    } else {
      console.log('invitation_code not exsists.');
      res.send({
        "ok": 0,
        "reason": "invitation_code not exsists."
      })
    }
  }))
});







module.exports = router;
