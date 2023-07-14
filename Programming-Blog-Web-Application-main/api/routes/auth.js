const router=require("express").Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

router.post("/register",async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser=new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const user =await newUser.save();//saves in mongodb
        const { password, ...others } = user._doc;//not sending password of user as response 
        res.status(200).json(others);
       // console.log(others)
    }catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});
router.post('/login' , async (req,res) =>{
    try {
        const user = await User.findOne({username: req.body.username});


        if(!user)
        {
            return res.status(400).json("wrong credentials")
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated)
        {
            return res.status(400).json("wrong credentials");
        }
        const {password,...others}=user._doc;
        res.status(200).json(others);

    } catch(err){
        res.status(500).json(err);
    }
});
module.exports=router