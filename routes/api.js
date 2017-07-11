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

router.post('/saveQuestion', (req, res, next) => {
  var data = req.body;
  var time = data.time;
  var content = data.content;
  var student = data.student;
  var teacher = data.teacher;

  let obj = {
    student:student,
    teacher:teacher,
    content:content,
    time:time
  }
  db.collection("questions").insert(obj, (err,d)=>{
    assert.equal(null,err);
    res.send(d);
  })
})

//
// router.post('/updateProfile', (req, res, next) => {
//   let data = req.body;
//   let role = data.role;
//   let name = data.name;
//   let intro = data.intro;
//   let sna = data.sna;
//   let connect = data.connect;
//   let addr = data.addr;
//   let school = data.school;
//   let grade = data.grade;
//
//   db.collection('user.'+role)
// })
router.get('/popOneUrl', (req,res,next)=>{
  db.collection("urls").find().toArray( (arr)=>{
    var v = arr.pop();
    res.send(v);
    db.collection("ruls").removeOne(v).then( (r)=>{
      console.log(r);
    })
  })
})

router.get('/pushOneUrl', (req,res,next)=>{
  var qsurl = url.parse(req.url).query;
  var url = qs.parse(qsurl)['v'];

  db.collection("urls").insertOne({value:url},(err,r)=>{
    console.log(res);
  })
})

module.exports = router;
