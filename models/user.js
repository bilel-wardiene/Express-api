const mongoose = require('mongoose')

var user = mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

var User = mongoose.model('user',user)
module.exports = User