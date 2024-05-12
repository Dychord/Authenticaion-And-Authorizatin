const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const adminModel = require('../models/admin');


const adminAuthCheck = (req,res,next)=>{
    if(req.session && req.session.adminCheck){
        next()
    }else{
        res.redirect('/admin')
    }
}
const adminPasswordCheck = (req, res, next) => {
    const password = req.body.adminPassword;
    if("kali"===password) {
        req.session.adminCheck = "slkdfjsldk-asdlka-asa-fjslfjlsdkflsjd"
        next()
    }
    else {
        res.redirect('/admin')
    }
}

router.get('/admin', (req, res) => {
    res.render('adminPages/admin')

});
router.get('/adminLogin',adminAuthCheck, (req, res) => {
    res.render("adminPages/adminLogin")
})
router.get('/adminSignUP',adminAuthCheck, (req, res) => {
    res.render('adminPages/adminSignUP')
});

router.post('/checkAdmin', adminPasswordCheck,async (req, res)=>{
    res.render('adminPages/adminLogin')
})

//admin login
router.post('/loginAdmin',adminAuthCheck,async (req, res)=>{
    const {username,password} = req.body;
    const admin = await adminModel.findOne({username})
    if(!admin) return res.status(404).send("Invalid username or password!")
    const pass = await bcrypt.compare(password,admin.password)
    if(!pass) return res.status(404).send("Invalid username or password!")
    
    req.session.adminID = admin._id
    req.session.adminRole = admin.role;
    res.redirect('/profile')
})

//admin create
router.post('/createAdmin',adminAuthCheck,async (req, res)=>{
    const {age ,username ,password} = req.body;
    bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(password, salt,async (err, hash) => {
            const admin = await adminModel.create({
                username,
                password:  hash,
                age
            })
            res.redirect('/adminLogin')
        })
    })
})


router.get('/user', (req, res) => {
    res.render('register')
});

//user create
router.post('/create', async (req, res) => {
    const {age ,username ,password , phoneNumber, gender} = req.body;
    bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(password, salt,async (err, hash) => {
            const user = await userModel.create({
                username,
                gender,
                password:  hash,
                age,
                phoneNumber
            })
            res.redirect('/login')
        })
    })
})

router.get('/login', (req, res)=>{
    res.render('login');
})

//user login
router.post('/profile', async (req, res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username})
    if(!user) return res.status(404).send("Invalid username or password!")
    const pass = await bcrypt.compare(password,user.password)
    if(!pass) return res.status(404).send("Invalid username or password!")

    req.session.userID = user._id;
    req.session.username = user.username;
    res.redirect('/profile')
})

router.get('/logout',(req,res)=>{
    req.session.destroy(res.redirect('/'))
})

adminCanDelete = async (req, res, next) => {
    if(req.session.adminID){
        next()
    }else{
        res.redirect('/profile')
    }
};

router.get('/profile',async (req, res) => {
    if(req.session && req.session.userID){
        let user = await userModel.find()
        const displayName = req.session.username
        res.render("profile", {user,displayName})
    }else if(req.session && req.session.adminID){
        let user = await userModel.find()
        const displayName = req.session.username
        res.render("profile", {user,displayName})
    }
})


//testing this still
router.get('/personal',async (req, res) => {
    let user = await userModel.find({username:'Vikram'})
    res.render("personal",{user})
})
// __________________

module.exports = adminCanDelete;
module.exports = router;