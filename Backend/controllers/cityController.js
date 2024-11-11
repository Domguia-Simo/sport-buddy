const cityModel = require('../models/cityModel')

const getCities =async(req ,res)=>{
    try{
        const cities = await cityModel.find()
        return res.status(200).json({cities:cities})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})
    }
}

const createCity =async(req ,res)=>{
    try{
        const {name} = req.body
        if(!name){return res.status(401).json({error:'Fill the entire form'})}
        let city = new cityModel({
            name:name
        })
        city = await city.save()
        return res.status(201).json({city:city})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}

const deleteCity =async(req ,res)=>{
    try{
        let {id} = req.params
        const response = await cityModel.deleteOne({_id:id})
        return res.status(200).json({message:"city deleted successfully"})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}

const updateCity =async(req ,res)=>{
    try{
        let {name ,id} = req.body
            let city = await cityModel.findById({_id:id})
            city.name = name;
            city = await city.save()
                return res.status(200).json({city:city})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}


module.exports = {getCities ,createCity ,deleteCity ,updateCity}