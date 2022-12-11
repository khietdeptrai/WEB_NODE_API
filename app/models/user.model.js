const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    address: String,
    contact: String,
    date: {
      type: Date,
      default: Date.now
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
});

const User = mongoose.model('User', userSchema)
module.exports = User;