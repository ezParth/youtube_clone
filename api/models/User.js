const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String, required: true, min: 4, max:55},
    email: {type: String, required: true, max:100},
    password: {type: String, required: true, max:100},
    isCreator: {type: String, enum:['YES', 'NO'], default: 'NO'}
})

const User = mongoose.model('User', userSchema);

module.exports = User;