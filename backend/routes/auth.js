const express=require('express');
const User=require('../models/User');
const router=express.Router();

router.post('/',async(req,res)=>{
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    }).then(user=>res.json(user))
})

module.exports=router