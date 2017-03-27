var http = require("http")
,MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

http.createServer(function (request, response) {
  var url = 'mongodb://manuelAdmin:changeMe@localhost:27017/test';
  response.writeHead(200, {'Content-Type': 'text/plain'});
  var result = '';
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // Get the documents collection
      var collection = db.collection('restaurants');

      // Insert some users
      collection.find().toArray(function (err, result) {
        if (err) {
          console.log(err);
        } else if (result.length) {
          response.end(JSON.stringify(result));
          console.log('Found:', result);
        } else {
          console.log('No document(s) found with defined "find" criteria!');
        }
        //Close connection
        db.close();
      });
    }
  });

   
  

}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

