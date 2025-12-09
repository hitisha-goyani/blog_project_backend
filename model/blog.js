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
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true,
         trim:true
    },

    createdAt:{
        type:Date,
        required:true,
        default:Date.now    
    }

})

const blog = mongoose.model("Blog",blogSchema);

export default blog;