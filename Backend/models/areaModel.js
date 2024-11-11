const mongoose = require('mongoose')

const area = new mongoose.Schema({
    name:{type:String}

})

const areaModel = mongoose.model("areas" ,area)

module.exports = areaModel