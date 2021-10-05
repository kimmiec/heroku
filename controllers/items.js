// ======== DEPENDENCIES ========
const express = require('express');
const budRouter = express.Router();
const Buddies = require('../models/buddy.js');
const BuddyCart = require('../models/cart.js')
// ======== ROUTES ========
// INDEX - works
budRouter.get('/', (req, res) => {
    // res.send('Hello World!');
    Buddies.find({}, (error, allBuds) =>{
        res.render('index.ejs', {buddies: allBuds});
    });
});

// NEW -hidden new/create page - works
budRouter.get('/hiddeN', (req, res) =>{
    res.render('new.ejs');
})

// DELETE - works
budRouter.delete('/cart', (req, res) =>{
    res.send('bye bye');
    // BuddyCart.findByIdAndRemove('615b92c511a9f97103706d04') 
    //     .remove('buddies')
    //     .then((cart) =>{
    //     res.redirect('/valo/cart')
    // })
    // BuddyCart.findByIdAndRemove('615b92c511a9f97103706d04')
    //     .remove(req.body.id)
    //     .then((cart)=>{
    //         res.redirect('/valo/cart')
    //     })
})


// UPDATE - works
// budRouter.put('/:id', (req, res) =>{
//     res.send('where am i going?')
// })
budRouter.post('/cart', (req, res) =>{
    // Buddies.findById(req.body.id, (err, buddy) =>{
    //     console.log(buddy);
    // })
    // BuddyCart.create(req.body)
    // BuddyCart.findById('615b92c511a9f97103706d04', (err, cart) =>{
    //     console.log(cart.buddies)
        
    //     if(!cart.buddies.includes(req.body.id)) {
    //     cart.buddies.push(req.body.id)
    //     cart.save();}
    //     console.log(cart.buddies);
    // })
    // res.redirect('/valo/cart');

    BuddyCart.findById('615b92c511a9f97103706d04')
    // '615b61dd5624d79f4e27ce97' -new ID?
    // need this ID since I dont have a user interface
    .then((cart)=>{
        if(!cart.buddies.includes(req.body.id)) {
            // if its not in the cart already, add it in
            cart.buddies.push(req.body.id)
            cart.save();}
            // now save that data bc it doesnt happen automatically
    })
    .then(() =>{
        res.redirect('/valo/cart')
        // have it display after its done loading
        // need it to redirect first and then go back to the req.body.id 
    })
});

// CREATE - works
budRouter.post('/', (req, res) =>{
    // res.send('shhhhh')
    // console.log('bloop')
    Buddies.create(req.body, (error, createdBuddies) =>{
        res.redirect('/valo');
    })
})


// EDIT - works
budRouter.get('/:id/hidE', (req, res) =>{
    res.send('hidE')
})


// SHOW - works
budRouter.get('/cart', (req, res) => {
    // res.send('Hello World!');
    // BuddyCart.findById('615b92c511a9f97103706d04', (error, allBuds) =>{
    //     .populate(buddies)
    //     console.log(allBuds)
    //     res.render('cart.ejs', {cartBuds: allBuds});
    // });
    BuddyCart.findById('615b92c511a9f97103706d04') 
    .populate('buddies')
    .then((cart) =>{
        console.log(cart)
        // console.log(cart.buddies)
        res.render('cart.ejs', {cartBuds: cart.buddies})
        // .buddies - array created in the cart.js schema
        // console.log(cart.buddies)
    })

});

budRouter.get('/:id', (req, res) =>{
    // res.send('es info page')
    Buddies.findById(req.params.id, (err, foundBud) =>{
        // console.log(err)
        res.render('show.ejs', {buds: foundBud});
    });
});



// ======== EXPORT ========
module.exports = budRouter;