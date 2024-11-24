const eventModel = require('../models/eventModel')

const getEvents =async(req ,res)=>{
    try{
        const events = await eventModel.find().populate('sport')
        return res.status(200).json({events:events})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})
    }
}

const createEvent =async(req ,res)=>{
    try{
        console.log(req.body);
        const {sport ,description ,date , time ,level ,userId ,location} = req.body
        if(!sport || !description || !date || !time || !userId || !location){return res.status(401).json({error:'Fill the entire form'})}
        let event = new eventModel({
            sport:sport ,
            description:description,
            date:date,
            levelRequired:level,
            time:time,
            user:userId,
            location:location
        })
        event = await event.save()
        return res.status(201).json({event:event})
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({error:'Server error '+e.message})  
    }
}

const deleteEvent =async(req ,res)=>{
    try{
        let {id} = req.params
        const response = await eventModel.deleteOne({_id:id})
        return res.status(200).json({message:"event deleted successfully"})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}

const updateEvent =async(req ,res)=>{
    try{
        let {sport ,description ,date ,time ,level,id ,location} = req.body
            let event = await eventModel.findById({_id:id})
            event = {sport ,description ,date ,time ,levelRequired:level ,location};
            event = await event.save()
                return res.status(200).json({event:event})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}


const getUserEvents=async(req ,res)=>{
    try{
        const {userId} = req.params
        // console.log(userId)
        const events = await eventModel.find({user:userId}).populate('sport' ,'name').populate('location')
        return res.status(200).json({events:events})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'server error'})
    }
}


module.exports = {getEvents ,createEvent ,deleteEvent ,updateEvent ,getUserEvents}