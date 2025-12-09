import express from "express";
import blogController from "../controller/blogController.js";

const router = express.Router();

router.post("/create",blogController.addBlog);

router.get("/all",blogController.getBlogs);

router.get("/:id",blogController.updateBlog)

router.patch("/:id",blogController.updateBlog);

router.delete("/:id",blogController.deleteBlog);



export default router;