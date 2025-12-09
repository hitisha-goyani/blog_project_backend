import express from "express";
import { showLogin, showRegister, registerUser, loginUser, logoutUser } from "../controller/authController.js";

const router = express.Router();

router.get("/login", showLogin);
router.post("/login", loginUser);

router.get("/register", showRegister);
router.post("/register", registerUser);

router.get("/logout", logoutUser);

export default router;
