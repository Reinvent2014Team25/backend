// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// connect to the database.
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hackathon'); // connect to our database

// Data model.
var Data = require('./app/models/data');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'AWS ReInvent 2014 Hackathon : Team 25' });
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/data')

    // create a data object (accessed at POST http://localhost:8080/api/data)
    .post(function(req, res) {

        var data = new Data();      // create a new instance of the Data model
        // set the data parameters (comes from the request)
        if(req.body.name) {data.name = req.body.name};
        if(req.body.event) {data.event = req.body.event};
        if(req.body.email) {data.email = req.body.email};
        if(req.body.optin) {data.optin = req.body.optin};
        if(req.body.amount) {data.amount = req.body.amount};
        // save the data and check for errors
        data.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Data created!' });
        });
    })

    // get all the data objects (accessed at GET http://localhost:8080/api/data)
    .get(function(req, res) {
        Data.find(function(err, data) {
            if (err)
                res.send(err);

            res.json(data);
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
