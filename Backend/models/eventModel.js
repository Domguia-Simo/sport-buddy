const mongoose = require('mongoose')

const event = new mongoose.Schema({
    sport:{type:mongoose.Schema.Types.ObjectId ,ref:"sports"},
    description:{type:String},
    date:{type:Date},
    time:{type:String},
    levelRequired:{type:String ,enum:["beginner" ,"intermediate" ,"advanced"] ,default:'beginner'},


})

const eventModel = mongoose.model("events" ,event)

module.exports = eventModel