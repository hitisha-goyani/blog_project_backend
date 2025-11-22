import mongoose from "mongoose";

const connectDb =async ()=>{
   try{
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/blog");

    return connect;

   }catch(error){
    console.log(error.message);
   }
}

export default connectDb;