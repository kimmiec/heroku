// ======== DEPENDENCIES ========
const express = require('express');
const buddyRouter = express.Router();
const Buddies = require('../models/buddy.js');
const BuddyCart = require('../models/cart.js')
// ======== ROUTES ========
///////////////////////////////////
// ======== INDEX - works ========
///////////////////////////////////
buddyRouter.get('/', (req, res) => {
    // res.send('Hello World!');
    Buddies.find({}, (error, allBuds) =>{
        res.render('index.ejs', {buddies: allBuds});
    });
});
////////////////////////////////////////////////////////
// ======== NEW -hidden new/create page - works ========
////////////////////////////////////////////////////////
buddyRouter.get('/hiddeN', (req, res) =>{
    res.render('hiddenew.ejs');
})

///////////////////////////////////
// ======== DELETE - works ========
///////////////////////////////////
buddyRouter.delete('/:id/cart', (req, res) =>{
    // res.send('bye bye');
    BuddyCart.findById('615dcf0758e69d2dd3bb9aa4')
    .then((cart) =>{
        // console.log('cart', cart.buddies[0]._id.toString() === req.params.id)
        cart.buddies = cart.buddies.filter(buddy => (buddy._id.toString() !== req.params.id))
        // ^cart.buddies.filter (FILTER) only pulls it but it wont change how the original code is written, so we need to set a new array for changes to display since its being put into a new array
        cart.save()
        console.log('cart', cart)
    })
    // res.json(req.params.id)
    // .then is used to help delay the loading so it can finish processing the info/ run code a and then b and when its done, run code c. JS - runs the longer one, finish running the shorter code and then go back to the longer code
    .then(()=>{
        res.redirect('/cart')
        // ran the redirect (shorter code) before it finished running the codes before (longer code)
    })
})
// ======== BUDDYCART Delete All ========
buddyRouter.delete('/cart', (req, res) =>{
    // res.send('bye bye');
    BuddyCart.findById('615dcf0758e69d2dd3bb9aa4')
    .then((cart) =>{
        cart.buddies = []
        cart.save()
        console.log('cart', cart)
        res.redirect('/')
    })
})

///////////////////////////////////
// ======== UPDATE - works ========
///////////////////////////////////
buddyRouter.put('/:id', (req, res) =>{
    // /:id?? or just '/'?
    // res.send('where am i going?')
    // Buddies.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true
    // }, (error, updateCharms) =>{
    //     console.log(req.body)
    //     res.redirect('/')
    // })
    Buddies.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    .then((buddy)=>{
        res.redirect('/')
    })
})
// ======== BUDDYCART Update ========
buddyRouter.post('/cart', (req, res) =>{
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
        // have it display after its done loading
        // need it to redirect first and then go back to the req.body.id 
        setTimeout(() => {res.redirect('/cart')}, 100);
        // hard code that delay for the item to appear after its done loading the info
    })
});

///////////////////////////////////
// ======== CREATE - works ========
///////////////////////////////////
buddyRouter.post('/', (req, res) =>{
    // res.send('shhhhh')
    // console.log('bloop')
    Buddies.create(req.body, (error, createdBuddies) =>{
        res.redirect('/');
    })
})

/////////////////////////////////////////////
// ======== EDIT - works/hidden page ========
/////////////////////////////////////////////
buddyRouter.get('/:id/hidE', (req, res) =>{
    // res.send('hidE')
    Buddies.findById(req.params.id, (error, foundBuddies) =>{
        res.render('hidEdit.ejs', {buds: foundBuddies})
    })
})

///////////////////////////////////
// ======== BUDDYCART Show ========
///////////////////////////////////
buddyRouter.get('/cart', (req, res) => {
    // res.send('Hello World!');
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
// ======== SHOW - works ========
buddyRouter.get('/:id', (req, res) =>{
    // res.send('es info page')
    Buddies.findById(req.params.id, (err, foundBud) =>{
        // console.log(err)
        res.render('show.ejs', {buds: foundBud});
    });
});



// ======== EXPORT ========
module.exports = buddyRouter;