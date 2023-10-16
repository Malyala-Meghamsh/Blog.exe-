const router = require("express").Router();
const comments = require("../models/Comment");

router.get("/", async (req, res) => {
    console.log(req.query);  
    try {
    	const cmnts = await comments.find({postId:req.query.postId});
    	res.status(200).json(cmnts);
    } catch (err) {
    	res.status(500).json(err);
    }
});

router.post("/", async(req,res)=>{
	console.log(req.body);
	const newCmnt = new comments(req.body);
	try {
		await newCmnt.save();
		res.status(200).json("success");
	} catch (err) {
		console.log(err);
		res.status(400).json("Failed");
	}
})
module.exports = router;