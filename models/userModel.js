const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/EndTerm')

const userSchema = mongoose.Schema({
    age: Number,
    phoneNumber: Number,
    gender: String,
    username: String,
    isLegal: Boolean,
    password: String,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

module.exports = mongoose.model('userData',userSchema)