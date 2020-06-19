var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var client = require('./routes/client')

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/mean-testbootstrap', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(require('cors')());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/clients', express.static(path.join(__dirname, 'dist')));
app.use('/client', client);

app.options('*', cors())

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
 console.log(err);

  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else
    res.status(500).json({message: "Something looks wrong :( !!!"});
  });


// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('listening on port 3000.');
});
