// ======== DEPENDENCIES ========
const express = require('express');
const cartRouter = express.Router();
const BuddyCart = require('../models/cart.js')


// ======== BUDDYCART Delete ========
cartRouter.delete('/cart', (req, res) =>{
    // res.send('bye bye');
    // BuddyCart.findByIdAndRemove('615b897a872f7e0d3eb44c4b') 
    //     .remove('buddies')
    //     .then((cart) =>{
    //     res.redirect('/valo/cart')
    // })
    BuddyCart.findByIdAndRemove('615b897a872f7e0d3eb44c4b')
        .remove(req.body.id)
        .then((cart)=>{
            res.redirect('/valo/cart')
        })
})

// cartRouter.delete('/cart', async (req, res, next) =>{
//     try {
//         const charms = await BuddyCart.findByIdAndRemove('615b897a872f7e0d3eb44c4b')
//         res.redirect('/valo/cart');
//     } catch (err) {
//         next (err)
//     }
// })
// ======== UPDATE ========
cartRouter.post('/cart', (req, res) =>{
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

    BuddyCart.findById('615dcf0758e69d2dd3bb9aa4')
    // '615b61dd5624d79f4e27ce97' -new ID?
    // need this ID since I dont have a user interface
    .then((cart)=>{
        console.log('cart', cart)
        if(!cart.buddies.includes(req.body.id)) {
            // if its not in the cart already, add it in
            cart.buddies.push(req.body.id)
            cart.save();}
            // now save that data bc it doesnt happen automatically
    })
    .then(() =>{
        setTimeout(() => {res.redirect('/valo/cart')}, 100);
        // have it display after its done loading
        // need it to redirect first and then go back to the req.body.id 
    })
});


// ======== SHOW ========
cartRouter.get('/cart', (req, res) => {
    // res.send('Hello World!');
    // BuddyCart.findById('615b92c511a9f97103706d04', (error, allBuds) =>{
    //     .populate(buddies)
    //     console.log(allBuds)
    //     res.render('cart.ejs', {cartBuds: allBuds});
    // });
    BuddyCart.findById('615dcf0758e69d2dd3bb9aa4') 
    .populate('buddies')
    .then((cart) =>{
        console.log('cart', cart)
        // console.log(cart.buddies)
        res.render('cart.ejs', {cartBuds: cart.buddies})
        // .buddies - array created in the cart.js schema
        // console.log(cart.buddies)

        // quantity - display quantity they want?
        // const { buddies } = req.body;
        // const quantity = Number.parseInt(req.body.qty)
        // const budId = cart.buddies.findById(prod => prod.buddies.id === buddies)
        // if (budId !== -1 && quantity <= 0) {
        //     cart.buddies.splice(budId, 1);
        // } else if (budId !== -1) {
        //     cart.buddies[budId].qty = cart.buddies[budId].qty + quantity;
        // } else if (quantity > 0) {
        //     cart.buddies.push({ buddies: buddies, qty: qty})
        // }

    })

});