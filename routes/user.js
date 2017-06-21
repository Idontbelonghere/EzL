'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/main');
});

router.get('/activities', function(req,res,next){
  res.render('user/activities', function(err,html){
    res.send(html);
  })
})
router.get('/classes', function(req,res,next){
  res.render('user/classes', function(err,html){
    res.send(html);
  })
})
router.get('/questions', function(req,res,next){
  res.render('user/questions', function(err,html){
    res.send(html);
  })
})

module.exports = router;
