const {Schema} = require('mongoose')
const mongoose = require('mongoose')

const sportModel = new Schema({
    name:{type:Schema.ObjectId ,ref:'sports'},
    level:{type:String}
} ,{_id:false})

const user = new Schema({
    name:{type:String},
    accountType:{type:String},
    email:{type:String ,require:true},
    password:{type:String ,require:true},
    userName:{type:String},

    sports:{type:sportModel}

})

const userModel = mongoose.model("users" ,user)
 module.exports = userModel