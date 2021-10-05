const mongoose = require('mongoose');

const buddySchema = new mongoose.Schema({
    // name: {type: String, required: true},
    // description: {type: String, required: true},
    // img: {type: String},
    // price: {type: Number},
    // qty: { type: Number}
    buddies: [
        {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Buddy'}
    ]
});

const BuddyCart = mongoose.model('BuddyCart', buddySchema);

module.exports = BuddyCart;