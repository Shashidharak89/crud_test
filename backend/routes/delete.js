const express=require('express');
const User=require('../models/User');
const router=express.Router();

router.delete('/',async(req,res)=>{

    
    try{
        const {email}=req.body;
        if (!email){
            return res.status(404).json({message:"email not found"})
        }
        const result=await User.deleteOne({email});
        if (result.deletedCount===0){
            return res.status(900).json({message:"user not found with the email"})
        }
        res.send("data deleted successfully")
        
    }
    catch(error){
        return res.status(900).json({message:"error occured"})
    }
   
});

module.exports=router