import express from "express"
import uploads from "../middleware/fileUpload.js";
import blogController from "../controller/blogController.js";

const router = express.Router();

router.post("/create",blogController.createBlog);
router.post("/create",uploads.single("image"),blogController.createBlog);

router.get("/getblogs",blogController.getBlogs);
router.get("/getblog/:id",blogController.getBlog);

export default router;