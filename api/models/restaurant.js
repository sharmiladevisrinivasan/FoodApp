// Restaurant Schema contains data required for restaurants

const mongoose = require('mongoose');
const restaurantSchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    Name_of_the_Restaurant:  { type: String, required: true },
    Cuisine: { type: String, required: true },
    restaurantImage: { type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'Users', required: true }
});

module.exports = mongoose.model('Restaurant' , restaurantSchema);  