const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/EndTerm')

const adminSchema = mongoose.Schema({
    age: Number,
    username: String,
    password: String,
    role:{
        type:String,
        default:'admin'
    }
})

module.exports = mongoose.model('adminData',adminSchema)