const mongoose = require('mongoose')

const sport = new mongoose.Schema({
    name:{type:String ,require:true},
    muscle:[{type:String}],
    description:{type:String}
})


const sportModel = mongoose.model("sports" ,sport)

module.exports = sportModel