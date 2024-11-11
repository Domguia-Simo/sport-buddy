const {Schema} = require('mongoose')
const mongoose = require('mongoose')

const user = new Schema({
    name:{type:String},
    accountType:{type:String},
    email:{type:String ,require:true},
    password:{type:String ,require:true},

})

const userModel = mongoose.model("users" ,user)
 module.exports = userModel