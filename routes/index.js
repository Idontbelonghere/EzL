'use strict';

var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
var assert = require('assert');
var mongo = require('../database/database');
var db;
mongo.connect(function(d) {
  db = d;
})

router.get('/', (req, res, next) => {
  res.render('index')
})
router.get('/login', (req, res, next) => {
  res.render('login');
})
router.get('/signup4teacher', (req, res, next) => {
  res.render('signup4teacher');
})

router.get('/home', (req, res, next) => {
  res.render('home');
})
router.get('/home4student', (req, res, next) => {
  db.collection('user.teacher').find().toArray().then(function(data) {
    res.render('home4student', {
      "data": data
    }, function(err, html) {
      res.send(html);
    })
  })
})
router.get('/home4teacher', (req, res, next) => {
  db.collection('questions').find().toArray().then(function(data) {
    res.render('home4teacher', {
      "data": data
    }, function(err, html) {
      res.send(html);
    })
  });
})

router.get('/settings', (req, res, next) => {
  res.render('settings');
})

router.get('/meeting', (req, res, next) => {
  res.render('meeting')
})


module.exports = router
