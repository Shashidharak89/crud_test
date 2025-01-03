const express=require('express');
const User=require('../models/User');
const router=express.Router();

router.get('/',async(req,res)=>{

    
    try{
       const items=await User.find();
       res.json(items);
    }
    catch(error){
        return res.status(900).json({message:"error occured"})
    }
   
});

module.exports=router