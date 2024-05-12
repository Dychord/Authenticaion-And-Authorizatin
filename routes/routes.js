const express = require('express')
const router = express.Router();
const userModel = require('../models/userModel');
const app = express();
app.use('/',require('./auth'))


router.get('/second', (req, res) => {
  res.send('this is the second page');
});

router.get('/delete/:id',adminCanDelete,async (req,res)=>{
    let user = await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/profile")
})
router.get('/edit/:id',async (req,res)=>{
    let user = await userModel.findOne({_id:req.params.id})
    res.render("edit",{user})
})
router.post('/update/:id',async (req,res)=>{
    let {age ,username ,password , phoneNumber, gender} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.id},{username,age,password,phoneNumber,gender},{new:true})
    res.redirect("/profile")
})

router.get('/read',async (req,res)=>{
    const user = await userModel.find({})
    res.send(user)
})

module.exports = router;