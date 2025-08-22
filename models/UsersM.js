//[Section] Activity
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'FirstName is Required']
    },
    lastName: {
        type: String,
        required: [true, 'LastName is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    mobileNo: {
        type: String,
        required: [true, 'MobileNo is Required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('User', userSchema);