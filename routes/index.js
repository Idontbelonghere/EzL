var express = require('express');
var router = express.Router();
var url = require('url');
var qs = require('querystring');
// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var fs = require('fs');
// var p = fs.readFileSync(__dirname + '/../public/config/mongo_inuse.json', 'utf-8');
// var db_inuse = JSON.parse(p).mongo_Address;
// fs.watch(__dirname + '/../public/config/mongo_inuse.json', (eventType, filename)=>{
//     if(eventType=='change'){
//         p = fs.readFileSync(__dirname + '/../public/config/mongo_inuse.json', 'utf-8');
//         db_inuse = JSON.parse(p).mongo_Address;
//     }
// })

// MongoClient.connect(db_inuse, function(err, db) {
//     if (err) {
//         console.log('Cannot Connect to Server.');
//     } else {
//         console.log("Connected correctly to server.");
//         db.close();
//     }
// });



router.get('/', function(req, res, next) {
    res.render('index')
})
router.get('/login', function(req, res, next) {
    res.render('login');
})

router.get('/profile', function(req, res, next) {
    res.render('profile');
})


module.exports = router