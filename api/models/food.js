// Food schema  contains data for Food
const mongoose = require('mongoose');

const foodSchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    Name:  { type: String, required: true },
    Description: { type: String, required: true },
    Cuisine:{ type: String, required: true }, 
    foodImage: { type: String, required: true},
    Price: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref:'Restaurant', required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'Users', required: true }
});

module.exports = mongoose.model('Food' , foodSchema);