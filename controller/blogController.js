import httpError from "../middleware/errorHanding.js";
import blog from "../model/blog.js";

//create blog
const  addBlog= async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    const newBlogData = {
      title,
      content,
      author,
      image: req.file ? req.file.path : null,
    };

    const Blog = new blog(newBlogData);

    await Blog.save();

    // if (!Blog) {
    //   return next(new httpError("Blog not added", 400));
    // }

    // res.status(201).json({
    //   message: "Blog added successfully",
    //   Blog,
    // });

    res.redirect("/blog/get");

  } catch (error) {
    next(new httpError(error.message));
  }
};

//get all blogs

const getBlogs = async(req,res,next)=>{

    try{

        const blogs = await blog.find({})

        // if(!blogs){
        //     return next(new httpError("blog can't find",400))
        // }

        // res.status(200).json({message:"blog info",blogs})

        res.render("index",{blogs});

    }catch(error){
        next(new httpError(error.message))
    }

}

//get single blog

const getBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Blog = await blog.findById(id);

    if (!Blog) {
      return next(new httpError("Blog not available", 400));
    }

    // 👇 send `blog` to EJS
    res.render("edit", { blog });

  } catch (error) {
    next(new httpError(error.message));
  }
};
const updateBlog = async (req,res,next)=>{
try{

  
  const id = req.params.id
  const existingBlog = await blog.findById(id);

  if(!existingBlog){
    return next (new httpError("blog not found",404))
  }


const updates = Object.keys(req.body)

const alloweFields = ["title","content","author"]


const isValid = updates.every((field)=>

  alloweFields.includes(field)

);

if(!isValid){
  return next(new httpError("only allowed field can be updated",400))
}

updates.forEach((field)=>{
  existingBlog[field] = req.body[field];
});

if(req.file){
  existingBlog.image = req.file.path;
}

await existingBlog.save();

// res.status(200).json({message:"blog updated suceesfully..",blog:existingBlog})

res.redirect("/blog/get");

}catch(error){
 next(new httpError(error.message))
}
}


const deleteBlog = async (req,res,next)=>{

  try{
    const deleteBlog = await blog.findByIdAndDelete(req.params.id);

  // if(!deleteBlog){
  //   return next (new httpError("not awailable this id",400))
  // }

  // res.status(200).json({message:"delete sucessfully..."})

  res.redirect("/blog/get")
  }catch(error){
      next (new httpError(error.message))
  }

}
export { addBlog, getBlogs, getBlog, updateBlog, deleteBlog };
