const mongoose = require('mongoose')


const location = mongoose.Schema({
    name:{type:String}
})

const locationModel = mongoose.model("locations" ,location)

module.exports = locationModel