const locationModel = require('../models/locationModel')


const createLocation =async(req ,res)=>{
    try{
        let {name} = req.body;
        if(!name){return res.status(400).json({error:'Fill the require field'})}
        const location = await locationModel.create({name})
        return res.status(200).json({location:location})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'server error'})
    }
}

const getLocations=async(req ,res)=>{
    try{
        const locations = await locationModel.find()
        return res.status(200).json({locations:locations})
    }
    catch(e){ 
        console.log(e)
        return res.status(500).json({error:'server error'})
    }
}


const updateLocation =async(req ,res)=>{
    try{
        const {locationId} = req.params
        const {name}=req.body
        if(!name || !locationId){return res.status(400).json({error:'Fill the require fields'})}
        const location = await locationModel.updateOne({_id:locationId} ,{$set:{name:name}} ,{new:true})
        return res.status(200).json({location:location})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'server error'})
    }
}


const deleteLocation=async(req ,res)=>{
    try{
        const {locationId} = req.params
        const response = await locationModel.deleteOne({_id:locationId} ,{new:true})
        return res.status(200).json({message:'location deleted'})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'server error'})
    }
}


module.exports = {createLocation ,getLocations ,deleteLocation ,updateLocation}