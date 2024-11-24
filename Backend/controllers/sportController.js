const sportModel = require('../models/sportModel')

const getSports =async(req ,res)=>{
    try{
        const sports = await sportModel.find()
        return res.status(200).json({sports:sports})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})
    }
}

const createSport =async(req ,res)=>{
    try{
        const {name ,description ,muscle} = req.body
        if(!name || !description || !muscle  ){return res.status(401).json({error:'Fill the entire form'})}
        const exist = await sportModel.findOne({name:name.trim()})
        if(exist){return res.status(401).json({error:'sport already exists'})}
        let sport = new sportModel({
            name:name ,
            description:description,
            muscle:muscle
        })
        sport = await sport.save()
        return res.status(201).json({sport:sport})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}

const deleteSport =async(req ,res)=>{
    try{
        let {id} = req.params
        const response = await sportModel.deleteOne({_id:id})
        return res.status(200).json({message:"sport deleted successfully"})
    }
    catch(e){
        console.log(e.message);
        return res.status(500),json({error:'Server error '+e.message})  
    }
}

const updateSport =async(req ,res)=>{
    try{
        let {name ,description ,muscle,_id} = req.body
            const sport = await sportModel.findOneAndUpdate({_id:_id},{$set:{name ,description ,muscle}} ,{new:true})
                return res.status(200).json({sport:sport})
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({error:'Server error '+e.message})  
    }
}


module.exports = {getSports ,createSport ,deleteSport ,updateSport}