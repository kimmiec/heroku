// ====== DEPENDENCIES ====== 
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;

// ====== MIDDLEWARE ======
app.use(express.urlencoded({extended: true})); 
// extended: false - doesnt allow nested objects in query strings
// ====== method override ======
app.use(methodOverride('_method'));
// ====== PUBLIC FOLDER FOR STATIC ASSETS ======
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.json()); 
// ^ returns middleware that only parses JSON - may or may not need it depending on your project

// ====== DATABASE CONNECTION ======
// how to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// ====== ERROR/SUCCESS ======
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected:', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// ====== ROUTES/CONTROLLERS ======
const buddyRouter = require('./controllers/items.js');
app.use('/valo', buddyRouter);

// ====== LISTENER ======
app.listen(PORT, () =>{
    console.log(`listening on port: ${PORT}`);
});