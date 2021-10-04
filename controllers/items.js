// ======== DEPENDENCIES ========
const express = require('express');
const budRouter = express.Router();
const Buddies = require('../models/buddy.js');

// ======== ROUTES ========
// INDEX - works
budRouter.get('/', (req, res) => {
    res.send('Hello World!');
});

// NEW -hidden new/create page - works
budRouter.get('/hiddeN', (req, res) =>{
    res.render('new.ejs');
})

// DELETE - works
budRouter.delete('/:id', (req, res) =>{
    res.send('bye bye');
})

// UPDATE - works
budRouter.put('/:id', (req, res) =>{
    res.send('where am i going?')
})

// CREATE - works
budRouter.post('/', (req, res) =>{
    res.send('shhhhh')
})


// EDIT - works
budRouter.get('/:id/hidE', (req, res) =>{
    res.send('hidE')
})


// SHOW - works
budRouter.get('/:id', (req, res) =>{
    res.send('es info page')
})


// ======== EXPORT ========
module.exports = budRouter;