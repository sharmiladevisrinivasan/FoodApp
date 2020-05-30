// Order Schema contains data required for Orders

const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const orderSchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    orderDetails: {type: mongoose.Schema.Types.Mixed, required:true},
    restaurantId: {type: mongoose.Schema.Types.ObjectId, ref:'Restaurant', required: true },
    
});
module.exports = mongoose.model('Order', orderSchema);

