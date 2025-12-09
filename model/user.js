

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim:true
  },
  email: { 
    type: String,
    required: true,
    trim: true, 
    unique: true 
},
  password : {
    type: String,
    required: true,
    trim:true,
    minlength: 6

  },

  blogs:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"blog "
    }
  ]
     
});


const User = mongoose.model("User", userSchema);

export default User;
