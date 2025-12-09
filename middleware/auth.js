import jwt from "jsonwebtoken";
import User from "../model/user.js";

const SECRET = "WEB_KEY";

const auth = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.redirect("/login");
  }
};

export default auth;
