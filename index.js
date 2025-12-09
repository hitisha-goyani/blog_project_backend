import express from "express";
import connectDb from "./config/db.js";
import httpError from "./middleware/errorHanding.js";
import blogRoutes from "./routes/blogRoute.js";
import authRoutes from "./routes/authRoutes.js";  

const app = express();

app.use(express.json())

app.use("/user", authRoutes);   

app.use("/blog", blogRoutes);


app.use((req, res, next) => {
  return next(new httpError("route not found", 404));
});


app.use((error,req,res,next)=>{
    if(req.headersSent){
        return next(error)
    }
    res.status(error.statusCode || 500).json(error.message || "somthing went wrong please try again")
})

const port = 5000;

const startServer = async () => {
  try {
    await connectDb();
    console.log("db connected");

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
