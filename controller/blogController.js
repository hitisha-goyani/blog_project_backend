import httpError from "../middleware/errorHanding.js";
import blog from "../model/blog.js";

//create blog
const createBlog = async (req, res, next) => {
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

    if (!Blog) {
      return next(new httpError("Blog not added", 400));
    }

    res.status(201).json({
      message: "Blog added successfully",
      Blog,
    });

  } catch (error) {
    next(new httpError(error.message));
  }
};

//get all blogs

const getBlogs = async(req,res,next)=>{

    try{

        const blogs = await blog.find({})

        if(!blogs){
            return next(new httpError("blog can't find",400))
        }

        res.status(200).json({message:"blog info",blogs})

    }catch(error){
        next(new httpError(error.message))
    }

}

//get single blog

const getBlog = async (req,res,next)=>{

   try{
     const id = req.params.id;

    const Blog = await blog.findById(id);

    if(!Blog){
        return next (new httpError("blog is not awailable",400))
    }

    res.status(200).json({message:"blog find here",Blog})
   }catch(error){
    next(new httpError(error.message))
   }

}

export default { createBlog,getBlogs,getBlog };
