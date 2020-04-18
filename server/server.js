const express = require('express');

const url = require('./controller/url.controller');

const app = express();

const mongoose = require('mongoose');
const cookieParse = require('cookie-parser')

// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb://127.0.0.1/url_app';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
// Get the connection string
const db = mongoose.connection;

const session = require('express-session')
//...
// This will manage our sesssion data.
// We can use our secret from our JWT tokens
const MongoStore = require('connect-mongo')(session);
    
// app.use(session({secret: process.env.SUPER_SECRET,
//     store: new MongoStore({
//         mongooseConnection : db,
//     })}));
// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes

app.use('/api/url', url);

app.listen(3001, function() {
    console.log('Starting server');
});