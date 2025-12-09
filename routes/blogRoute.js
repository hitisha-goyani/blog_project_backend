import express from "express";

import {
   addBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from "../controller/blogController.js";

import uploads from "../middleware/fileUpload.js"
import auth from "../middleware/auth.js";




const router = express.Router();
router.get("/", (req, res) => {
  res.render("add");
});

router.get("/add", (req, res) => {
  res.render("add");
});
router.post("/add",auth, uploads.single("image"), addBlog);


router.get("/get",auth, getBlogs);

router.get("/edit/:id",auth, getBlog);
router.post("/edit/:id",auth, uploads.single("image"), updateBlog);
router.get("/delete/:id",auth, deleteBlog);

export default router;