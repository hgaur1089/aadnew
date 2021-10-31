const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
        unique: true,
    },
    txnid: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;