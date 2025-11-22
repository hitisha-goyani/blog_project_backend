import express from "express"
import connectDb from "./config/db.js";
import httpError from "./middleware/errorHanding.js";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoute.js"


dotenv.config();


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/blog",blogRoutes)




app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
})

app.use((req,res,next)=>{
    return next(new httpError("route not found",404))
})

app.use((error,req,res,next)=>{
    if(req.headersSent){
        return next(error)
    }

    res.status(error.statusCode || 500)
    .json(error.message || "something went wrong please try again")
})
const port = 5000;



const startServer = async () =>{
    try{

        const connect = await connectDb();

        if(!connect){
            console.log("db failed to connect");
        }

        console.log("db connected");

        app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})

    }catch(error){
        console.log(error.message)
        process.exit(1);

    }
}

startServer();

