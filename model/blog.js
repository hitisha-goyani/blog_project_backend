import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },

    author:{
         type:String,
        required:true,
        trim:true
    },
    image:{
         type:String,

    }
},{timestamps:true})

const blog = mongoose.model("Blog",blogSchema);

export default blog;