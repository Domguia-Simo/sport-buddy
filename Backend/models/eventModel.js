const mongoose = require('mongoose')

const event = new mongoose.Schema({
    sport:{type:mongoose.Schema.Types.ObjectId ,ref:"sports"},
    description:{type:String},
    date:{type:Date},
    time:{type:String},
    levelRequired:{type:String ,enum:["beginner" ,"intermediate" ,"advanced"] ,default:'beginner'},
    user:{type:mongoose.Schema.Types.ObjectId ,ref:'users'},
    location:{type:mongoose.Schema.ObjectId ,ref:'locations'}
})

const eventModel = mongoose.model("events" ,event)

module.exports = eventModel