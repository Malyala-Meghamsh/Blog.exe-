const express =require("express")//to use express
const app = express();
const dotenv=require("dotenv");//to use dotenv
const mongoose =require("mongoose");//to use mongoose 
const authRoute =require("./routes/auth");
const usersRoute=require("./routes/users");
const postRoute=require("./routes/posts")
const catRoute=require("./routes/categories");
const multer=require("multer");
const path= require("path")
dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
//here we are connecting to mongoose by providing url present in .env files 
mongoose
    .connect("mongodb+srv://Nitheesh:Nitheesh_2812@cluster0.ya71u.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("connected to mongoDB"))
    .catch((err)=>console.log(err))//mongodb connection with cloud 

const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images")
    },filename(req,file,cb){
        cb(null,req.body.name);
    }
});

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})


app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",catRoute)

app.listen("5005",()=>{
    console.log("Backend is running");
})