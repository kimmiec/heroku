const mongoose = require('mongoose');

const buddySchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String},
    price: {type: Number},
    qty: { type: Number}
});

const Buddies = mongoose.model('Buddy', buddySchema);

module.exports = Buddies;