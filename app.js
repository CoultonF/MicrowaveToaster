var express = require('express'),

bodyParser = require('body-parser'),

fs = require('fs'),

http = require('http'),

mongodb = require('mongodb'),

mongoose = require('mongoose'),

morgan = require('morgan'),

user = require('./models/userfunctions.js'),

app = express(),

port = 3000,

//

url = 'mongodb://localhost:27017/Final_Exam',

MongoClient = mongodb.MongoClient,

someRouteName = express.Router();

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(morgan('dev')); // log every request to the console

mongoose.connect(url, function(error, db) {
    if(error){
        console.log(error);
    }
    else {
        console.log("Connection made at: " +url);
    }
});

someRouteName.route('/').post(function(req, res){

    res.send('Sent Here.');

});

app.use('/someRouteName', someRouteName);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
    res.send(__dirname + '/index.html');
});

app.post('/post-form', function(req, res) {

    var conn = mongoose.connection;

    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    conn.collection('Users').insert(user);

    console.log('User:');
    console.log(user);

    //user.addProfile(req.body.firstName, req.body.lastName);

    console.log(req.body.firstName);
    res.send(req.body.lastName);
});

app.get('/api/getAll', function(req, res) {

    MongoClient.connect("mongodb://localhost:27017/Final_Exam", function(err, db) {
      if(err) { return console.dir(err); }

      var collection = db.collection('Users');

        collection.find().toArray(function(err, data) {
            console.log(data);
        });
    });

res.send();

});

app.listen(port, function(err){

    if(err)

    console.log('Error: ' + err);

    else

    console.log('Server started at localhost: ' + port);





});




// app.listen(300, function(err){
//
//     if(err)
//
//     console.log('Error: ' + err);
//
//     else
//
//     console.log('Server started at localhost: ' + port);
//
// });


app.use(function(req, res) {

    res.status(404).send('404: Page not Found');

});

//HANDLE ALL OTHER ERRORS AS A SERVER ERROR


app.use(function(error, req, res, next) {

    res.status(500).send('500: Internal Server Error');

});
