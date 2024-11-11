const mongoose = require('mongoose')

const city = new mongoose.Schema({
    name:{type:String}

})

const cityModel = mongoose.model("cities" ,city)

module.exports = cityModel