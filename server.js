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

// how to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;


// ====== DATABASE CONNECTION ======
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// ====== ERROR/SUCCESS ======
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected:', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// ====== PUBLIC FOLDER FOR STATIC ASSETS ======
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.json()); 
// ^ returns middleware that only parses JSON - may or may not need it depending on your project

// ====== method override ======
app.use(methodOverride('_method'));

// ====== ROUTES ======
// index
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// ====== LISTENER ======
app.listen(PORT, () =>{
    console.log(`listening on port: ${PORT}`);
});