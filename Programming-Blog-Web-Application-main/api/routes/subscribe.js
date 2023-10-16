const router = require("express").Router();
const SubscribeEmail = require("../models/subscribe");

router.post("/", async (req,res)=>{
    // const username = req
    console.log(req.body);
    // res.send({hi:"hbh"});
    const email_username = await SubscribeEmail.findOne({username:req.body.username});
    // console.log(email_username);
    if(email_username){
        try {
            email_username.email.push(req.body.email);
            email_username.save();
            res.status(200).json({stats:"Success"});
        } catch (error) {
            console.log(error);
            res.status(404).json({stats:"Failed"});
        }
    }
    else{
        try {
            const newUsernameEmail = new SubscribeEmail({
                username: req.body.username,
                email: [req.body.email]
            });
            newUsernameEmail.save();
            res.status(200).json({stats:"Success"});
        } catch (error) {
            console.log(error);   
        }
    }
    
});

module.exports = router;