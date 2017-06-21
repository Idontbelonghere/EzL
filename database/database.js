var MongoClient = require('mongodb').MongoClient;
var mongo = "mongodb://localhost:27017/ezlearning"

exports.connect = (callback)=>{
  MongoClient.connect(mongo, function(err, db) {
    if (err) {
      console.log('Cannot Connect to Server.');
    } else {
      console.log("Connected correctly to server.");
      return callback(db);
    }
  });
}
