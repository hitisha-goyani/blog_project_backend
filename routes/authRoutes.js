import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.post("/add",authController.addUser)

router.get("/all",authController.allUser)

router.get("/:id",authController.specificUser)
router.patch("/:id",authController.updateUser)

router.delete("/:id",authController.deleteUser)

export default router;
    