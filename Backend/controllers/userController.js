const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

const login=async(req ,res)=>{
    try{
        const {email ,password} = req.body
        if(!email || !password){return res.status(401).json({error:'Fill the require fields'})}
        const user = await userModel.findOne({email:email})
        if(user){
            if(bcrypt.compare(password ,user.password)){
                return res.status(200).json({user:user})
            }else{
                return res.status(401).json({error:'Invalid password'})
            }
        }else{
            return res.status(401).json({error:"No existing email"})
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server error : '+e.message})
    }
}

const register = async(req ,res)=>{
    try{
        console.log(req.body);

        const {email ,password ,confirm} = req.body
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            return res.status(401).json({error:'Email already in use'})
        }else{
            if(password == confirm){
                const salt =await bcrypt.genSalt(20)
                const hashPwd = await bcrypt.hash(password ,salt)
                
                const user = new userModel({
                    email:email,
                    password:hashPwd
                })

                await user.save()
                return res.status(200).json({message:'registration successfull'})
            }else{
                return res.status(401).json({error:'Passwords does not match'})
            }
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:'Server error : '+e.message})

    }
}


module.exports = {login ,register}