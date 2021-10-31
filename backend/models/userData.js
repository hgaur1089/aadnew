const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
        unique: true,
    },
    
})