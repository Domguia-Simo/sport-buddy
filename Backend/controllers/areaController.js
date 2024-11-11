const areaModel = require('../models/areaModel')

const getAreas =async(req ,res)=>{
    try{
        const areas = await areaModel.find()
        return res.status(200).json({areas:areas})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})
    }
}

const createArea =async(req ,res)=>{
    try{
        const {name} = req.body
        if(!name){return res.status(401).json({error:'Fill the entire form'})}
        let area = new areaModel({
            name:name
        })
        area = await area.save()
        return res.status(201).json({area:area})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}

const deleteArea =async(req ,res)=>{
    try{
        let {id} = req.params
        const response = await areaModel.deleteOne({_id:id})
        return res.status(200).json({message:"Area deleted successfully"})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}

const updateArea =async(req ,res)=>{
    try{
        let {name ,id} = req.body
            let area = await areaModel.findById({_id:id})
            area.name = name;
            area = await area.save()
                return res.status(200).json({area:area})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}


module.exports = {getAreas ,createArea ,deleteArea ,updateArea}