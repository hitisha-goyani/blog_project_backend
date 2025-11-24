import express from "express";

import {
   addBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from "../controller/blogController.js";

import uploads from "../middleware/fileUpload.js"




const router = express.Router();
router.get("/", (req, res) => {
  res.render("add");
});

router.get("/add", (req, res) => {
  res.render("add");
});
router.post("/add", uploads.single("image"), addBlog);


router.get("/get", getBlogs);

router.get("/edit/:id", getBlog);
router.post("/edit/:id", uploads.single("image"), updateBlog);
router.get("/delete/:id", deleteBlog);

export default router;