import httpError from "../middleware/errorHanding.js";
import User from "../model/user.js"



const addUser = async(req,res,next)=>{
  try{
    const {name,email,password} = req.body


    let existingUser = await User.findOne({email});

    if(existingUser){
      return next(new httpError("user already exits this id please add new id",400))
    }

    const newUser = {
      name,
      email,
      password
    }

    const saveUser = new User(newUser);

    await saveUser.save();

    res.status(201).json({message:"user created sucessfully",saveUser})

  }catch(error){

    next (new httpError(error.message))

  }
}


const allUser = async(req,res,next)=>{
    try {
        
        const allData = await User.find({})

        if(!allData){
            return next(new httpError("blog not find",400))
        }

        res.status(200).json({message:"all blog find sucessfullyy",allData})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const specificUser = async(req,res,next)=>{
    try {
        
        const id = req.params.id;

        const  existingTask = await User.findById(id)

        if(!existingTask){
            return next(new httpError("blog data not found",404))
        }

        res.status(200).json({message:"blog data found",existingTask})

    } catch (error) {
        next(new httpError(error.message,400))        
    }
}


const updateUser = async(req,res,next)=>{
    try {
        const id = req.params.id;

        const existingTask = await User.findById(id)

        if(!existingTask){
            return next (new  httpError("id not found for updated",404))
        }

        const updates = Object.keys(req.body)

        const allowfield = ["name","email","password"]

        const isValidUpdate = updates.every((field)=>allowfield.includes(field))

        if(!isValidUpdate){
            return next(new httpError("only allowed field can be updated",400))
        }

        updates.forEach((update)=>{
            existingTask[update]=req.body[update]
        })

        await existingTask.save()

        res.status(200).json({message:"task updated succesfullyy",existingTask})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const deleteUser = async(req,res,next)=>{

    try {

        const id = req.params.id;

        const savedata = await User.findByIdAndDelete(id)

        if(!savedata){
            return next(new httpError("blog not found"))
        }

        res.status(200).json({message:"blog information successfully deleted"})

    } catch (error) {
        next(new httpError(error.message))
    }
    
}


export default {addUser , allUser , specificUser , updateUser , deleteUser}