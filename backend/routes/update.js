const express=require('express');
const User=require('../models/User');
const router=express.Router();

router.put('/',async(req,res)=>{

    const {name,email,password}=req.body;
    try{
        if(!name||!email||!password){
            return res.status(400).json({message:"Name,email,password are required"});
        }

        const updateitem=await User.findOneAndUpdate(
            {email:email},
            {name,email,password},
            {new:true}
        );
        if(!updateitem){
            return res.status(800).json({message:"item with this email not found"});
        }
        res.json(updateitem);
    }
    catch(error){
        return res.status(900).json({message:"error occured"})
    }
   
});

module.exports=router