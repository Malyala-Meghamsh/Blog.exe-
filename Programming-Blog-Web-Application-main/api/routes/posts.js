const router=require("express").Router();
const User = require("./../models/User");
const Post = require("../models/Post");
const email_users = require("../models/subscribe");
const nodemailer = require('nodemailer');



const transporter= nodemailer.createTransport({
  service:"gmail",
  auth:{
    user: "buynow276@gmail.com",
    pass:"shyshfsvfbsdlyag"
  }
});

async function sendMail(email_name, post){
  const info={
    from:"buynow276@gmail.com",
    subject:`New Post Notification: ${post.title}`
  }
  const body = `We are thrilled to announce that ${post.username}, one of your favorite authors on ProgPioneers, has just published a new post! At ProgPioneers, we are dedicated to bringing you the latest insights, tutorials, and updates from the world of programming, and we believe this post will be of great interest to you.

Post Title: ${post.title}\n
Author: ${post.username}\n

To dive into this exciting content, simply click on the link below:\n
http://localhost:3000/post/${post._id}\n

We encourage you to read the post, share your thoughts, and engage with fellow tech enthusiasts in the comments section. Your active participation enriches our community and fosters meaningful discussions.\n
Thank you for being a part of ProgPioneers. If you have any questions, suggestions, or if there's anything else we can assist you with, feel free to reply to this email. Your feedback is invaluable to us.\n

Happy coding!\n

Best regards,\n
ProgPioneers Team`;
  info['to'] = email_name;
  info['text'] = body;
  transporter.sendMail(info,(err,result)=>{
    if(err){
        console.log("Error in sending Mail",err);
        return false;
      }
    else{
      console.log("Success");
      return true;
    }
  })
}


//creating the post
router.post("/",async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        // const 
        console.log("Hari Hii ra");
        const x = await email_users.findOne({username: savedPost.username});
        // console.log(x.email);
        if(x){
          for(let i = 0; i < x.email.length; i++){
            sendMail(x.email[i], savedPost);
            // console.log(x.email[i]);
          }
        }
        console.log("Hari Hii ra");
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update 
// post id
router.put("/:id", async (req, res) => {
        try {
                const post = await Post.findById(req.params.id);
                if (post.username === req.body.username) {
                    try {
                        const updatedPost = await Post.findByIdAndUpdate(
                            req.params.id,
                            {
                                $set: req.body,
                            },
                            { new: true }
                        );
                        res.status(200).json(updatedPost);
                    } catch (err) {
                        res.status(500).json(err);
                    }
                } else {
                    res.status(401).json("You can update only your post!");
                }
            } catch (err) {
                res.status(500).json(err);
            }
    });
    //delete the post 
    router.delete("/:id", async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                try {
                    await post.delete();
                    res.status(200).json("Post has been deleted...");
                } catch (err) {
                    res.status(500).json(err);
                }
            } else {
                res.status(401).json("You can delete only your post!");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    });
    //get the post with given id 
    router.get("/:id", async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // console.log(post);
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    });
    //get all posts to show in home page
    router.get("/", async (req, res) => {
        const username = req.query.user;
        const catName = req.query.cat;
        try {
            let posts;
            if (username) {
                posts = await Post.find({ username });
            } else if (catName) {
                posts = await Post.find({
                    categories: {
                        $in: [catName],
                    },
                });
            } else {
                const skip = req.query.skipPosts;
                const limit = req.query.presPosts;
                posts = await Post.find().skip(skip).limit(limit);
            }
            res.status(200).json(posts);
        } catch (err) {
            res.status(500).json(err);
        }
    });
        
module.exports=router