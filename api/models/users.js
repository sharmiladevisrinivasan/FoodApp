// Users Schema contains data required for users

const mongoose = require('mongoose');
const usersSchema = mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    Email: { 
      type: String, 
      required: true, 
      unique: true, 
      match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    Password: { type: String, required: true },
    UserName: { type: String, required: true },
    BillingAddress: { type: String, required: true },
    UserType: { type: String, required: true },
    Token: { type: String }
});

module.exports = mongoose.model('Users', usersSchema);