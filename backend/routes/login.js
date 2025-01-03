const express=require('express');
const User=require('../models/User');
const router=express.Router();

router.post('/',async(req,res)=>{

    const {email,password}=req.body;
    try{
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"error"});

        }
        if (password===user.password){

            return res.status(500).json({message:"login successfull"})


        }
        else{
            return res.status(700).json({message:"invalid"})
        }
    }
    catch(error){
        return res.status(900).json({message:"error occured"})
    }
   
});

module.exports=router